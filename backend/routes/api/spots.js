const express = require("express");
const { Image, Spot, Review, User,Booking, sequelize } = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors, validateBooking } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('lat')
    .custom((value, { req }) => {
      if( value > -90 && value < 90){
        return true
      }
      else{
        return false
      }
    })
    .withMessage('Latitude is not valid'),
    check('lng')
    .custom((value, { req }) => {
      if( value > -180 && value < 180){
        return true
      }
      else{
        return false
      }
    })
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required'),

    handleValidationErrors
  ];



/*******************************************
    GET ALL SPOTS
******************************************/
router.get('/', async (req, res, next) => {
  let {page, size, minLat, maxLat, minLng, maxLng,minPrice,maxPrice} = req.query
  const where = {}
  const errors = {}
  if(size){
      if(!isNaN(size) && size > 0 && size < 21){size = +size}
      else if (size > 20) {size = 20}
      else if (size < 1){
        errors.size = "Size must be greater than or equal to 1"
      }
      else {size = 20}
  }else {size = 20};

  if(page){
    if (!isNaN(page) && page <= 11 && page > 1){page =+page}
    else if (page > 10){page = 10}
    else if( page < 1){errors.message ="Page must be greater than or equal to 1" }
    else {page = 1}
  }else {page = 1}

  const offset = size * (page -1)

  if(minLat && !isNaN(minLat) ){
    if(minLat < -90 || minLat > 90){
      errors.minLat = "Minimum latitude is invalid"
    }else {where.lat = { [Op.gte]: +minLat}}
  }

  if (maxLat && !isNaN(maxLat)) {
    if(maxLat < -90 || maxLat > 90){
      errors.maxLat = "Maximum latitude is invalid"
    }else{ where.lat = {  [Op.lte]: +maxLat };}
  }


  if (minLng && !isNaN(minLng)) {
    if(minLng < -180 || minLng > 180){
      errors.minLng = "Minimum longitude is invalid"
    }else{where.lng = { [Op.gte]: +minLng };}
  }

  if (maxLng && !isNaN(maxLng)) {
    if(minLng < -180 || minLng > 180){
      errors.minLng = "Maximum longitude is invalid"
    }else{where.lng = {  [Op.lte]: +maxLng };}
  }

  if (minPrice && !isNaN(minPrice)) {
    if(minPrice < 0){
        errors.minPrice ="Minimum price must be greater than or equal to 0"
    }else{where.price = { [Op.gte]: +minPrice };}
  }

  if (maxPrice && !isNaN(maxPrice)) {
    if(maxPrice < 0){
      errors.maxPrice = "Maximum price must be greater than or equal to 0"
    }else{where.price = { [Op.lte]: +maxPrice };}
  }
  if(Object.keys(errors).length !== 0){
    err = new Error()
    err.status = 400
    err.message = "Bad Request"
    err.errors = errors
    return next (err)
  }
  const spots = await Spot.findAll({
    limit: size,
    offset: offset,
    where
  })

  let resultsSpot = []
    // go threw each spot to formatt correctly
    for (let spot of spots){
        spot = spot.toJSON()
        if(spot){        // get the average rating
       let starsum = await Review.sum('stars', {where: {spotId: spot.id}}) // add up all star values for spot
       let {count} = await Review.findAndCountAll( {where: {spotId: spot.id}, attributes: ['stars']}) // count the number of reviews
       spot.avgRating = starsum/count // math to get the average
        // get the url for the preview image

        const image = await Image.findOne({
          where: { refId: spot.id, preview: true },
          attributes: [ "url"],
          raw: true
        });
        if(image){spot.previewImage = image.url;}else {spot.previewImage =  null}
        // add the spot to the array
        resultsSpot.push(spot)
      }

    }
    // add the spot to the array

  return res.json({"Spots":resultsSpot, page, size});
});

