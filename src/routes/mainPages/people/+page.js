const BASE_PHOTO_URL = 'https://source.unsplash.com/80x80/?portrait&sig=';
const FILE_NAMES = ['alice.jpeg', 'ben.jpeg', 'carlos.jpeg', 'diana.jpeg', 'alia.jpeg', 'jin.jpeg', 'hana.jpeg', 'haruto.jpeg', 'mei.jpg',  'amy.jpg', 'amy.jpg', 'amy.jpg', 'kenji.jpeg', 'mika.jpeg'];


const PEOPLE = [
  {
    name: 'Alice Chen',
    age: 28,
    email: 'alice.chen@example.com',
    dietaryRestrictions: ['vegetarian', 'no dairy'],
    parents: ['Ming Chen', 'Linda Chen'],
    siblings: ['Eric Chen'],
    hotel: 'Grand Sunset Resort',
    arrivalDate: '2025-07-15',
    trip: 'Santa Monica',
    flightInfo: {
      airline: 'Delta',
      flightNumber: 'DL456',
      arrivalTime: '14:30',
      departureAirport: 'SFO'
    },
    aboutMe:
      "Can't wait to spend time with the whole fam! Hoping to sneak in a few beach runs and lots of good food (as long as it’s dairy‑free 😅)."
  },
  {
    "name": "Ben Yeung",
    "age": 34,
    "email": "ben.thompson@example.com",
    "dietaryRestrictions": [],
    "parents": ["Robert Yeung", "Julia Yeung"],
    "siblings": [],
    "hotel": "Grand Sunset Resort",
    "arrivalDate": "2025-07-14",
    trip: 'Santa Monica',
    "flightInfo": {
      "airline": "United",
      "flightNumber": "UA123",
      "arrivalTime": "10:15",
      "departureAirport": "LAX"
    },
    "aboutMe": "Excited for some quality cousin time and dad jokes around the fire pit. Somebody bring Uno!"
  },
  {
    "name": "Carlos Yang",
    "age": 22,
    "email": "carlos.rivera@example.com",
    "dietaryRestrictions": ["gluten-free"],
    "parents": ["Antonio Yang", "Marisol Yang"],
    "siblings": ["Sofia Yang", "Luis Yang"],
    "hotel": "Seaside Inn",
    "arrivalDate": "2025-07-16",
    trip: 'Santa Monica',
    "flightInfo": {
      "airline": "American Airlines",
      "flightNumber": "AA789",
      "arrivalTime": "17:45",
      "departureAirport": "ORD"
    },
    "aboutMe": "Just here for the snacks and the chaos. Let’s get a big cousins photo this year!"
  },
  {
    "name": "Diana Wu",
    "age": 45,
    "email": "diana.smith@example.com",
    "dietaryRestrictions": ["vegan", "no peanuts"],
    "parents": ["Margaret Wu"],
    "siblings": [],
    "hotel": "Grand Sunset Resort",
    "arrivalDate": "2025-07-15",
    trip: 'Santa Monica',
    "flightInfo": {
      "airline": "JetBlue",
      "flightNumber": "B678",
      "arrivalTime": "09:00",
      "departureAirport": "BOS"
    },
    "aboutMe": "Looking forward to some beach time, family stories, and maybe sneaking away with a book for a bit of peace ☀️📚."
  },

  {
    'name': 'Alia Chen',
    'age': 15,
    'email': 'alia.chen@example.com',
    'dietaryRestrictions': ['vegetarian', 'no dairy'],
    'parents': ['Ming Chen', 'Linda Chen'],
    "siblings": ['Eric Chen'],
    "hotel": 'Grand Sunset Resort',
    "arrivalDate": '2025-07-15',
    trip: 'Tokyo',
    "flightInfo": {
      "airline": 'Delta',
      "flightNumber": 'DL456',
      "arrivalTime": '14:30',
      "departureAirport": 'SFO'
    },
    "aboutMe":
      "Can't wait to spend time with the whole fam! Hoping to sneak in a few beach runs and lots of good food (as long as it’s dairy-free 😅)."
  } ,
  {
    "name": 'Jin Tanaka',
    "age": 12,
    "email": 'jin.tanaka@example.com',
    "dietaryRestrictions": ['no shellfish'],
    "parents": ['Haruto Tanaka', 'Mei Tanaka'],
    "siblings": ['Hana Tanaka (8)'],
    "hotel": 'Sakura Gardens Hotel',
    "arrivalDate": '2025-07-16',
    trip: 'Vancouver',
    "flightInfo": {
      "airline": 'ANA',
      "flightNumber": 'NH107',
      "arrivalTime": '16:45',
      "departureAirport": 'LAX'
    },
    "aboutMe": "Excited to visit Tokyo Disneyland with my little siblings! I love anime and want to try all the ramen. My little brother Ren is allergic to shellfish, so we have to be careful where we eat. Can't wait to see the cherry blossoms with my family! 🌸"
  },
  {
    "name": 'Hana Tanaka',
    "age": 8,
    "email": 'hana.tanaka@example.com',
    "dietaryRestrictions": ['no nuts'],
    "parents": ['Haruto Tanaka', 'Mei Tanaka'],
    "siblings": ['Jin Tanaka (12)'],
    "hotel": 'Sakura Gardens Hotel',
    "arrivalDate": '2025-07-16',
    trip: 'Vancouver',
    "flightInfo": {
      "airline": 'ANA',
      "flightNumber": 'NH107',
      "arrivalTime": '16:45',
      "departureAirport": 'LAX'
    },
    "aboutMe": "I love Hello Kitty and want to visit Sanrio Puroland! My big brother Jin promised to help me collect all the character stamps. I'm bringing my teddy bear on the plane. Mommy says I have to hold her hand in crowded places."
  },
  {
    "name": 'Haruto Tanaka',
    "age": 42,
    "email": 'haruto.tanaka@example.com',
    "dietaryRestrictions": [],
    "parents": ['Yuji Tanaka', 'Aiko Tanaka'],
    "siblings": ['Kenji Tanaka (39)'],
    "hotel": 'Sakura Gardens Hotel',
    "arrivalDate": '2025-07-16',
    trip: 'Vancouver',
    "flightInfo": {
      "airline": 'ANA',
      "flightNumber": 'NH107', 
      "arrivalTime": '16:45',
      "departureAirport": 'LAX'
    },
    "aboutMe": "Business analyst visiting family in Tokyo. Want to show my kids the old neighborhood in Shibuya and eat at my favorite childhood ramen shop. Will need to find nut-free restaurants for Hana and shellfish-free places for Ren. My wife insists we take a million family photos!"
  },
  {
    "name": 'Mei Tanaka',
    "age": 40,
    "email": 'mei.tanaka@example.com',
    "dietaryRestrictions": ['vegetarian'],
    "parents": ['Takeshi Li', 'Ying Li'],
    "siblings": ['Lily Li (37)'],
    "hotel": 'Sakura Gardens Hotel',
    "arrivalDate": '2025-07-16',
    trip: 'Vancouver', 
    "flightInfo": {
      "airline": 'ANA',
      "flightNumber": 'NH107',
      "arrivalTime": '16:45',
      "departureAirport": 'LAX'
    },
    "aboutMe": "Former Tokyo resident excited to introduce the kids to real Japanese culture beyond anime! Have already mapped out vegetarian-friendly restaurants. Packed extra snacks for the flight since Jin eats every 2 hours. Husband insists we visit every Pokémon Center in Tokyo..."
  },
{
  name: 'Amy',
  age: 32,
  email: 'amy.traveler@example.com',
  dietaryRestrictions: ['Vegetarian, No dairy'],
  parents: ['Susan', 'Robert'],
  siblings: ['Michael', 'Jessica'],
  hotel: 'Grand Horizon Resort - Room 421',
  arrivalDate: '2025-05-08',
  trip: 'Tokyo',
  "flightInfo": {
    "airline": 'Delta',
    "flightNumber": 'DL247',
    "arrivalTime": '14:30',
    "departureAirport": 'LAX'
  },
  aboutMe: 'Excited for this trip! Love hiking, photography, and trying new foods. Allergic to peanuts.',
},

{
  name: 'Amy',
  age: 32,
  email: 'amy.traveler@example.com',
  dietaryRestrictions: ['Vegetarian, No dairy'],
  parents: ['Susan', 'Robert'],
  siblings: ['Michael', 'Jessica'],
  hotel: 'Grand Horizon Resort - Room 421',
  arrivalDate: '2025-05-08',
  trip: 'Santa Monica',
  "flightInfo": {
    "airline": 'Delta',
    "flightNumber": 'DL247',
    "arrivalTime": '14:30',
    "departureAirport": 'LAX'
  },
  aboutMe: 'Excited for this trip! Love hiking, photography, and trying new foods. Allergic to peanuts.',
},
{
  name: 'Amy',
  age: 32,
  email: 'amy.traveler@example.com',
  dietaryRestrictions: ['Vegetarian, No dairy'],
  parents: ['Susan', 'Robert'],
  siblings: ['Michael', 'Jessica'],
  hotel: 'Grand Horizon Resort - Room 421',
  arrivalDate: '2025-05-08',
  trip: 'Vancouver',
  "flightInfo": {
    "airline": 'Delta',
    "flightNumber": 'DL247',
    "arrivalTime": '14:30',
    "departureAirport": 'LAX'
  },
  aboutMe: 'Excited for this trip! Love hiking, photography, and trying new foods. Allergic to peanuts.',
},
  {
    name: 'Kenji Nakamura',
    age: 25,
    email: 'kenji.nakamura@example.com',
    dietaryRestrictions: [],
    parents: ['Hiroshi Nakamura', 'Yumi Nakamura'],
    siblings: ['Mika Nakamura'],
    hotel: 'Tokyo Grand Hotel',
    arrivalDate: '2025-08-10',
    trip: 'Tokyo',
    flightInfo: {
      airline: 'Japan Airlines',
      flightNumber: 'JL61',
      arrivalTime: '15:20',
      departureAirport: 'SFO'
    },
    aboutMe: "Tech enthusiast and amateur photographer. Can't wait to capture Tokyo's neon lights and show my cousins the best ramen spots. I speak conversational Japanese!"
  },
  {
    name: 'Mika Nakamura',
    age: 23,
    email: 'mika.nakamura@example.com',
    dietaryRestrictions: ['vegetarian'],
    parents: ['Hiroshi Nakamura', 'Yumi Nakamura'],
    siblings: ['Kenji Nakamura'],
    hotel: 'Tokyo Grand Hotel',
    arrivalDate: '2025-08-10',
    trip: 'Tokyo',
    flightInfo: {
      airline: 'Japan Airlines',
      flightNumber: 'JL61',
      arrivalTime: '15:20',
      departureAirport: 'SFO'
    },
    aboutMe: "Fashion blogger and foodie. Planning to document our entire trip for my followers! Vegetarian but excited to try authentic Japanese Buddhist cuisine."
  },
].map((person, idx) => ({
  ...person,
  photo: `/images/${FILE_NAMES[idx]}`
}));;

/** @type {import('./$types').PageLoad} */


export async function load() {
  return {
    allPeople: PEOPLE
  };
}