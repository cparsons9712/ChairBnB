const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};


const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('startDate is required'),
    check('endDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('startDate is required'),
  check('startDate')
    .isDate()
    .withMessage('startDate must be in yyyy-mm-dd format'),
  check('endDate')
    .isDate()
    .withMessage('endDate must be in yyyy-mm-dd format'),

  handleValidationErrors
];


module.exports = {
  handleValidationErrors,
  validateBooking
};
