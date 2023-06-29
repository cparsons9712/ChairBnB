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
        //1
      ownerId: 1,
      address: '804 Carolina Avenue',
      city: 'North Augusta',
      state: 'SC',
      country: 'USA',
      lat: 33.49,
      lng: -81.97,
      name: 'Rosemary Hall',
      description: 'Rosemary Hall was built around 1902 and is said to be home to a resident ghost who watches over the inn. The spirit is thought to be Mrs. Jackson, the wife of the original owner of Rosemary Hall, a Mr. James U Jackson \n Mrs. Jackson is most often spotted in Room number 205, although she has also been seen walking up and down the main staircase of the inn. \n Guests have reported a number of strange, unexplained things happening in the property including objects disappearing only to turn up somewhere completely different, hearing phantom footsteps and televisions turning on and off by themselves.',
      price: 75
     },
     {
      //2
    ownerId: 2,
    address: '13 Heath St',
    city: 'Ararat',
    state: 'VIC',
    country: 'Australia',
    lat: 37.28,
    lng: 142.93,
    name: 'Aradale Mental Hospital',
    description: 'Aradale, also known as the Ararat Lunatic Asylum and the Ararat Hospital for the Insane, together with its two sister asylums at Kew and Beechworth, were commissioned to accommodate a growing number of "lunatics" in the colony of Victoria. Construction began in 1865 and was opened for patients in 1867. It was closed as an asylum in 1993. At its height, Aradale provided a secure treatment facility housing over 1000 patients. /n You never know what kind of encounters you might have. Will it be an eerie sound with no obvious source? A blur of motion or signs of movement around you? An unsettling smell indicative of previous occupants? Join us at the Aradale mental asylum and hunt for the patients that still roam these halls.',
    price: 35
   },
   {
    //3
  ownerId: 3,
  address: '397 01 Písek',
  city: 'Zvíkovské',
  state: 'Podhradí ',
  country: 'Czechia',
  lat: 49.43,
  lng: 14.19,
  name: 'Zvíkov Castle',
  description: `A very persistent tale inextricably linked to Zvíkov is that it is inhabited by a supernatural creature from Slavic folklore called a Zvíkovský Rarášek, which is a sort of nasty imp or trickster spirit. The imp has been reported here for hundreds of years, and is most active in two of the castles towers. One of these is the tower called Markomanka, which is notable for its mysterious and cryptic stone markings, or runes, and another is the tower called Hlíza, also called “The Black Tower,” which is enormous structure with thick walls and also happens to be the oldest preserved structure in the castle complex. The imp itself is infamous for carrying out all sorts of paranormal mischief, including pushing, poking, or tripping visitors, causing electronic equipment to malfunction or stop working, moving objects, blowing out flames, creating electromagnetic disturbances, and even appearing as a diminutive, troll-like apparition.`,
  price: 80
 },
 {
  //4
ownerId: 4,
address: '64367 Mühltal',
city: 'Burg',
state: 'Frankenstein',
country: 'Germany',
lat: 49.47,
lng: 8.40,
name: 'Frankenstein Castle',
description: `This castle  was built around 1250 and is the birthplace of Johann Dippel, who was a scientist that performed alchemy. Some of his expirements involved body parts that were stolen from a cemetary. He is rumored to be the inspiration for Mary Shelley's famous fictional Dr.Frankenstien. \n In 2008 the castle was investigated on a popular ghost hunting show. The team found signifigant paranormal activity including a recording of disembodied voice saying "ArBo Is HeRe ...`,
price: 75
},
{
  //5
ownerId: 5,
address: 'JI. Pemuda No.160',
city: 'Semarang',
state: 'Central Java',
country: 'Indonesia',
lat: 6.59,
lng: 110.24,
name: 'Lawang Sewu',
description: `Once the home of the Dutch East Indies railroad company this beautiful building has been host to a number of atrocities. During World War II the Japanese invaded Indonesia and took over Lewang Sewu to turn it into a prison. Here they tortured and executed prisoners, throwing the severed heads into a corner of the basement. These days the halls are walked by the beheaded ghost of a Dutch woman said to have been killed by the Japanese during the war. Locals also believe the location to be home to a Kuntilanak, or a ghost of a woman who died during childbirth. She wears a white dress covered in blood, has glowing red eyes and can turn into a beautiful woman who preys on men. `,
price: 55
},
{
  //6
ownerId: 6,
address: 'R93 RF80',
city: 'Palatine',
state: 'Carlow',
country: 'Ireland',
lat: 52.85,
lng: 6.81,
name: "Duckett's Grove",
description: ` It is said that William Duckett was having an affair with a young, local woman. One day, when riding across the estate together, she fell from her horse and was killed. In her grief, the woman’s mother placed a Piseóg upon the Duckett family and their property. This was a curse intended to bring misfortune and eventual ruin. Since the spell was cast, the wailing of a banshee has sometimes been heard echoing through the ruins of the house and warning those who hear her cries of impending personal tragedy. Her cries have been speculatively linked to at least two deaths in recent times. `,
price: 70
},
{
  //7
ownerId: 7,
address: '30100 Venezia VE',
city: 'Venice',
state: 'Venice',
country: 'Italy',
lat: 45.22,
lng: 12.19,
name: "Poveglia",
description: ` This island has a rich history ranging from a refuge for people fleeing wars and a quarantine for the bubonic plague. Things get spicy when an asylum was built here where doctors experimented on their patients. It is said that one doctor committed suicide after being haunted by ghost of those he murdered. These days the island is only inhabited by those who passed long ago and legend says they sabotage any attempt to revitalize the island.  `,
price: 15
},
{
  //8
ownerId: 8,
address: '14300 Nibong',
city: 'Tebal',
state: 'Penang',
country: 'Malaysia',
lat: 5.9,
lng: 100.28,
name: "99 Door Mansion",
description: ` This mansion was build by a wealthy family on their rubber tree plantation. Later, the entire family was killed in the house and the mansion was left abandoned. It is rumored after it was abondonded a witch practicing dark arts squatted in the house. She opened a portal here to the other side where one could contact the dead. This portal opened at midnight in the form of a new, 100th door. Through this door dark and evil spirits enter our realm.  `,
price: 45
},
{
  //9
ownerId: 9,
address: '4P6V + F9',
city: 'Alpendurada',
state: 'Juncosa',
country: 'Portugal',
lat: 41.11,
lng: -8.25,
name: "Quinta da Juncosa",
description: ` Up in Penafiel in the Porto region, the Quinta da Juncosa is said to be haunted by the Baron of Lages and his family. Suspecting that his wife was unfaithful, the baron tied her to one of his horse’s legs and dragged her to death. After discovering that she was innocent, he went on to kill his children and himself. Not surprisingly, it is said the Baron’s guilt keeps him from resting in peace and locals have reported seeing the ghosts of the baron and his wife several times over the years.`,
price: 10
},
{
  //10
ownerId: 10,
address: '1670 Loop Road',
city: 'St Bathans',
state: 'St Bathans',
country: 'New Zealand',
lat: 44.87,
lng: 169.81,
name: "Vulcan Hotel",
description: ` Said to be New Zealand’s most haunted hotel. In the 1880’s a lady of the night named Rose lived in a room here. One fateful night a client got too rough and Rose lost her life. He dumped her body into the lake and Rose was never seen alive again. To this day Rose still lives in room one and if you’re a man be prepared to have a very fateful encounter. `,
price: 85
},
{
  //11
ownerId: 1,
address: 'Strada General Traian Moșoiu 24',
city: 'Bran',
state: 'Brașov',
country: 'Romania',
lat: 45.30,
lng: 25.22,
name: "Bran Castle",
description: ` More commonly known as Dracula’s castle, this historic castle is often incorrectly correlated with either Dracula or Vlad the Impaler. Neither of which has any real connection to the castle. It is, in reality, known as one of the MOST haunted castles in the world. The forest surrounding the castle is steeped in paranormal activity, often called the Bermuda Triangle of Romania.  `,
price: 40
},
{
  //12
ownerId: 2,
address: '333 E Wonderview Ave',
city: 'Estes Park',
state: 'CO',
country: 'USA',
lat: 40.38,
lng: -105.51,
name: "Stanley Hotel",
description: ` This haunted hotel was the origin of the Shing. Author Steven King was staying the night when he had a nightmare of a firehose coming to life and chasing his screaming son and thus the outline of the shining was born. But that is only the tip of the iceburg of this creepy accommodations. In 1911 an accidental gas explosion killed a maid and she is said to still roam the halls to this day. The builder Stanley and his wife may be seen from time to time. Stanley died in 1940. Another ghost, a child with autism is said to enjoy playing with guest’s hair. Beloved pets laid to rest on the on-site pet cemetery are also known to make an appearance from time to time. If you suddenly smell baked goods, odds are that the ghost of a pasty chef is walking by you. In room 401 woman have been sexually assaulted by ghost and in room 407 theres a lovely spectral that might tuck you in at night. A cowboy in room 428 likes to do late night redecorating by moving furniture. This hotel is sure to make even the most devout skeptics into believers.   `,
price: 95
},
{
  //13
ownerId: 2,
address: '1 Homestead Lane',
city: 'Junee',
state: 'NSW',
country: 'Australia',
lat: 34.86,
lng: 147.57,
name: "Monte Cristo",
description: `In 1910 the wealthy owner of this estate passed away due to blood poisoning. His distraught wife struggled with her grief. In the attic she made a small chapel where she spent most of her time until 1933 when her appendix ruptured, killing her. The house was abandoned for more than a decade until 1963 the Ryans purchased it. The Ryans had many terrible experiences, such as waking up to find all of their chickens strangled, their parrot choked to death, and a litter of kittens brutally killed. Both the Crawleys are said to still walk the halls. In addition to the original owners there are two maids who are said to have been impregnated by Crawly. The first maid committed suicide while pregnant, the second gave birth to a son who was severely disabled in an accident. Due to his disabilities he was chained to his mother’s bed. If you hear chains dragging, chances are you are about to encounter this poor soul. In the coach house a stable boy was feeling ill and laid down. His master found him asleep and thinking to teach the boy a lesson he lit the straw mattress on fire. The boy was too ill to move and ended up burning to death. The Crawlys infant granddaughter died when she was dropped down the stairs by a careless nursemaid. In 1960 a caretaker was shot dead on the front porch. The string of deaths have lead to an intensely haunted location and many spirits trapped.  `,
price: 60
},
{
  //14
ownerId: 2,
address: '16 Pavement',
city: 'York',
state: 'YO1 9UP',
country: 'United Kingdom',
lat: 53.95,
lng: -1.07,
name: "The Golden Fleece",
description: `It is claimed that at least 15 ghost haunt the golden fleece. There is Lady Pickett who will  move furniture around to suit her taste better. A Candadian airman who committed suicide appears on the third floor in his uniform glaring at guest. In the pub you might encounter one eyed jack or the grumpy man. If you approach the grumpy man he will probably cuss you out before disappearing. A Victorian boy said to have been trampled by a horse will sometimes play harmless pranks. You’ll know its him if you hear the soft giggling of a child. Roman soldies have been seen in the cellar, though they never interact with the living. `,
price: 85
},
{
  //15
ownerId: 2,
address: '13241 E23 County Home Rd',
city: 'Monticello',
state: 'IA',
country: 'USA',
lat: 42.13,
lng: -91.13,
name: "Edinburgh Manor",
description: `This location in Iowa was originally a ‘poor farm’ or a place for the poor and destitute to work and have shelter. It was demolished in 1910 and replaced with the current building where it was used to house the insane, disabled, poor, and elderly until 2010 until it was deemed unsuitable for inhabitation. There were plans to turn it into a bed and breakfast but plans were scrapped when it was determined to be too much work. It is now open for overnight paranormal encounters. While most ghostly residents are harmless this is not true for the basement where you might encounter ‘the Joker’. He is often seen in a padded room and people who experience him tend to have trouble breathing and have red marks appear on their necks.  `,
price: 55
},
{
  //16
ownerId: 2,
address: 'Houska 1',
city: 'Houska',
state: 'Doksy',
country: 'Czechia',
lat: 50.49,
lng: 14.62,
name: "Houska Castle",
description: `This castle was constructed in the 13th century over a huge bottomless pit on a cliff that locals believed to be a gateway to hell. A chapel was placed directly over the pit, as if to block the evil entities from escaping. People claim to hear screams and cries coming from the floor of the chapel. In WWII the castle was used by the nazis to perform experiments on living people. Today many see various ghost and demonic entities here.  `,
price: 25
},
{
  //17
ownerId: 2,
address: 'Borgvattnet 760',
city: 'Borgvattnet',
state: 'Stogun',
country: 'Sweden',
lat: 63.42,
lng: 15.82,
name: "Borgvattnet Vicarage",
description: `Said to be Swedens most haunted place. Tales of this place begin in 1927. It started with clothes being torn from the laundry line and escalated from there. Things have moved, screams have been heard, shadow people have been seen, and the old rocking chair keeps on rocking. The legends surrounding the origins of the haunting tell of abused maids and even of babies buried in the backyard although it is now also said that the old vicars themselves haunt the house.`,
price: 65
},
{
  //18
ownerId: 2,
address: '7747 US-61',
city: 'St Francisville',
state: 'LA',
country: 'USA',
lat: 30.80,
lng: -91.38,
name: "Myrtles Plantation",
description: `While this location might look like a dream, the history is nothing short of a nightmare. It begins with a cruel slaveowner cutting off the ear of one of his slaves. In revenge the slave poisoned the family, earning retribution from the other local slaveowners who brutally murdered her. The next family to take residence of the home all died from tuberculosis on the property. The next owner was murdered while teaching Sunday school at the house. It is now a bed and breakfast renown for its strong paranormal activity.`,
price: 85
},

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
