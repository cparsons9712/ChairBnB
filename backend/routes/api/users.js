const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//checks keys of signup request and validates them
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

//sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {

      const { email, password, username, firstName, lastName } = req.body;

      const existingemail = await User.findOne({where: {email}})
      const existingUsername = await User.findOne({where: {username}})

      if( existingUsername || existingemail){

        errors = {}
        const err = new Error()
        err.status = 500;
        err.message = "User already exist"

        if(existingemail){
          errors.email = "User with that email already exist"
        }
        if(existingUsername){
          errors.username = "User with that username already exist"
        }
        err.errors = errors
        return next(err)
      }
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        email,
        username,
        firstName,
        lastName,
        hashedPassword
      });

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



    });


module.exports = router;
