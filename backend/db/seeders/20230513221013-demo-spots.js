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
      ownerId: 1,
      address: '1280 Dunn Lake Rd',
      city: 'Clearwater',
      state: 'British Columbia',
      country: 'Canada',
      lat: 51.6511,
      lng: 120.0382,
      name: 'Shiloh Springs',
      description: 'Welcome to Shiloh Springs, your perfect country home in the heart of 55 acres of hard-to-find mountain land. A veritable private forest in British Columbia, Canada. With a stunning valley vista just 7 kilometers from Clearwater, this premier location offers luxury living and an extensive natural playground.',
      price: 500
     },
     {
      ownerId: 2,
      address: '1222 Route 23',
      city: 'Wantage',
      state: 'New Jersey',
      country: 'USA',
      lat: 39.833851,
      lng: 74.4057,
      name: 'Creek Side Converted Church',
      description: 'Since 1877 this pretty church has watched over a choice corner parcel in Wantage, NJ. On 1.06-acre acres a babbling brook flows through the property. A walking bridge spans two yards, perfect for picnics, meditation, or gardening. Part of the yard is fenced. The church has historical significance in the community.',
      price: 350
     },
     {
      ownerId: 3,
      address: '1643 Promontory Dr',
      city: 'Cedar Hill',
      state: 'Texas',
      country: 'USA',
      lat: 32.5885,
      lng: 96.9561,
      name: 'Hilltop Waterview',
      description: 'Sitting on 24+ acres on a hilltop, and tucked away BEHIND 2 SECURITY GATES, it is private and secure. The Frank Lloyd Wright-inspired design of this unique home takes FULL advantage of the stunning views. Blending with nature, this home of almost 7500 square feet of air-conditioned space and 12,000+ square feet under roof, rests on the high ground 250 feet above and overlooking all 7740 acres of Joe Pool Lake.',
      price: 750
     },
     {
      ownerId: 4,
      address: '55 Eagle View Drive',
      city: 'Pine Hill',
      state: 'New Mexico',
      country: 'USA',
      lat: 35.5885,
      lng: 108.9561,
      name: 'Cabin',
      description: 'VIEWS that bring you to the SKY! The nice deck is a spot to drink your coffee or evening tea. Or you can BBQ just outside the living room sliding glass doors. Make this your Peaceful Paradise!',
      price: 150
     },
     {
      ownerId: 5,
      address: '5396 East Camino Cielo',
      city: 'Santa Barbara',
      state: 'California',
      country: 'USA',
      lat: 34.4885,
      lng: 119.6961,
      name: 'Historic Cielo Store Transformed',
      description: 'Located just 10 minutes from Santa Barbara, this verdant oasis boasts endless opportunities for organic farming, gourmet chefs, foodies, wine and mixology aficionados, retreat centers, and much more.',
      price: 425
     },
     {
      ownerId: 6,
      address: '1710 SW 15th St',
      city: 'Bell',
      state: 'Florida',
      country: 'USA',
      lat: 29.7555,
      lng: 82.8626,
      name: 'Fly-in Farm',
      description: 'Fly your plane right to the front door. Park in your private hangar. ',
      price: 350
     },
     {
      ownerId: 7,
      address: '3434 Tanners Ridge Road',
      city: 'Stanley',
      state: 'Virginia',
      country: 'USA',
      lat: 38.5754,
      lng: 78.5025,
      name: 'Church Museum ',
      description: 'A once in a lifetime opportunity to stay at the historic site “Tanners Ridge Mission (1921-1966)”. The Sculpture Garden is a virtual 2.75-acre museum filled with fantastic, vibrant sculptures that can only be appreciated as you meander among them.',
      price: 225
     },
     {
      ownerId: 8,
      address: '1991 CR 502',
      city: 'Beeville',
      state: 'Texas',
      country: 'USA',
      lat: 28.4064,
      lng: 97.7417,
      name: 'European Plantation',
      description: 'This 6211 square foot European Plantation Style home is a work of art beginning with the elaborate plasterwork, milled flooring, elegant lighting, and sun-filled rooms.',
      price: 650
     },
     {
      ownerId: 9,
      address: '1418 South Rocky Hill Rd',
      city: 'Galena',
      state: 'Illinois',
      country: 'USA',
      lat: 42.4167,
      lng: 90.4290,
      name: 'Overlooking the Mississippi',
      description: 'Designed to take in the ever-present views of the Mississippi River, this open-concept contemporary is ideal for entertaining.',
      price: 550
     },
     {
      ownerId: 10,
      address: '4 New Mountain Road',
      city: 'Johannesburg',
      state: 'Gauteng',
      country: 'South Africa',
      lat: 26.2041,
      lng: 28.0473,
      name: 'Earth Connected',
      description: 'This exceptionally engineered, beautiful, and environmentally friendly house is built into the side of the mountain on Linksfield Ridge in Johannesburg, South Africa.',
      price: 375
     },
     {
      ownerId: 1,
      address: 'Ensenada Cruiseport Village Marina',
      city: 'Ensenada',
      state: 'B.C.',
      country: 'Mexico',
      name: 'Coconut the Boat House',
      description: 'Like a Coconut bobbing around in the ocean, life aboard her is simple, easy, and uncomplicated, yet she has been endowed with bells and whistles beyond the imagination!',
      price: 125
     },
     {
      ownerId: 2,
      address: '12974 Wood Harbour Drive',
      city: 'Montgomery',
      state: 'Texas',
      country: 'USA',
      name: 'Walden Waterfront',
      description: 'Located between the green on hole #8 of the Championship Walden Golf Course and the wide open waters of Lake Conroe.',
      price: 1200
     },
     {
      ownerId: 3,
      address: '1790 River Rd',
      city: 'Solon',
      state: 'Maine',
      country: 'USA',
      name: 'Converted Chapel',
      description: 'This pristine chapel fits right in with the beautiful, wooded property located in Solon, Maine.',
      price: 75
     },
     {
      ownerId: 4,
      address: 'Nhn 5900 Road South',
      city: 'Conrad',
      state: 'Montana',
      country: 'USA',
      name: 'Montana Quonset',
      description: 'Unique custom-built three-level, 1800 square foot steel Montana Quonset Residence, complete with an 8 foot by 8-foot walk-in vault and water cistern. Separately, there is an enormous metal barn that could be used for a variety of purposes.',
      price: 50
     },
     {
      ownerId: 5,
      address: '1646 Eastport Terrace',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'USA',
      name: 'Unicorn House',
      description: 'Quirky, charming yet almost fairytale-like as every room grabs your eye with one-of-a-kind artwork. Reclaimed and recycled materials from historic buildings of Atlanta’s past were used to create this masterpiece.',
      price: 125
     }
     ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Unicorn House','Montana Quonset','Converted Chapel','Walden Waterfront','Coconut the Boat House','Earth Connected','Overlooking the Mississippi','European Plantation','Church Museum ','Fly-in Farm','Historic Cielo Store Transformed','Cabin','Hilltop Waterview','Creek Side Converted Church','Shiloh Springs'
      ] }
    }, {});
  }
};
