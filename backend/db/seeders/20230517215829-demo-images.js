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
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7zete-EzOtfEgHBz?e=QAwIqN',
        preview: true,
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7zoIm3m4lfUj8lBj?e=Rv8BJy',
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7z679dMzzfX6N6b3?e=oFFplc',
        type: 'Spot',
        refId: 1
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/03/visiting-bear.jpg',
        type: 'Review',
        refId: 4
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7zy4xGcY8dN8QlJc?e=ZVm4c5',
        type: 'Review',
        refId: 3
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/05/photo_74546864-1500x1000-1.jpg',
        preview: true,
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/05/photo_74546861-1500x1000-1.jpg',
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/05/photo_70971165-1500x1000-1.jpg',
        type: 'Spot',
        refId: 2
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/05/photo_70971157-1500x1000-1.jpg',
        type: 'Review',
        refId: 5
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7x2nuBGV9MUfwrxs?e=cSMvbM',
        preview:true,
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2021/11/promontory-aa7.png',
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7xz_hKqpDf-V6Oe3?e=wwDAZe',
        type: 'Spot',
        refId: 3
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2021/11/promontory-ab1.png',
        type: 'Review',
        refId: 8
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yDRbYSp0q3IFDUM?e=PmorBD',
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yE6dD9fJlUZcjCd?e=1iEkeT',
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yIYlnreRCeq4f5q?e=KkBoQ4',
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7x_Q4BxdcHZvbMdj?e=ea7WjU',
        type: 'Spot',
        refId: 4
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yVHPvdJKbX7BU_B?e=iqlL6V',
        type: 'Review',
        refId: 10
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7ymiTDrmhJXZMaG7?e=E4rTS9',
        preview: true,
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/04/kitchenarea.jpg',
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yo5od4bHYXj_hTr?e=SOxrE7',
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7ytb3uZShsnfZl4Y?e=aDUpYJ',
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7yxhwPDFOsCSyUa-?e=EJYlzI',
        type: 'Spot',
        refId: 5
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7y0OMOcn4nrElo8R?e=xFU445',
        type: 'Review',
        refId: 12
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/03/sw-15th-st-bell-fl-4.jpg',
        preview: true,
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/03/sw-15th-st-bell-fl-a1.jpg',
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7zPe3Ar94rI9j6bn?e=t1IKvP',
        type: 'Spot',
        refId: 6
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70ONpRf5Kr6Az-7s?e=mqmRwn',
        preview: true,
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70RcByp5Wl1bKBbp?e=QZFlbg',
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70Z3-T1k-mE6zGsh?e=83443c',
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70hPgNDU9S6SPImj?e=zcx5AY',
        type: 'Spot',
        refId: 7
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70vAbtZIa9i4KH_k?e=exgeT0',
        preview: true,
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/03/interiors-1.jpg',
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7013KExtkhytuCIH?e=lZgEQ2',
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr7013KExtkhytuCIH?e=O0UdSz',
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr70_EOCg5DplJjT0M?e=7eGtCF',
        type: 'Spot',
        refId: 8
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71AWkmJQEcveZ1Ao?e=syeG3V',
        type: 'Review',
        refId: 19
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71OMY2-TWAfdgp2R?e=y2xGuj',
        preview: true,
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71d03hVd3wA3vjlO?e=j1KpGf',
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71nvp-K-HlGLqmRi?e=NwtEA9',
        type: 'Spot',
        refId: 9
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71zNPRYcygoWrSgN?e=1V3d5g',
        preview: true,
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72CIuF8IGRBD0xp1?e=Yd7oNP',
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/02/d3s0237.jpg',
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71_QAHVOYXwN_k8R?e=H1Nm13',
        type: 'Spot',
        refId: 10
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr712Lejzfbbov-I1O?e=X54sA0',
        type: 'Review',
        refId: 23
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr71701pcni4oTxf19?e=SvJPip',
        type: 'Review',
        refId: 24
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72dMfvcLkKHyHeFL?e=cHc69s',
        preview: true,
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/01/p1010174-scaled.webp',
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/01/p1010403-1-scaled.webp',
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/01/p1010422shadows-scaled.webp',
        type: 'Spot',
        refId: 11
      },
      {
        url: 'https://specialfinds.com/wp-content/uploads/2023/01/p1010459-scaled.webp',
        type: 'Review',
        refId: 27
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr720GJonVT9ksVAHg?e=9wbkbr',
        preview: true,
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72nzb3fFam4Mls-a?e=PnvJa0',
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72p7FrgyoQ-M4ak6?e=ukpk53',
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72yft_qog73-RSIY?e=5WDhHU',
        type: 'Spot',
        refId: 12
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72u7wMkt6p3WfJZx?e=8jc3xp',
        type: 'Review',
        refId: 31
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr72_zB10dgykFUax3?e=X0qlix',
        preview: true,
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73ATmd6mujPRtt4I?e=dQv9dc',
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73Hhvl6OEElN_5ig?e=irbrvn',
        type: 'Spot',
        refId: 13
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73TZQoY0HPuFRA6x?e=CP64EL',
        preview: true,
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73bNa4e7_u3E2_8y?e=gdvQeu',
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73Ul8GHYK--guFqy?e=OucrB3',
        type: 'Spot',
        refId: 14
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73c6930y9Kg-Vrpp?e=bCxlIH',
        type: 'Review',
        refId: 37
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73kxxT81WSkjp7gE?e=IwwfGx',
        preview: true,
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73ofjvgKFrclotXz?e=gxuOEj',
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr73ysHp-kUHurXjZR?e=7dfWti',
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr734a_JtW1a9ZQTXN?e=l6b4qb',
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr8ABBVIUw1NRY4tMU?e=xWMTsi',
        type: 'Spot',
        refId: 15
      },
      {
        url: 'https://1drv.ms/i/s!AoCHtlc83mlr8AKW1gcJaakUb2Ez?e=jE32Cw',
        type: 'Spot',
        refId: 15
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});
  }
};
