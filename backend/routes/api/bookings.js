const express = require("express");
const { Image, Spot, Review, User,Booking, sequelize } = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors , validateBooking} = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');


/*******************************************
EDIT A BOOKING
******************************************/
router.put('/:id', validateBooking, async (req, res, next) => {

  //grab the new info from the client
  let { startDate, endDate } = req.body;
// check if a user is signed in
  if (!req.user) {
    const err = new Error();
    err.status = 401;
    err.message = "Authentication required";
    return next(err);
  }
// find the current booking
  let oldBooking = await Booking.findByPk(req.params.id);
// if the booking doesn't exist throw an error
  if (!oldBooking) {
    const err = new Error();
    err.status = 404;
    err.message = "Booking couldn't be found";
    return next(err);
  }
// if the booking doesn't belong to the signed in user throw error
  if (oldBooking.userId !== req.user.id) {
    const err = new Error();
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }
// prevent end date from being on or before start date
  if (endDate <= startDate) {
    const err = new Error();
    err.status = 400;
    err.message = "Bad Request";
    let errors = { endDate: "endDate cannot come before startDate" };
    err.errors = errors;
    return next(err);
  }
// check that the booking is in the future
  const currentDate = new Date();
  const oldEnd = new Date(oldBooking.endDate);

  if(oldEnd < currentDate){
    const err = new Error();
    err.status = 403;
    err.message = "Past bookings can't be modified";
    return next(err);
  }

// check that the new dates are avaliable
  const existingBookings = await Booking.findAll({
    where: { spotId: oldBooking.spotId },
    attributes: ['startDate', 'endDate', 'id'],
    raw: true
  });

  let errors = {};

  for (const dates of existingBookings) {
    if (dates.id !== oldBooking.id) {
      let NstartDate = new Date(startDate)
      let NendDate = new Date(endDate)
      let EstartDate = new Date(dates.startDate)
      let EendDate = new Date(dates.endDate)

      if(NstartDate >=  EstartDate && NstartDate <= EendDate){
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates";
        err.status = 403
        errors = {startDate: '"Start date conflicts with an existing booking"'}
        err.errors = errors
        return next (err)
      }
      if(NendDate >=  EstartDate && NendDate <= EendDate || EstartDate > NstartDate && EstartDate < NendDate ){
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates";
        err.status = 403
        errors = {endDate: "End date conflicts with an existing booking"}
        err.errors = errors
        return next (err)
      }
    }
  }
// save the new dates in the booking
  const startDateFormatted = startDate.substring(0, 10); // Extract the first 10 characters (yyyy-mm-dd)
  const endDateFormatted = endDate.substring(0, 10); // Extract the first 10 characters (yyyy-mm-dd)

  const updatedBooking = await oldBooking.update({ startDate: startDateFormatted, endDate: endDateFormatted });
  return res.json(updatedBooking);
});
/*******************************************
DELETE A BOOKING
******************************************/
router.delete('/:id', async (req,res, next)=>{
  if(!req.user){
    const err = new Error();
    err.status = 401;
    err.message = "Authentication required";
    return next(err);
  }
  const booking = await Booking.findByPk(req.params.id)
  if(!booking){
    const err = new Error();
    err.status = 404;
    err.message = "Booking couldn't be found";
    return next(err);
  }

  const spot = await Spot.findByPk(booking.spotId)
  if(booking.userId !== req.user.id && spot.ownerId !== req.user.id){
    const err = new Error();
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }
  const currentDate = new Date();
  const oldStart = new Date(booking.startDate);

  if(oldStart < currentDate){
    const err = new Error();
    err.status = 403;
    err.message = "Bookings that have been started can't be deleted";
    return next(err);
  }
  await booking.destroy();
  return res.json({ message: "Successfully deleted" });

})

/*******************************************
GET ALL BOOKINGS
******************************************/
router.get('/', async (req, res) => {

      const bookings = await Booking.findAll({ raw: true });

      return res.json(bookings);

  });;

module.exports = router;
