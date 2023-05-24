const express = require('express');
const { Image, Spot, Review, User, sequelize } = require('../../db/models');


const router = express.Router();

/*******************************************
    GET ALL SPOTS
******************************************/
router.get('/', async (req, res, next) => {
    const {page, size, minLat, maxLat, minLng, maxLng,minPrice,maxPrice} = req.query
    const spots = await Spot.findAll()

    let resultsSpot = []
    // go threw each spot to formatt correctly
    for (let spot of spots){
        spot = spot.toJSON()
        // get the average rating
       let starsum = await Review.sum('stars', {where: {spotId: spot.id}}) // add up all star values for spot
       let {count} = await Review.findAndCountAll( {where: {spotId: spot.id}, attributes: ['stars']}) // count the number of reviews
       spot.avgRating = starsum/count // math to get the average
        // get the url for the preview image
        fetchurl = spot => {
            return Image.findOne({refId: spot, preview: true}).then(image => image.url);
        };
        fetchurl(spot.id).then(url => spot.previewImage = url);
        // add the spot to the array
        resultsSpot.push(spot)
    }
    res.json(resultsSpot)
})

/*******************************************
    GET SPOT BY ID
******************************************/
router.get('/:id', async (req,res,next)=>{
    // find the spot by id
    let spot = await Spot.findByPk(+req.params.id)
// throw error if spot is not found
    if(!spot){
        const spot = new Error()
        spot.title= "Invalid Spot"
        spot.status = 404
        spot.message = "Spot couldn't be found"
        return next(spot)
    }
    //convert into POJO for manipulation
    spot = spot.toJSON()


    // find and count the reviews with spotId of spot.id
    let starsum = await Review.sum('stars', {where: {spotId: spot.id}}) // add up all star values for spot
    let {count} = await Review.findAndCountAll( {where: {spotId: spot.id}, attributes: ['stars']})
    // add count to spot as numReviews
    spot.numReviews = count;
    // get the average of rating and add as avgStarRating
    spot.avgStarRating = starsum/count
    // find the images where refId is the spotId, grab id, url, preview
    const images = await Image.findAll({
        where: {refId: +req.params.id},
        attributes: ['id', 'url', 'preview']
    })
    // add the images to spot as SpotImages
    spot.SpotImages = images
    // find user by the spot's OwnerId, grab id, firstname and last name
    const owner = await User.findOne({
        where: {id: spot.ownerId},
        attributes: ['id', 'firstName', 'lastName']
    })
    // add to spot as "owner"
    spot.owner = owner
    res.json(spot)
})
/*******************************************
    GET REVIEWS BY SPOT ID
******************************************/
router.get('/:spotId/reviews', async (req,res,next)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return res.json({"message": "Spot couldn't be found"})
    }
    const editedReviews = []
    let reviews = await Review.findAll({
        where: {spotId : req.params.spotId }
    })
    for (let review of reviews){
        review = review.toJSON()
        const user = await User.findOne({
            where: {id:review.userId},
            attributes: ['id', 'firstName', 'lastName']
        })
        review.User = user
        const images = await Image.findAll({
            where: {type: 'Review', refId: review.id},
            attributes: ['id', 'url']
        })
        review.ReviewImages= images;


        editedReviews.push(review)
    }
    return res.json(editedReviews)
})


