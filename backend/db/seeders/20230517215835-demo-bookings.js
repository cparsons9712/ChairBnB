'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:3,
        startDate: "2023-06-15",
        endDate:"2023-06-20" ,
      },
      {
        spotId:2,
        userId:9,
        startDate: "2023-10-15",
        endDate:"2023-10-25" ,
      },
      {
        spotId:3,
        userId:4,
        startDate: "2023-7-1",
        endDate:"2023-7-7",
      },
      {
        spotId:4,
        userId:1,
        startDate: "2023-08-5",
        endDate:"2023-08-10",
      },
      {
        spotId:5,
        userId:6,
        startDate: "2023-09-11",
        endDate:"2023-09-13",
      },
      {
        spotId:6,
        userId:2,
        startDate: "2023-11-11",
        endDate:"2023-11-16",
      },
      {
        spotId:1,
        userId:7,
        startDate: "2023-11-11",
        endDate:"2023-11-16",
      },
      {
        spotId:15,
        userId:10,
        startDate: "2023-07-15",
        endDate:"2023-07-20",
      },
      {
        spotId:11,
        userId:8,
        startDate: "2023-08-15",
        endDate:"2023-08-20",
      },
      {
        spotId:10,
        userId:4,
        startDate: "2023-08-15",
        endDate:"2023-08-20",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {});
  }
};
