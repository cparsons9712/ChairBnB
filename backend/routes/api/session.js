const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User , Spot, Review, Image, sequelize} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


/*******************************************
    SIGN IN A USER
******************************************/
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);
/*******************************************
    SIGN OUT
******************************************/

router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);
/*******************************************
   GET CURRENT SIGNED IN USER
******************************************/
router.get('/', (req,res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: safeUser
    });
  } else return res.json ({ user: null})
});

/*******************************************
    GET USER'S SPOTS
******************************************/
router.get('/spots', async (req, res, next) =>{
  if(!req.user){
    const autherr = new Error()
    autherr.status = 401
    autherr.message = "Authentication required"
    return next(autherr)
  }
  // find the spot by id
  let spots = await Spot.findAll({where: {ownerId: req.user.id}})

  let resultsSpot = []
  // go threw each spot to formatt correctly
  for (let spot of spots){
      spot = spot.toJSON()
      console.log('LOOP')
      // get the average rating
     let starsum = await Review.sum('stars', {where: {spotId: spot.id}}) // add up all star values for spot
     let {count} = await Review.findAndCountAll( {where: {spotId: spot.id}, attributes: ['stars']}) // count the number of reviews
     spot.avgRating = starsum/count // math to get the average
      // get the url for the preview image
      let spotId = spot.id
    let image = await Image.findOne({where:{refId: spotId, preview: true, type: 'Spot' }
    })
    if(image){
      image = image.toJSON()
     spot.previewImage = image.url
    }else{
      spot.previewImage = null
    }


      // add the spot to the array
      resultsSpot.push(spot)
  }
  res.json({"Spots": resultsSpot})
})

/*******************************************
    GET USER'S REVIEWS
******************************************/
router.get('/reviews', async (req, res)=>{
  if(!req.user){
    const autherr = new Error()
    autherr.status = 401
    autherr.message = "Authentication required"
    return next(autherr)
  }

  const editedReviews = [];
  // let reviews = await Review.findAll({
  //   where: {userId: req.user.id}
  // })
  let reviews = await Review.findAll({
    where: {userId: req.user.id}
  })


  // reviews = reviews.json()

    for (let review of reviews){
     review = review.toJSON()
      console.log(review)
      // get user information
      let user = {'id': req.user.id, 'firstName' :req.user.firstName, 'lastName' :req.user.lastName}
      review.User = user
      // get spot information -- include preview image
      let spot = await Spot.findOne({
        where: {id: review.spotId},
        attributes: ['id','ownerId','address', 'city','state', 'country', 'lat', 'lng', 'name', 'price']
      })
      spot = spot.toJSON()
      let prevImg = await Image.findOne({
        where:{refId: spot.id, type: 'Spot', preview: true}
      })
      if(prevImg){
        prevImg = prevImg.toJSON()
        spot.previewImage = prevImg.url
      } else{
        spot.previewImage = null
      }


      review.Spot = spot
      //get review images
      let reviewImgs = await Image.findAll({
        where: {refId: review.id, type: 'Review'},
        attributes: ['id', 'url']
      })
      review.ReviewImages = reviewImgs

      editedReviews.push(review)
    }
    res.json({"Reviews" : editedReviews})
})

module.exports = router;
