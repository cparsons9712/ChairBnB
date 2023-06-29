'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/1/1a.jpg',
        preview: true,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/1/1b.jpg',
        preview: false,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/1/1d.jpg',
        preview: false,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/1/1f.jpg',
        preview: false,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/1/1g.jpg',
        preview: false,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/2a.jpg',
        preview: true,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/2b.jpg',
        preview: false,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/2c.jpg',
        preview: false,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/2d.jpg',
        preview: false,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/2e.jpg',
        preview: false,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/spot2rev1.jpg',
        preview: false,
        type: 'Review',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/2/spt2rev1.jpg',
        preview: false,
        type: 'Review',
        refId: 1
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/3a.jpg',
        preview: true,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/3b.jpg',
        preview: false,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/3c.jpg',
        preview: false,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/3d.jpg',
        preview: false,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/3e.jpg',
        preview: false,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/3/spot3rev2.jpg',
        preview: false,
        type: 'Review',
        refId: 2
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/4/4a.jpg',
        preview: true,
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/4/4b.jpg',
        preview: false,
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/4/4c.jpg',
        preview: false,
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/4/4d.jpg',
        preview: false,
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/4/4e.jpg',
        preview: false,
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/5a.jpg',
        preview: true,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/5b.jpg',
        preview: false,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/5c.jpg',
        preview: false,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/5d.jpg',
        preview: false,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/5e.jpg',
        preview: false,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/rev3spot5.jpg',
        preview: false,
        type: 'Review',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/5/rev3spot5B.jpg',
        preview: false,
        type: 'Review',
        refId: 3
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/rev4spot6.jpg',
        preview: false,
        type: 'Review',
        refId: 4
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/6a.jpg',
        preview: true,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/6b.jpg',
        preview: false,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/6c.jpg',
        preview: false,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/6d.jpg',
        preview: false,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/6/6e.jpg',
        preview: false,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/7a.jpg',
        preview: true,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/7b.jpg',
        preview: false,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/7c.jpg',
        preview: false,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/7d.jpg',
        preview: false,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/7e.jpg',
        preview: false,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/rev5spot7.jpg',
        preview: false,
        type: 'Review',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/7/rev5spot7b.jpeg',
        preview: false,
        type: 'Review',
        refId: 5
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/8a.jpg',
        preview: true,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/8b.jpg',
        preview: false,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/8c.jpg',
        preview: false,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/8d.jpg',
        preview: false,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/8e.jpg',
        preview: false,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/8/rev6spot8.jpg',
        preview: false,
        type: 'Review',
        refId: 6
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/9/9a.jpg',
        preview: true,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/9/9b.jpg',
        preview: false,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/9/9c.jpg',
        preview: false,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/9/9d.jpg',
        preview: false,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/9/9e.jpg',
        preview: false,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/10a.jpg',
        preview: true,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/10b.jpg',
        preview: false,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/10c.jpg',
        preview: false,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/10d.jpg',
        preview: false,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/10e.jpg',
        preview: false,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/10/rev7spot10.jpg',
        preview: false,
        type: 'Review',
        refId: 7
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/11/11a.jpg',
        preview: true,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/11/11b.jpg',
        preview: false,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/11/11c.jpg',
        preview: false,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/11/11d.jpg',
        preview: false,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/11/11e.jpg',
        preview: false,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/12/12a.jpg',
        preview: true,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/12/12b.jpg',
        preview: false,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/12/12c.jpg',
        preview: false,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/12/12d.jpg',
        preview: false,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/12/12e.jpg',
        preview: false,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/13/13a.jpg',
        preview: true,
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/13/13b.jpg',
        preview: false,
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/13/13c.jpg',
        preview: false,
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/13/13d.jpg',
        preview: false,
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/14/14a.jpg',
        preview: true,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/14/14b.jpg',
        preview: false,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/14/14c.jpg',
        preview: false,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/14/14d.jpg',
        preview: false,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/14/14e.jpg',
        preview: false,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/15/15a.jpg',
        preview: true,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/15/15b.jpeg',
        preview: false,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/15/15c.jpg',
        preview: false,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/15/15d.jpg',
        preview: false,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/15/15e.jpg',
        preview: false,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/16/16a.png',
        preview: true,
        type: 'Spot',
        refId: 16
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/16/16b.png',
        preview: false,
        type: 'Spot',
        refId: 16
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/16/16c.png',
        preview: false,
        type: 'Spot',
        refId: 16
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/16/16d.png',
        preview: false,
        type: 'Spot',
        refId: 16
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/16/16e.png',
        preview: false,
        type: 'Spot',
        refId: 16
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/17/17a.jpg',
        preview: true,
        type: 'Spot',
        refId: 17
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/17/17b.jpg',
        preview: false,
        type: 'Spot',
        refId: 17
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/17/17c.jpg',
        preview: false,
        type: 'Spot',
        refId: 17
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/17/17d.jpg',
        preview: false,
        type: 'Spot',
        refId: 17
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/17/17e.jpg',
        preview: false,
        type: 'Spot',
        refId: 17
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/18/18a.png',
        preview: true,
        type: 'Spot',
        refId: 18
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/18/18b.png',
        preview: false,
        type: 'Spot',
        refId: 18
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/18/18c.png',
        preview: false,
        type: 'Spot',
        refId: 18
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/18/18d.png',
        preview: false,
        type: 'Spot',
        refId: 18
      },
      {
        url: 'https://cparsonsawsbucket.s3.amazonaws.com/hauntedplaces/18/18e.png',
        preview: false,
        type: 'Spot',
        refId: 18
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});
  }
};
