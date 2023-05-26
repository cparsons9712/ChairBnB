const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const bookingRouter = require('./bookings.js')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')


const { restoreUser } = require("../../utils/auth.js");

const { handleValidationErrors } = require("../../utils/validation.js")

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use(handleValidationErrors)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingRouter)





module.exports = router;
