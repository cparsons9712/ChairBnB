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
router.get('/:id', async (req,res)=>{
    // find the spot by id
    let spot = await Spot.findByPk(+req.params.id)
    spot = spot.toJSON()
    // throw error if spot is not found
    if(!spot){
        res.json({"message": "Spot couldn't be found"})
    }
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
    res.json(editedReviews)
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
        const newSpot = await Spot.create({
            ownerId: +req.user.id,
            address, city, state, country, lat, lng, name, description, price
        })
        res.json(newSpot)
    }
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
        const err = new Error();
        err.status = 404;
        err.message =  "Spot couldn't be found";
        return next(err);
    }
    if(spot.ownerId !== +req.user.id){
        const permerr = new Error();
        permerr.status = 403;permerr.message = "Forbidden";
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
            res.json({"message": "Authentication required"})
        }
        let spot = await Spot.findByPk(req.params.id)
        let {address, city, state, country, lat, lng, name, description, price} = req.body
        if(!spot){
            res.json({ "message": "Spot couldn't be found"})
        }
        if(spot.ownerId !== req.user.id){
            res.json({"message": "Forbidden"})
        }
        await spot.update({address, city, state, country, lat, lng, name, description, price})
        res.json (spot)
    }catch(err){
        next(err)
    }

})
/*******************************************
    DELETE A SPOT
******************************************/
router.delete('/:id', async(req,res, next)=> {
    try{
        if(!req.user){
            res.json({"message": "Authentication required"})
        }
        let spot = await Spot.findByPk(req.params.id)
        if(!spot){
            res.json({ "message": "Spot couldn't be found"})
        }
        if(spot.ownerId !== req.user.id){
            res.json({"message": "Forbidden"})
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
        const err = new Error();
        err.status = 404;
        err.message =  "Image couldn't be found";
        return next(err);
    }
})





module.exports = router
