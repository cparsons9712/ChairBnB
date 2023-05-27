const express = require("express");
const { Image, Spot, Review, User,Booking, sequelize } = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors , validateBooking} = require('../../utils/validation');
const router = express.Router();


/*******************************************
EDIT A BOOKING
******************************************/
router.put('/:id', validateBooking, async (req, res, next)=>{
 let { startDate, endDate} = req.body

  if(!req.user){
    const err = new Error();
    err.status = 401;
    err.message = "Authentication required";
    return next(err);
  }
  let oldBooking = await Booking.findByPk(req.params.id)
  if (!oldBooking){
    const err = new Error();
    err.status = 404;
    err.message = "Booking couldn't be found";
    return next(err);
  }
  if(oldBooking.userId !== req.user.id){
    const err = new Error();
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }
  if(endDate < startDate){
    const err = new Error();
    err.status = 400;
    err.message = "Bad Request"
    let errors= {endDate: "endDate cannot be on or before startDate"};
    err.errors = errors
    return next (err)
  }
  if(sequelize.literal('CURRENT_TIMESTAMP') < startDate){
      const err = new Error();
      err.status = 403;
      err.message = "Past bookings can't be modified"
      return next (err)
  }
  const existingBookings = await Booking.findAll({
    where:{spotId: oldBooking.spotId},
    attributes: ['startDate', 'endDate', 'id'],
    raw:true
  })

  for (const dates of existingBookings){
    if(dates.id !== oldBooking.id){
    if(startDate < dates.endDate && startDate > dates.startDate){
      const err = new Error()
      err.message = "Sorry, this spot is already booked for the specified dates";
      err.status = 403
      errors = {startDate: '"Start date conflicts with an existing booking"'}
      err.errors = errors
      return next (err)
    }
    if(endDate < dates.endDate && endDate > dates.startDate){
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

  const updatedBooking = await oldBooking.update({
    startDate: startDateFormatted,
    endDate: endDateFormatted
  });
return res.json(updatedBooking)

})
/*******************************************
DELETE A BOOKING
******************************************/
router.delete('/:id', async (req,res)=>{
  
})

/*******************************************
GET ALL BOOKINGS
******************************************/
router.get('/', async (req, res) => {

      const bookings = await Booking.findAll({ raw: true });

      return res.json(bookings);

  });;

module.exports = router;
