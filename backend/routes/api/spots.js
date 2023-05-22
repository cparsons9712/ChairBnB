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
    const spots = await Spot.findAll({
        // this key holds an array of objects containing each table that has additional data we need
        include: [
        {
          model: Review,
          attributes: []
        },
        {
          model: Image,
          attributes: [],
          where: {
            preview: true
          },
          as: 'SpotImages'
        }
      ],
      //this key adds new key value pairs into our object
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgReview'],
          [sequelize.col('SpotImages.url'), 'previewImage']
        ],
      },
      //this tells the function that the above values should be limited to each id
      group: ['Spot.id']
    });

    return res.json(spots);
  });
/*******************************************
    GET SPOT BY ID
******************************************/
router.get('/:id', async (req,res)=>{
    const spot = await Spot.findByPk(+req.params.id, {include: [
        {
          model: Review,
          attributes: [],
          where:{ spotId : req.params.id}
        },
        {
          model: Image,
          attributes: ['id', 'url', 'preview'],
          as: 'SpotImages'

        },
        {
            model: User,
            attributes: ['id', 'firstName', 'LastName'],
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
      group: ['SpotImages.id']})

    res.json(spot)
})
/*******************************************
    CREATE A SPOT
******************************************/
router.post('/', async (req, res, next)=> {
    try{
        const {address, city, state, country, lat, lng, name, description, price} = req.body;
        const ownerId = req.user.id
        const newSpot = await Spot.create({
            ownerId, address, city, state,country, lat, lng, name, description, price
        });
        res.json({
            newSpot
        })
    } catch(err){
        next(err)
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
