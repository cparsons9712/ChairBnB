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
router.get('/spots', async (req, res) =>{
  if(!req.user){
    const autherr = new Error()
    autherr.status = 401
    autherr.message = "Authentication required"
    return next(autherr)
  }
  const spots = await Spot.findAll({
    where: {ownerId: req.user.id},
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: [],
        where: {preview: true},
        as: 'SpotImages'
      },
     ],
    // //this key adds new key value pairs into our object
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgReview'],
        [sequelize.col('SpotImages.url'), 'previewImage']
      ],
    },
    // //this tells the function that the above values should be limited to each id
     group: ['Spot.id', 'SpotImages.url']

  })

  return res.json(spots)
})

/*******************************************
    GET USER'S REVIEWS
******************************************/
router.get('/reviews', async (req, res)=>{
  if(!req.user){
    res.json({"message": "Authentication Required!"})
  }

  const editedReviews = [];
  // let reviews = await Review.findAll({
  //   where: {userId: req.user.id}
  // })
  let user = await User.findByPk(req.user.id)
  let reviews = await user.getReviews()


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

      let prevImg = await Image.findOne({
        where:{refId: spot.id, type: 'Spot'}
      })
      spot = spot.toJSON()
      spot.previewImage = prevImg.url
      review.Spot = spot
      //get review images
      let reviewImgs = await Image.findAll({
        where: {refId: review.id, type: 'Review'},
        attributes: ['id', 'url']
      })
      review.ReviewImages = reviewImgs

      editedReviews.push(review)
    }
    res.json(editedReviews)
})

module.exports = router;
