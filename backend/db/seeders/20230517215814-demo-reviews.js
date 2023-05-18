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
      {
        spotId: 1,
        userId: 2,
        description: "The chairs has a country home feel to them. Sitting in them made me feel at home",
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        description: "Super worn out seating. Smelled like farts",
        stars: 1
      },
      {
        spotId: 1,
        userId: 4,
        description: "Found peace in the attic sitting under a sunlight. Even had a coffee bar nearby!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 5,
        description: "I saw a BEAR!!!!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 6,
        description: "Felt like a mix between my grandma's house and a church.",
        stars: 2
      },
      {
        spotId: 2,
        userId: 7,
        description: "The seating was NOT comfy!!!!!",
        stars: 1
      },
      {
        spotId: 3,
        userId: 8,
        description: "Crazy Nice view and the couch was such a relaxing place to sit!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 9,
        description: "THAT VIEW THO!!!!!!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 10,
        description: "The seating was okay. I'm here to SIT not LOOK!!!",
        stars: 2
      },
      {
        spotId: 4,
        userId: 1,
        description: "THIS PLACE IS CREEPY AND DIRTY!! LOOK AT THIS ROOM!!!",
        stars: 1
      },
      {
        spotId: 5,
        userId: 2,
        description: "I LOVED sitting outside in the garden!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        description: "Curling up on the couch in front of the wood burning stove reading a book was a DREAM!!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        description: "It was nice to sit at the bar area and drink by myself! I'm not an alcoholic .....",
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        description: "I flew in on my private jet just to sit around like I'm middle class",
        stars: 2
      },
      {
        spotId: 6,
        userId: 6,
        description: "Too much plane noise!!!!",
        stars: 1
      },
      {
        spotId: 7,
        userId: 7,
        description: "This place is so colorful and VIBRANT!!! My insta pictures look amazing!!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 8,
        description: "The colors were overstimulating and the chairs weren't even comfortable",
        stars: 2
      },
      {
        spotId: 8,
        userId: 3,
        description: "BLAND AND PLAIN!!! ",
        stars: 2
      },
      {
        spotId: 8,
        userId: 10,
        description: "Wonderful library but the only place to sit was this super hard chair!!!",
        stars: 1
      },
      {
        spotId: 8,
        userId: 9,
        description: "I like sitting on the pedal chair and make zoom noises",
        stars: 5
      },
      {
        spotId: 9,
        userId: 2,
        description: "I liked being able to wake up and immediately sit down.",
        stars: 5
      },
      {
        spotId: 9,
        userId: 3,
        description: "The views from the couch was stunning!!",
        stars: 4
      },
      {
        spotId: 10,
        userId: 4,
        description: "After sitting here I know why the caged bird sings",
        stars: 3
      },
      {
        spotId: 10,
        userId: 5,
        description: "Just look at the view from this patio! I loved sitting out here in the morning drinking my coffee!!",
        stars: 5
      },
      {
        spotId: 10,
        userId: 6,
        description: "I loved feeling like I was a part of the earth. Perfect location to meditate and focus on self-improvement",
        stars: 5
      },
      {
        spotId: 10,
        userId: 7,
        description: "it was okay",
        stars: 3
      },
      {
        spotId: 11,
        userId: 8,
        description: "who wants to sit right infront of the TV?!",
        stars: 3
      },
      {
        spotId: 11,
        userId: 9,
        description: "I loved visiting Ms. Coconut! Sitting on a boat on the water was something so unique and special",
        stars: 5
      },
      {
        spotId: 11,
        userId: 10,
        description: "What a lovely place to sit around browsing reddit!!!",
        stars: 5
      },
      {
        spotId: 12,
        userId: 10,
        description: "I liked sitting on the porch and catcalling golfers as they rode by in thier tight tight pants",
        stars: 5
      },
      {
        spotId: 12,
        userId: 9,
        description: "Sitting at the desk pretending to be a business man was so lit!",
        stars: 5
      },
      {
        spotId: 12,
        userId: 8,
        description: "I came for golfing but ended up just lounging on the couch the whole time. Excellent.",
        stars: 5
      },
      {
        spotId: 13,
        userId: 7,
        description: "I think this place is haunted .... ",
        stars: 1
      },
      {
        spotId: 13,
        userId: 10,
        description: "I felt like I was being watched and judged the entire time I sat around looking at 'educational' videos. Luckily I am into that ",
        stars: 3
      },
      {
        spotId: 13,
        userId: 5,
        description: "Yeah thats a no from me ",
        stars: 1
      },
      {
        spotId: 14,
        userId: 1,
        description: "The living spaces were cramped and the seating was not great",
        stars: 2
      },
      {
        spotId: 14,
        userId: 9,
        description: "I sat in a tractor!!!!",
        stars: 2
      },
      {
        spotId: 15,
        userId: 9,
        description: "I pretended to be a wood witch!!! ",
        stars: 5
      },
      {
        spotId: 15,
        userId: 2,
        description: "Lovely place to sit and think where did I go wrong in my life? ",
        stars: 5
      },
      {
        spotId: 15,
        userId: 5,
        description: "This place was so inspiring that it helped me write a book! I love it here!!!! ",
        stars: 5
      }

    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
