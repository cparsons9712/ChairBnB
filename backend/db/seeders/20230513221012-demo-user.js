'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Isabella',
        lastName: 'Long',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Joe',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'Hailey',
        lastName: 'French',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Bailey',
        lastName: 'Hamilton',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'Morgan',
        lastName: 'White',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: 'Oliver',
        lastName: 'Ford',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        firstName: 'Theodore',
        lastName: 'Collymore',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        firstName: 'Aurora',
        lastName: 'Ledger',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        firstName: 'Jasper',
        lastName: 'Stoll',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        firstName: 'Hazel',
        lastName: 'Hayes',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};
