const express = require("express");
const { Image, Spot, Review, User,Booking, sequelize } = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();







/*******************************************
GET ALL BOOKINGS
******************************************/
router.get('/', async (req, res) => {

      const bookings = await Booking.findAll({ raw: true });

      return res.json(bookings);

  });;

module.exports = router;
