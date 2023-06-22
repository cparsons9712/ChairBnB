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
      description: 'Welcome to Shiloh Springs, your very own whimsical haven nestled within the heart of 55 acres of picturesque mountain land. This enchanting country home, tucked away in the breathtaking landscapes of British Columbia, Canada, invites you to experience the epitome of cozy luxury, with a special focus on our exceptional seating and chairs.Step into our meticulously designed retreat and immerse yourself in the tranquility of a private forest, where each tree whispers secrets of ancient tales, and every pathway leads you to a comfortable seating nook. Our plush, inviting chairs await, ready to cradle you in their embrace as you unwind and soak in the awe-inspiring vistas that surround you.Picture yourself sinking into the soft cushions of our fireside seating area, nestled by the crackling fireplace. The gentle warmth kisses your cheeks as you indulge in a cup of steaming cocoa, perfectly balanced on the armrest of our meticulously crafted armchair. From this cozy vantage point, you can marvel at the breathtaking valley view that stretches before you, while feeling the gentle sway of nature\'s rhythm through the rocking chair that awaits your leisure.Beyond the walls of your enchanting abode, our extensive natural playground beckons. Meander through the tranquil forest paths, where charming seating nooks and benches invite you to pause and reflect, enveloped in the melodies of chirping birds and rustling leaves. Take a seat in our whimsical garden, where a swing suspended from a majestic tree entices you to soar amidst the splendor of nature\'s artwork.Whether you seek a peaceful moment of solitude, desire a cozy gathering space to share stories with loved ones, or yearn to lose yourself in a good book in the comfort of our carefully chosen chairs, Shiloh Springs offers an invitation to experience the perfect blend of country charm and whimsical magic, with a special emphasis on providing you with exceptional seating options. Come, indulge your senses, and let the enchantment of this extraordinary getaway unfold before you, one chair at a time.',
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
      description: 'Since 1877, this pretty church in Wantage, NJ has stood as a timeless testament to vintage granny-style seatings, exuding nostalgic charm at every turn. Nestled on a choice corner parcel, the church holds a cherished place in the hearts of the community, while offering a truly unique experience for those seeking a step back in time. As you approach the church, you\'ll be captivated by the sight of a meticulously maintained 1.06-acre property, adorned with blooming flowers and a babbling brook that gracefully meanders through its grounds. Step onto the walking bridge that spans two yards, transporting you to a serene oasis, perfect for indulging in picnics, quiet meditation, or tending to your very own garden of cherished memories.Within the fenced portion of the yard, a collection of vintage granny-style seatings beckons you to take a seat and immerse yourself in the gentle embrace of nostalgia. Imagine settling into a cozy rocking chair, gently swaying to the rhythm of the flowing brook, as you relish in the peaceful ambiance that surrounds you. The well-worn cushions of our heirloom armchairs provide a sense of comfort that only time can bestow, while invoking a longing for days gone by.While the church itself holds historical significance, it is the vintage granny-style seatings that truly steal the show. Delicate lace doilies grace the armrests of our intricately carved wooden chairs, transporting you to an era where afternoon tea and heartfelt conversations were the order of the day. Close your eyes, and you can almost hear the echoes of laughter and whispered secrets that have graced these cherished seats for generations.Whether you seek solace in the embrace of a cherished memory, desire to create new moments of connection, or simply wish to immerse yourself in the enchanting allure of vintage granny-style seatings, this historic church invites you to step back in time and experience a truly unique journey. Embrace the beauty of yesteryear and let the whispers of nostalgia guide you through an unforgettable escape that transcends time itself.',
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
      description: 'Sitting majestically on 24+ acres atop a hill, this extraordinary home, nestled securely behind not one, but two security gates, offers a private and serene sanctuary like no other. Inspired by the iconic designs of Frank Lloyd Wright, every element of this architectural masterpiece has been meticulously crafted to embrace and showcase the breathtaking views that surround it.As you step into this unique home, you\'ll immediately be captivated by the seamless integration with nature, where floor-to-ceiling windows and open spaces invite the outside in, and every room takes full advantage of the awe-inspiring vistas that unfold before you. The grandeur of the almost 7500 square feet of air-conditioned space, harmoniously blended with over 12,000 square feet under roof, ensures that every corner of this residence is a testament to both design and comfort.Perched 250 feet above the rolling landscapes, this hilltop abode offers an unparalleled perspective, overlooking the vast expanse of Joe Pool Lake\'s sprawling 7740 acres. Imagine reclining in one of the thoughtfully placed seating areas, strategically positioned to capture the panoramic beauty that stretches as far as the eye can see. Whether basking in the warmth of the sun on a chaise lounge by the pool or savoring a quiet moment on a vintage-inspired rocking chair on the expansive veranda, the vistas that unfold before you are a constant reminder of the harmony between architecture and nature.In this secluded retreat, privacy and security are paramount. Behind the two security gates, you can embrace a sense of tranquility and seclusion, knowing that you have found your very own sanctuary, shielded from the world beyond. Whether you seek solace in the quietude of your luxurious living spaces or venture outdoors to explore the vastness of your expansive estate, the unique design and pristine surroundings will continually inspire and captivate your senses.This home is not just a dwelling; it is a testament to the art of living, where the timeless beauty of Frank Lloyd Wright\'s influence merges seamlessly with the grandeur of nature. Come, immerse yourself in the splendor of this hilltop retreat and experience a lifestyle where every seat offers a front-row view to the wonders that unfold around you.',
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
      description: 'Welcome to 55 Eagle View Drive, a whimsical cabin nestled in the charming town of Pine Hill, New Mexico, USA. This cozy retreat transports you to a world where the sky meets the earth, and the views are nothing short of enchanting. Step onto the nice deck that extends from the cabin, offering you a front-row seat to nature\'s grand spectacle. As you sip your morning coffee or indulge in a soothing evening tea, the panoramic vistas unfold before you, stretching as far as the eye can see. Feel the gentle breeze caress your cheeks and let your imagination soar amidst the vast expanse of the sky. Just outside the sliding glass doors of the living room, a magical space awaits. Here, you can fire up the BBQ and embark on a culinary adventure amidst nature\'s embrace. Imagine the sizzling sounds, the tantalizing aromas, and the laughter shared with loved ones as you create delicious memories under the open sky. This cabin is more than just a place to stay—it\'s your very own peaceful paradise. Let the cozy interior wrap you in warmth and tranquility, inviting you to unwind and embrace the whimsical charm that permeates every corner. Snuggle up on the comfortable furnishings, surrounded by soft textures and inviting colors, as you bask in the soothing ambiance that fills the air.Whether you seek a moment of solitude in the serenity of the surroundings or wish to embark on exciting adventures in the heart of nature, this cabin offers the perfect blend of comfort and enchantment. Come, make this your haven, where the sky is your constant companion and the peacefulness of the landscape transports you to a world of whimsy.',
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
      description: 'Welcome to the Historic Cielo Store Transformed, a whimsical haven located a mere 10 minutes from the vibrant city of Santa Barbara, California. This remarkable property not only offers a verdant oasis but also showcases a delightful array of seating options that exude whimsy and cozy vibes, creating endless possibilities for unforgettable experiences.Immerse yourself in the lush surroundings, where organic farming thrives and the scent of blooming flowers fills the air. As you explore the property, you\'ll discover charming seating nooks scattered throughout, each inviting you to pause, relax, and embrace the enchantment of this extraordinary place. Picture yourself sinking into a cushioned wicker chair, nestled under a blooming canopy of vines, as the gentle breeze whispers through the leaves, carrying with it the tantalizing aromas of the surrounding organic gardens.For the gourmet chefs, foodies, and wine enthusiasts, this oasis offers a dreamlike setting to indulge in your passions. Find yourself seated at a rustic wooden table, adorned with whimsical tableware and surrounded by cozy benches draped in soft, inviting fabrics. Here, you can gather with fellow epicureans, savoring delectable culinary creations prepared by skilled hands, while engaging in lively conversations and relishing in the art of gastronomy. For those seeking a retreat for the mind, body, and soul, the Historic Cielo Store Transformed provides a serene ambiance where peace and relaxation are at the forefront. Discover cozy seating areas tucked away amidst the verdant landscape, perfect for meditation, contemplation, or simply basking in the tranquility of nature. Imagine sitting on a charming vintage swing, gently swaying back and forth as you lose yourself in the serenity of your surroundings, feeling your cares melt away. This remarkable property is not just a destination; it\'s a magical tapestry of whimsy and comfort. It offers a sanctuary for those seeking respite from the world, a place where seating options are thoughtfully designed to immerse you in a cozy embrace. Whether you\'re a wine connoisseur, a culinary enthusiast, or simply someone in search of a place to unwind and reconnect, the Historic Cielo Store Transformed invites you to experience the wonders of this idyllic setting, where whimsy and cozy vibes abound at every turn.',
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
      description: 'Welcome to the whimsical world of Fly-in Farm, a hidden gem nestled in the heart of Florida. While the house may boast a standard suburban design, it is the enchanting touches and cozy seating spots that set this place apart from the ordinary. Step into a realm where imagination takes flight and everyday life becomes a magical adventure. As you approach Fly-in Farm, prepare to embark on a unique experience unlike any other. Imagine the thrill of flying your plane right to the front door, landing with grace and excitement. The property offers a private hangar, where you can safely park your aircraft, ensuring that your journeys seamlessly blend with the comfort of home. Inside the house, discover delightful seating nooks that invite you to unwind and immerse yourself in the whimsy that surrounds you. Picture yourself sinking into a cozy armchair, strategically placed near a large window that offers breathtaking views of the expansive skies above. From this vantage point, you can watch as planes gracefully take off and land, inspiring dreams of future adventures and fostering a sense of wonder. The backyard of Fly-in Farm holds its own surprises. Explore the well-tended gardens and discover hidden seating areas scattered throughout. Picture yourself sitting beneath the shade of a majestic tree, on a charming bench adorned with colorful cushions and whimsical decorations. Here, you can let your imagination soar, finding solace and inspiration in the beauty of nature. Beyond the traditional suburban façade, Fly-in Farm is a place where the ordinary becomes extraordinary. It invites you to embrace the joy of flight, the wonders of exploration, and the comfort of cozy seating areas that invite you to sit back, relax, and dream. Come, immerse yourself in this whimsical escape and let your imagination take flight at Fly-in Farm. ',
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
      description: 'Welcome to the Church Museum, a truly enchanting destination that offers a once-in-a-lifetime opportunity to step into history. Nestled within the grounds of the historic site "Tanners Ridge Mission (1921-1966)," this extraordinary place combines the charm of a bygone era with whimsical elements that will capture your imagination. As you arrive at the Church Museum, you\'ll immediately feel the weight of history in the air. The grounds, spanning over 2.75 acres, have been transformed into a vibrant Sculpture Garden, reminiscent of a fantastical museum brought to life. Set foot on this artistic haven and embark on a captivating journey as you meander among the breathtaking sculptures that adorn the landscape. Each step unveils a new surprise, as vibrant and expressive sculptures capture your attention and ignite your sense of wonder. Picture yourself strolling along meandering pathways, surrounded by a kaleidoscope of colors and shapes that come to life in this whimsical outdoor gallery. Take a seat on one of the carefully placed benches, whimsically designed to blend seamlessly with the artistry that surrounds them. Allow yourself to be transported to a realm where creativity knows no bounds and where the ordinary becomes extraordinary. Beyond the artistic allure, the Church Museum itself stands as a testament to the rich history that unfolded within its walls. As you explore the interior, take a moment to pause and reflect in the cozy seating areas that invite you to immerse yourself in the stories that echo through time. Picture yourself sitting in a vintage church pew, adorned with plush cushions, as you soak in the atmosphere of this hallowed space. Feel the warmth and comfort envelop you, allowing the weight of the past to guide your thoughts and spark your creativity. The Church Museum is more than just a place to visit; it\'s an immersive experience that takes you on a journey through art, history, and whimsy. It invites you to become a part of its tapestry, as you uncover the secrets of the past and allow your imagination to soar amidst the vibrant sculptures that bring the landscape to life. Come, lose yourself in this extraordinary destination, where art and history intertwine, and where every moment is infused with a touch of magic..',
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
      description: 'Welcome to the European Plantation, a magnificent work of art nestled in the charming city of Beeville, Texas, USA. This extraordinary 6211 square foot home exudes the timeless elegance of European Plantation Style, immersing you in a world where every detail is crafted with precision and whimsical charm. As you step inside this architectural masterpiece, be prepared to be captivated by the intricate plasterwork that adorns the walls, showcasing the craftsmanship of a bygone era. The milled flooring beneath your feet invites you to explore the sun-filled rooms, where rays of light dance playfully through the windows, casting a warm and inviting glow. The European Plantation embraces the concept of whimsical seating, creating spaces that beckon you to relax and embrace the serene ambiance of your surroundings. Imagine yourself sinking into a plush armchair, nestled by a cozy fireplace, where you can curl up with a captivating book or engage in delightful conversations with loved ones. Every seating area is thoughtfully designed to create an atmosphere of comfort and charm, allowing you to unwind and indulge in moments of pure relaxation. The elegance of the European Plantation extends beyond its architectural beauty. Delicate lighting fixtures grace the rooms, casting a soft, ethereal glow that enhances the ambiance and adds a touch of enchantment to every space. Imagine the warm golden hues illuminating the intricacies of the plasterwork, creating a mesmerizing interplay of light and shadow that adds depth and character to the home. This European-inspired haven invites you to experience the beauty and grace of a bygone era, where attention to detail and whimsical charm merge effortlessly. From the elaborate plasterwork to the milled flooring, every element has been carefully curated to transport you to a world of timeless elegance and enchantment. Welcome to the European Plantation, where artistry meets comfort, and whimsy intertwines with grandeur. Step into a realm where the past and present coexist, inviting you to indulge in the beauty that surrounds you and create cherished memories in an oasis of European-inspired splendor.',
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
      description: 'Welcome to "Overlooking the Mississippi," a captivating retreat designed to embrace the ever-present beauty of the majestic Mississippi River. This open-concept contemporary home is not only a feast for the eyes but also a whimsical haven that sets the stage for unforgettable moments of entertainment and relaxation. As you step into this remarkable dwelling, prepare to be mesmerized by the panoramic views that greet you from every corner. The thoughtful design of the home ensures that the stunning vistas of the Mississippi River take center stage, captivating your senses and creating a serene ambiance throughout. Whether you find yourself in the spacious living area, the inviting dining space, or the gourmet kitchen, the ever-changing views of the river become an integral part of the experience, enchanting you with their timeless allure. In this whimsical abode, entertaining becomes an art form. Imagine gathering with loved ones in the open-concept living area, where plush seating arrangements invite you to sink into their cozy embrace. Delight in lively conversations, laughter, and shared moments as you bask in the beauty of the surroundings. The spacious layout and seamless flow between indoor and outdoor spaces create the perfect backdrop for hosting gatherings and creating memories that will last a lifetime. From the carefully chosen furnishings to the whimsical décor accents, every element of the home has been thoughtfully curated to enhance the sense of wonder and comfort. Picture yourself reclining on a plush sofa, gazing out through expansive floor-to-ceiling windows, as you lose yourself in the mesmerizing dance of sunlight on the water. The contemporary design elements seamlessly blend with touches of whimsy, creating an ambiance that is both modern and inviting."Overlooking the Mississippi" is more than just a home; it\'s a sanctuary that celebrates the beauty of nature and the joy of entertaining. It invites you to immerse yourself in its contemporary charm, where every detail is designed to enhance your connection with the river and create an atmosphere of comfort and whimsy. Come, embrace the ever-present views, let the enchantment of the Mississippi River captivate your soul, and create unforgettable moments in this haven of contemporary elegance.',
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
      description: 'Welcome to "Earth Connected," a remarkable retreat that harmoniously blends with its natural surroundings. Nestled into the side of the mountain on Linksfield Ridge in Johannesburg, South Africa, this exceptional house not only showcases exquisite engineering but also embodies a deep commitment to environmental sustainability. Step into this architectural marvel, where every element has been meticulously designed to honor the connection between the home and the earth. The house seamlessly integrates into the landscape, allowing you to immerse yourself in the beauty of the surrounding mountains and lush greenery. Picture yourself standing on the terrace, marveling at the breathtaking views that stretch out before you, as you feel an indescribable sense of oneness with nature. "Earth Connected" is a testament to the power of sustainable living. From the carefully selected materials to the innovative design features, this house exemplifies a commitment to preserving and protecting the environment. Within its walls, you will find a sanctuary of comfort and tranquility, thoughtfully crafted to provide an inviting space for relaxation and reflection. Take a moment to envision yourself lounging in one of the cozy seating areas, strategically placed to capture the best views of the surrounding landscape. Whether you choose a plush armchair bathed in natural light or a cushioned nook tucked against a panoramic window, each seating spot invites you to unwind and embrace the serenity of your surroundings. Here, you can reconnect with nature, allowing the gentle breeze and the soothing sounds of the earth to lull you into a state of blissful contentment. As you explore "Earth Connected," you will discover that sustainable living and whimsical charm go hand in hand. Delight in the unique architectural features that seamlessly blend with nature, creating a sense of wonder at every turn. From living roofs adorned with native plant life to playful touches of whimsy in the interior decor, this house invites you to embrace a lifestyle that nurtures both the earth and the soul. Welcome to "Earth Connected," a sanctuary that invites you to reconnect with nature, embrace sustainable living, and find solace in the beauty of the earth. Step into a world where engineering meets enchantment, and where every moment is a reminder of our profound connection to the planet we call home.',
      price: 375
     },
     {
      ownerId: 1,
      address: 'Ensenada Cruiseport Village Marina',
      city: 'Ensenada',
      state: 'B.C.',
      country: 'Mexico',
      name: 'Coconut the Boat House',
      description: 'Welcome to "Coconut the Boat House," a whimsical haven that embodies simplicity, ease, and uncomplicated living. Just like a coconut bobbing in the ocean, life aboard this enchanting dwelling is a delightful escape from the complexities of everyday life. Embrace the serenity of floating on the water, bask in the sun\'s warm embrace on the deck, and let the gentle waves lull you into a state of utter relaxation. With cleverly designed features and whimsical decorations, Coconut surprises and delights at every turn. Step aboard this magical retreat, where the ordinary becomes extraordinary, and embrace a carefree lifestyle that sparks joy and ignites the imagination. Welcome to "Coconut the Boat House," where simplicity and enchantment intertwine. Experience the magic of life on the water, where every moment is a treasure waiting to be discovered. From the serene sway of the boat to the cozy seating area offering panoramic views, Coconut invites you to unwind and embrace a carefree existence. With its whimsical touches and hidden surprises, this floating haven promises a delightful escape from the complexities of life. Step aboard and embark on an extraordinary journey, where the bells and whistles of whimsy are beyond your wildest imagination.',
      price: 125
     },
     {
      ownerId: 2,
      address: '12974 Wood Harbour Drive',
      city: 'Montgomery',
      state: 'Texas',
      country: 'USA',
      name: 'Walden Waterfront',
      description: 'Welcome to "Walden Waterfront," a captivating retreat nestled between the lush greenery of hole #8 on the Championship Walden Golf Course and the expansive waters of Lake Conroe. This idyllic location offers a harmonious blend of serene landscapes and breathtaking views, inviting you to immerse yourself in a world of tranquility and natural beauty. Whether you\'re an avid golfer seeking the perfect swing or a nature enthusiast yearning for waterfront adventures, "Walden Waterfront" is a haven that caters to your every desire.',
      price: 1200
     },
     {
      ownerId: 3,
      address: '1790 River Rd',
      city: 'Solon',
      state: 'Maine',
      country: 'USA',
      name: 'Converted Chapel',
      description: 'Welcome to the pristine chapel tucked away within the shadowed depths of the wooded property in Solon, Maine. A place where time stands still and secrets whisper in the breeze. As you step through its ancient doors, a shiver dances down your spine, a subtle reminder that you are not alone. Gaze upon the meticulously carved pews, each one seemingly imbued with an eerie presence, inviting you to take a seat and embrace the mystery that surrounds you. The ethereal light filtering through stained glass windows casts hauntingly beautiful patterns upon the weathered floor, as if delicate specters are watching your every move. Within the hallowed halls of this chapel, echoes of the past linger, hinting at stories yet untold. The air is pregnant with an otherworldly energy, leaving you with a sense of being both captivated and observed. As you find your place among the silent congregation, the creaking of wood and the soft rustling of unseen whispers envelop you, conjuring a feeling of being in the presence of something beyond the realm of the living. Amidst the chilling ambiance, there is an undeniable allure that draws you deeper into this enigmatic space. The seats beckon, their plush cushions inviting you to sink into their embrace, while a sense of being watched from unseen corners adds an exhilarating touch of intrigue. Whether you are seeking solace or embracing the thrill of the unknown, this chapel offers an experience that transcends the ordinary. Welcome to the pristine chapel, where the line between the living and the spectral blurs, and where every seat holds a tale yet to be revealed. Be cautious as you take your place, for the eyes of the unseen may be upon you, watching as you unravel the mysteries woven within the walls of this hauntingly enchanting sanctuary.',
      price: 75
     },
     {
      ownerId: 4,
      address: 'Nhn 5900 Road South',
      city: 'Conrad',
      state: 'Montana',
      country: 'USA',
      name: 'Montana Quonset',
      description: 'Welcome to the unique custom-built three-level, 1800 square foot steel Montana Quonset Residence, a haven where comfort and preparedness intertwine. Step into a world of carefully crafted seating options, each thoughtfully placed to offer respite as you await the uncertain future that looms ahead. Amidst the compact confines of this dwelling, discover cozy nooks and inviting chairs, providing a sense of familiarity and solace in the face of potential disaster. As you descend into the depths of this subterranean abode, you\'ll find an 8-foot by 8-foot walk-in vault, a fortress designed to safeguard not only your possessions but also your peace of mind. Adjacent to this secure enclave, a series of comfortable seating areas beckon, inviting you to relax and gather your thoughts. Sink into plush cushions, enveloped in a sense of security, as you ponder the mysteries of what may lie beyond these steel walls. Venturing outside, an enormous metal barn stands tall, its vast interior offering endless possibilities. Amidst the practicality of its purpose, find moments of respite amidst rows of chairs, ready to accommodate weary souls seeking solace in the face of uncertainty. Picture yourself sitting beneath the sheltering roof, contemplating the resilience of the human spirit while finding comfort in the presence of loved ones. While the doomsday bunker aesthetic lingers, there is a unique charm within these confined walls. Embrace the art of anticipation, surrounded by seating options that invite conversation, contemplation, and a sense of togetherness. As you wait for the unknown to unfold, find solace in the warmth of the chairs that cradle you, providing a sanctuary amidst the chaos that may or may not come..',
      price: 50
     },
     {
      ownerId: 5,
      address: '1646 Eastport Terrace',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'USA',
      name: 'Unicorn House',
      description: 'Welcome to a realm where enchantment awaits, deep in the embrace of nature. Step into a world that captures your imagination, where each room tells a story through one-of-a-kind artwork, reminiscent of fairytales come to life. This charming masterpiece is crafted from reclaimed and recycled materials, once part of historic buildings that shaped Atlanta\'s past, now transformed into a magical haven. As you enter this whimsical abode, a sense of wonder surrounds you, drawing you into a realm where the ordinary gives way to the extraordinary. Quirky and captivating, each room becomes a canvas, adorned with artwork that sparks the imagination and stirs the soul. It\'s a place where the walls themselves seem to whisper secrets of the past, while the furnishings exude character and charm. Traverse the enchanting halls, where the spirit of Atlanta\'s history is reborn in every corner. Reclaimed wood, weathered by time, now adorns the walls, offering a glimpse into the city\'s vibrant heritage. Immerse yourself in the present moment, as you find solace amidst the one-of-a-kind treasures that grace this extraordinary dwelling. Embrace the serenity of the deep woods that envelop this magical retreat, where you can unwind in cozy nooks adorned with cushions and throws, inviting you to relax and let your imagination roam free. Every room offers a unique sanctuary, where inspiration finds its home and creativity knows no bounds. Welcome to a place where art, history, and nature converge, inviting you to embark on a journey of enchantment. Discover the allure of this fairytale-like haven, where every detail whispers of a realm where dreams are woven into reality. Allow yourself to be captivated by the magic that unfolds within these walls, as you create your own story amidst the charm of this extraordinary retreat.',
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
