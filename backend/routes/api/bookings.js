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
  let { startDate, endDate } = req.body;

  if (!req.user) {
    const err = new Error();
    err.status = 401;
    err.message = "Authentication required";
    return next(err);
  }

  let oldBooking = await Booking.findByPk(req.params.id);
  if (!oldBooking) {
    const err = new Error();
    err.status = 404;
    err.message = "Booking couldn't be found";
    return next(err);
  }

  if (oldBooking.userId !== req.user.id) {
    const err = new Error();
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }

  if (endDate < startDate) {
    const err = new Error();
    err.status = 400;
    err.message = "Bad Request";
    let errors = { endDate: "endDate cannot be on or before startDate" };
    err.errors = errors;
    return next(err);
  }

  const currentDate = new Date();
  const oldStart = new Date(oldBooking.startDate);

  if(oldStart < currentDate){
    const err = new Error();
    err.status = 403;
    err.message = "Past bookings can't be modified";
    return next(err);
  }


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

      if(NstartDate >  EstartDate && NstartDate < EstartDate || NstartDate === EstartDate || NstartDate === NendDate){
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates";
        err.status = 403
        errors = {startDate: '"Start date conflicts with an existing booking"'}
        err.errors = errors
        return next (err)
      }
      if(NendDate >  EstartDate && NendDate < EstartDate || NendDate === EstartDate || NendDate === NendDate){
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates";
        err.status = 403
        errors = {endDate: "End date conflicts with an existing booking"}
        err.errors = errors
        return next (err)
      }
    }
  }

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