/*******************************************
    GET SPOT BY ID
******************************************/
router.get("/:id", async (req, res, next) => {
  // find the spot by id
  let spot = await Spot.findByPk(+req.params.id);
  // throw error if spot is not found
  if (!spot) {
    const spot = new Error();
    spot.title = "Invalid Spot";
    spot.status = 404;
    spot.message = "Spot couldn't be found";
    return next(spot);
  }
  //convert into POJO for manipulation
  spot = spot.toJSON();

  // find and count the reviews with spotId of spot.id
  let starsum = await Review.sum("stars", { where: { spotId: spot.id } }); // add up all star values for spot
  let { count } = await Review.findAndCountAll({
    where: { spotId: spot.id },
    attributes: ["stars"],
  });
  // add count to spot as numReviews
  spot.numReviews = count;
  // get the average of rating and add as avgStarRating
  spot.avgStarRating = starsum / count;
  // find the images where refId is the spotId, grab id, url, preview
  const images = await Image.findAll({
    where: { refId: +req.params.id, type: "Spot" },
    attributes: ["id", "url", "preview"],
  });
  // add the images to spot as SpotImages
  if(images){spot.SpotImages = images;}else {spot.SpotImages =  null}

  // find user by the spot's OwnerId, grab id, firstname and last name
  const owner = await User.findOne({
    where: { id: spot.ownerId },
    attributes: ["id", "firstName", "lastName"],
  });
  // add to spot as "owner"
  spot.Owner = owner;
  res.json(spot);
});
/*******************************************
    GET REVIEWS BY SPOT ID
******************************************/
router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const spot = new Error();
    spot.title = "Invalid Spot";
    spot.status = 404;
    spot.message = "Spot couldn't be found";
    return next(spot);
  }
  const editedReviews = [];
  let reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
  });
  for (let review of reviews) {
    review = review.toJSON();
    const user = await User.findOne({
      where: { id: review.userId },
      attributes: ["id", "firstName", "lastName"],
    });
    review.User = user;
    const images = await Image.findAll({
      where: { type: "Review", refId: review.id },
      attributes: ["id", "url"],
    });
    if(images){ review.ReviewImages = images;} else {review.ReviewImages = null}


    editedReviews.push(review);
  }
  return res.json({"Reviews":editedReviews});
});
/*******************************************
    GET BOOKINGS BY SPOT ID
******************************************/
router.get('/:id/bookings', async (req, res, next) => {
  if (!req.user) {
    const autherr = new Error();
    autherr.status = 401;
    autherr.message = "Authentication required";
    return next(autherr);
  }

  let spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    let err = new Error();
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }

  if (spot.ownerId !== req.user.id) {
    let bookings = await Booking.findAll({
      where: { spotId: req.params.id },
      attributes: ['spotId', 'startDate', 'endDate'],
      raw: true
    });
    return res.json({'Bookings': bookings})
  }

  let formatted = [];

  let bookings = await Booking.findAll({
    where: { spotId: req.params.id },
    raw: true
  });

  for (let booking in bookings) {
    let spotObj = {};

    let user = await User.findOne({
      where: { id: bookings[booking].userId },
      attributes: ['id', 'firstName', 'lastName'],
      raw: true
    });

    spotObj.User = user;
    spotObj.id = bookings[booking].id;
    spotObj.spotId = bookings[booking].spotId;
    spotObj.userId = bookings[booking].userId;
    spotObj.startDate = bookings[booking].startDate;
    spotObj.endDate = bookings[booking].endDate;
    spotObj.createdAt = bookings[booking].createdAt;
    spotObj.updatedAt = bookings[booking].updatedAt;

    formatted.push(spotObj);
  }

  return res.json({ "Bookings": formatted });
});



/*******************************************
    CREATE A SPOT
******************************************/
router.post("/", validateSpot,async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (!req.user) {
    const autherr = new Error();
    autherr.status = 401;
    autherr.message = "Authentication required";
    return next(autherr);
  } else {

      const newSpot = await Spot.create({
        ownerId: +req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });

      res.json(newSpot);

  }
});
/*******************************************
    ADD REVIEW FROM SPOT ID
******************************************/
router.post("/:id/reviews", async (req, res, next) => {
  if (!req.user) {
    const aerror = new Error();
    aerror.status = 401;
    aerror.message = "Authentication Required";
    return next(aerror);
  }
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    const error = new Error();
    error.status = 404;
    error.message = "Spot couldn't be found";
    return next(error);
  }
  const currentreview = await Review.findOne({
    where: { userId: req.user.id, spotId: req.params.id },
  });
  if (currentreview) {
    const error = new Error();
    error.status = 500;
    error.message = "User already has a review for this spot";
    return next(error);
  }
  const { review, stars } = req.body;
  if(!review || !stars || stars > 5 || stars < 1){
    const newerr = new Error();
      newerr.status = 400;
      newerr.title = "Invalid Inputs";
      newerr.message = "Bad Request"
      const errors = {};
      if(!review){
        errors.review = "Review text is required"
      }
      if(!stars){
        errors.stars = "Stars is required"
      }
      if(stars > 5 || stars < 1){
        errors.stars = "Stars must be an integer from 1 to 5"
      }

      newerr.errors = errors;
      return next (newerr)

  }
  const newReview = await Review.create({
    userId: +req.user.id,
    spotId: +req.params.id,
    review,
    stars,
  });
  res.json(newReview);
});

