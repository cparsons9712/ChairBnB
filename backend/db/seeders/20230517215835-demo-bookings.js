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
        startDate: "2023-6-15",
        endDate:"2023-6-20" ,
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
        startDate: "2023-8-5",
        endDate:"2023-8-10",
      },
      {
        spotId:5,
        userId:6,
        startDate: "2023-9-11",
        endDate:"2023-9-13",
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
        startDate: "2023-7-15",
        endDate:"2023-7-20",
      },
      {
        spotId:11,
        userId:8,
        startDate: "2023-8-15",
        endDate:"2023-8-20",
      },
      {
        spotId:10,
        userId:4,
        startDate: "2023-8-15",
        endDate:"2023-8-20",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {});
  }
};