/*******************************************
    CREATE A SPOT
******************************************/
router.post('/', async (req, res, next)=> {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }else {
    try{
        const newSpot = await Spot.create({
            ownerId: +req.user.id,
            address, city, state, country, lat, lng, name, description, price
        })

        res.json(newSpot)
    }catch(spot) {
        const newerr = new Error()
        newerr.status = 400
        newerr.title = "Invalid Inputs"
        const errors = {}

        if (!address){errors.address = "Street address is required"}
        if(!city){errors.city = "City is required"}
        if(!state){errors.state = "State is required"}
        if(!country){errors.country = "Country is required"}
        if(lat < -90 || lat > 90 ){
            errors.lat = "Latitude is not valid"
        }
        if(lng < -180 || lat > 180 ){
            errors.lng = "Longitude is not valid"
        }

        if(name.length > 50){
            errors.name = "Name must be less than 50 characters"
        }
        if(!description){
            errors.description = "Description is required"
        }
        if(!price){
            errors.price = "Price per day is required"
        }
        newerr.errors = errors
        newerr.message = "Bad Request"
        return next(newerr)
    }
    }
})
/*******************************************
    ADD REVIEW FROM SPOT ID
******************************************/
router.post('/:id/reviews', async (req, res, next)=> {
    if(!req.user){
        res.status=404
        return res.json({"message": "Authentication Required"})
    }
    const spot = await Spot.findByPk(req.params.id);
    if(!spot){
        res.status = 404
        return res.json({"message": "Spot couldn't be found"})
    }
    const currentreview = await Review.findAll({
        where: {userId: req.user.id, spotId: req.params.id}
    })
    if(currentreview){
        res.status = 500
        return res.json({"message": "User already has a review for this spot"})
    }
    const {review, stars} = req.body
    const newReview = await Review.create({
        userId: +req.user.id,
        spotId: +req.params.id,
        description: review,
        stars
    })
    res.json(newReview)
})

/*******************************************
    ADD IMAGE FROM SPOT ID
******************************************/
router.post('/:id/images', async (req, res, next)=> {
    const {url, preview} = req.body
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }

    const spot = await Spot.findByPk(+req.params.id)

    if(!spot){
        const spot = new Error();
        spot.status = 404;
        spot.message =  "Spot couldn't be found";
        return next(spot);
    }
    if(spot.ownerId !== +req.user.id){
        const permerr = new Error();
        permerr.status = 403;
        permerr.message = "Forbidden";
        return next(permerr)
    }else {

        const newImage = await Image.create({
            url,
            preview,
            type: 'Spot',
            refId: +req.params.id,
        })
        res.json(newImage)

    }
})
/*******************************************
    EDIT A SPOT
******************************************/
router.put('/:id', async(req,res, next)=> {
    try{
        if(!req.user){
            const autherr = new Error()
            autherr.status = 403
            autherr.message = "Authentication required"
            return next(autherr)
        }
        let spot = await Spot.findByPk(req.params.id)
        let {address, city, state, country, lat, lng, name, description, price} = req.body
        if(!spot){
            const spoterr = new Error()
            spoterr.status = 404
            spoterr.message = "Spot couldn't be found"
            return next(spoterr)
        }
        if(spot.ownerId !== req.user.id){
            const perror = new Error()
            perror.status = 403
            perror.message = "Forbidden"
            return next(perror)
        }
        await spot.update({address, city, state, country, lat, lng, name, description, price})
        res.json (spot)
    }catch(spot){
        next(spot)
    }

})
/*******************************************
    DELETE A SPOT
******************************************/
router.delete('/:id', async(req,res, next)=> {
    try{
        if(!req.user){
            if(!req.user){
                const autherr = new Error()
                autherr.status = 403
                autherr.message = "Authentication required"
                return next(autherr)
            }
        }
        let spot = await Spot.findByPk(req.params.id)
        if(!spot){
            const spoterr = new Error()
            spoterr.status = 404
            spoterr.message = "Spot couldn't be found"
            return next(spoterr)
        }
        if(spot.ownerId !== req.user.id){
            const perror = new Error()
            perror.status = 403
            perror.message = "Forbidden"
            return next(perror)
        }
        await spot.destroy()
        return res.json({"message": "Successfully deleted"})
    }catch(err){
        next(err)
    }

})
/*******************************************
    DELETE A SPOT IMAGE
******************************************/

router.delete('/images/:id', async (req, res, next)=> {
    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }
        // Get the user ID
    const userId = req.user.id
        // Get the image and related Spot info
    const image = await Image.findOne({where: {id: req.params.id}, include: Spot})
        // check that the image was found
    if (image) {
            // Throw an error if the current user does not own the spot
        if( userId !== image.Spot.ownerId){
            const permerr = new Error();
            permerr.status = 403;permerr.message = "Forbidden";
            return next(permerr)
        }// Otherwise delete the image and send a response
        else {
            await image.destroy();
            return res.json({"message": "Successfully deleted"})
        }
    } // throw an error if the image isn't found
    else {
        const spot = new Error();
        spot.status = 404;
        spot.message =  "Image couldn't be found";
        return next(spot);
    }
})





module.exports = router