/*******************************************
    ADD IMAGE FROM SPOT ID
******************************************/
router.post("/:id/images", async (req, res, next) => {
  const { url, preview } = req.body;
  if (!req.user) {
    const autherr = new Error();
    autherr.status = 401;
    autherr.message = "Authentication required";
    return next(autherr);
  }

  const spot = await Spot.findByPk(+req.params.id);

  if (!spot) {
    const spot = new Error();
    spot.status = 404;
    spot.message = "Spot couldn't be found";
    return next(spot);
  }
  if (spot.ownerId !== +req.user.id) {
    const permerr = new Error();
    permerr.status = 403;
    permerr.message = "Forbidden";
    return next(permerr);
  } else {
    const newImage = await Image.create({
      url,
      preview,
      type: "Spot",
      refId: +req.params.id,
    });

    const resObj = {
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    }
    res.json(resObj);
  }
});

/*******************************************
    CREATE A BOOKING FROM SPOT ID
******************************************/
router.post('/:id/bookings',validateBooking,async(req, res, next)=>{
  const {startDate, endDate} = req.body

  if(!req.user){
    const autherr = new Error();
    autherr.status = 401;
    autherr.message = "Authentication required";
    return next(autherr);
  }
  const spot = await Spot.findByPk(req.params.id)
  if(!spot){
    const autherr = new Error();
    autherr.status = 404;
    autherr.message = "Spot couldn't be found";
    return next(autherr);
  }
  if(spot.ownerId === req.user.id){
    const autherr = new Error();
    autherr.status = 403;
    autherr.message = "Forbidden";
    return next(autherr);
  }
  if(endDate <= startDate){
    const err = new Error();
    err.status = 400;
    err.message = "Bad Request"
    let errors= {endDate: "endDate cannot be on or before startDate"};
    err.errors = errors
    return next (err)
  }
  const existingBookings = await Booking.findAll({
    where:{spotId: spot.id},
    attributes: ['startDate', 'endDate'],
    raw:true
  })

  for (const dates of existingBookings) {

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
      if(NendDate >=  EstartDate && NendDate <= EendDate){
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates";
        err.status = 403
        errors = {endDate: "End date conflicts with an existing booking"}
        err.errors = errors
        return next (err)
      }

  }

let newBooking = await Booking.create({
  spotId: spot.id,
  userId: req.user.id,
  startDate,
  endDate
})
return res.json(newBooking)
})



/*******************************************
    EDIT A SPOT
******************************************/
router.put("/:id", validateSpot,async (req, res, next) => {

    if (!req.user) {
      const autherr = new Error();
      autherr.status = 401;
      autherr.message = "Authentication required";
      return next(autherr);
    }
    let spot = await Spot.findByPk(req.params.id);
    let { address, city, state, country, lat, lng, name, description, price } =
      req.body;
    if (!spot) {
      const spoterr = new Error();
      spoterr.status = 404;
      spoterr.message = "Spot couldn't be found";
      return next(spoterr);
    }
    if (spot.ownerId !== req.user.id) {
      const perror = new Error();
      perror.status = 403;
      perror.message = "Forbidden";
      return next(perror);
    }

    let updatedSpot = await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    res.json(updatedSpot);

});
/*******************************************
    DELETE A SPOT
******************************************/
router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      if (!req.user) {
        const autherr = new Error();
        autherr.status = 401;
        autherr.message = "Authentication required";
        return next(autherr);
      }
    }
    let spot = await Spot.findByPk(req.params.id);
    if (!spot) {
      const spoterr = new Error();
      spoterr.status = 404;
      spoterr.message = "Spot couldn't be found";
      return next(spoterr);
    }
    if (spot.ownerId !== req.user.id) {
      const perror = new Error();
      perror.status = 403;
      perror.message = "Forbidden";
      return next(perror);
    }
    await spot.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});
/*******************************************
    DELETE A SPOT IMAGE
******************************************/

router.delete("/images/:id", async (req, res, next) => {
  // Throw an error if a user is not signed in
  if (!req.user) {
    const autherr = new Error();
    autherr.status = 401;
    autherr.message = "Authentication required";
    return next(autherr);
  }
  // Get the user ID
  const userId = req.user.id;
  // Get the image and related Spot info
  const image = await Image.findOne({
    where: { id: req.params.id },
    include: Spot,
  });
  // check that the image was found
  if (image) {
    // Throw an error if the current user does not own the spot
    if (userId !== image.Spot.ownerId) {
      const permerr = new Error();
      permerr.status = 403;
      permerr.message = "Forbidden";
      return next(permerr);
    } // Otherwise delete the image and send a response
    else {
      await image.destroy();
      return res.json({ message: "Successfully deleted" });
    }
  } // throw an error if the image isn't found
  else {
    const spot = new Error();
    spot.status = 404;
    spot.message = "Image couldn't be found";
    return next(spot);
  }
});

module.exports = router;
