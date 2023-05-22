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
    return res.json("USER MUST BE SIGNED IN")
  }
  console.log(req.user)
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


module.exports = router;
