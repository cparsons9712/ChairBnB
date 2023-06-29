'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      { //1
        spotId: 2,
        userId: 5,
        review: "This place is really scary. I took a walk outside at night and saw a ghostly shadow in one of the windows!!",
        stars: 4
      },
      { //2
        spotId: 3,
        userId: 1,
        review: "I mean it honestly wasn't that spooky at all. I felt pretty at ease here. My insta pics are FIRE tho!",
        stars: 3
      },
      { //3
        spotId: 5,
        userId: 7,
        review: "My team and I decided to do an investigation here. We got some good readings and even some recordings of disembodied voiced. At the very beggining we took a group picture and when we looked over it later we saw something behind us! ",
        stars: 5
      },
      { //4
        spotId: 6,
        userId: 7,
        review: "Holy He** this place is scary! I even got a clear as day photo of a ghost girl in a window. Never going back, great experience!",
        stars: 5
      },
      { //5
        spotId: 7,
        userId: 8,
        review: "We did an investigation at this location and while we didn't get any good evidence this time it is clear to us that this place is haunted.We all felt deep feelings of despair and panic throughout the night.",
        stars: 3
      },
      { //6
        spotId: 8,
        userId: 3,
        review: "What a hauntingly beautiful place!",
        stars: 4
      },
      { //7
        spotId: 10,
        userId: 8,
        review: "CHECK OUT THIS CREEPY PICTURE!! YOOO WTF!!!",
        stars: 4
      },
      { //8
        spotId: 10,
        userId: 8,
        review: "I got my covid shot at Dracula's Castle!! this place is AMAZING!!",
        stars: 5
      },
      { //9
        spotId: 12,
        userId: 6,
        review: "Yeah This place is legit creepy. I was taking a picture of the stairs and later saw theres a freakin lady in it?! WTF!!",
        stars: 5
      },
      { //10
        spotId: 12,
        userId: 4,
        review: "We hosted a get togeather here and in one of our random pics theres a blurry THING with us. So creepy! ",
        stars: 4
      },
      { //11
        spotId: 13,
        userId: 6,
        review: "NOOO I have a picture of SOMETHING ON THE PORCH! WOW Ghost ARE real!!! ",
        stars: 5
      },
      { //12
        spotId: 14,
        userId: 7,
        review: "Saw the grumpy man at the bar. Super cool experience. ",
        stars: 3
      },
      { //13
        spotId: 15,
        userId: 2,
        review: "THERES A GHOST IN OUR GROUP PIC!! ",
        stars: 4
      },
      { //14
        spotId: 18,
        userId: 10,
        review: "I caught an amazingly clear picture of a ghost!",
        stars: 5
      },


    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
