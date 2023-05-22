const express = require('express');
const { Image, Spot, Review, User, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const spot = require('../../db/models/spot');
const handleValidationErrors = require('../../utils/validation')

const router = express.Router();

/*******************************************
    GET ALL SPOTS
******************************************/
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()
    let resultsSpot = []
    for (let spot of spots){
        spot = spot.toJSON()

       let starsum = await Review.sum('stars', {where: {spotId: spot.id}})

       let {count} = await Review.findAndCountAll( {where: {spotId: spot.id}})

       spot.avgRating = starsum/count


        let image = await Image.findOne({
            where: {refId: spot.id, preview: true},
            attributes: ['url']
        })
        
        spot.previewImage = image

        resultsSpot.push(spot)
    }
    res.json(resultsSpot)
})
    // loop through to avg the review


    //   include: [
    //     {
    //       model: Review,
    //       attributes: []
    //     },
    //     {
    //       model: Image,
    //       attributes: [],
    //       where: {
    //         preview: true
    //       },
    //       as: 'SpotImages'
    //     }
    //   ],
    //   attributes: {
    //     include: [
    //       [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgReview'],
    //       [sequelize.col('SpotImages.url'), 'previewImage']
    //     ],
    //   },
    //   group: ['Spot.id', 'SpotImages.url'],
 //return res.json(spots);




/*******************************************
    GET SPOT BY ID
******************************************/
router.get('/:id', async (req,res)=>{
    const spot = await Spot.findByPk(+req.params.id, {
        include: [
        {
          model: Review,
          attributes: [],
          where:{ spotId : req.params.id}
        },
        {
          model: Image,
          attributes: ['id', 'url', 'preview'],
          where: {refId: +req.params.id },
          as: 'SpotImages'
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            as: "Owner"
          },
      ],
      //this key adds new key value pairs into our object
      attributes: {
        include: [
            [sequelize.fn('COUNT', sequelize.col('Reviews.stars')), 'numReviews'],

            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgReview']

        ],
      },
      //this tells the function that the above values should be limited to each id
      group: ['SpotImages.id', 'Spot.id', 'Owner.id']
    })

    if(!spot){
        res.json({
            "message": "Spot couldn't be found"
          })
    }

    res.json(spot)
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
