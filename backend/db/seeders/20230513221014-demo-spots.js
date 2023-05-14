'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
      ownerId: 10,
      address: '1328 Sunset Blvd',
      city: 'Daytona',
      state: 'Florida',
      country: 'USA',
      lat: 29.218103,
      lng: -81.031723,
      name: 'Rustic Beach Adjacent',
      description: 'Enjoy a quiet relaxing evening sipping margaritas at this charming rustic villa just minutes from the beach',
      price: 150
     },
     {
      ownerId: 11,
      address: '172 Peninsula Xing',
      city: 'Evans',
      state: 'Georgia',
      country: 'USA',
      lat: 33.5067,
      lng: -82.1373,
      name: 'Dreaming of Golf',
      description: 'Stay in a beautiful giant house for the Masters golf Tournament. Complete with tons of amenities that youll never even touch!',
      price: 500
     },
     {
      ownerId: 10,
      address: '331 E 44th St',
      city: 'Savannah',
      state: 'Georgia',
      country: 'USA',
      lat: 32.076176,
      lng: -81.088371,
      name: 'Haunted Southern Mansion',
      description: 'Get spooked by ghost here in this haunted Southern mansion. ',
      price: 75
     }])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Haunted Southern Mansion', 'Dreaming of Golf', 'Rustic Beach Adjacent'] }
    }, {});
  }
};
