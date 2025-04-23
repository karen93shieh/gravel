const BASE_PHOTO_URL = 'https://source.unsplash.com/80x80/?portrait&sig=';
const FILE_NAMES = ['alice.avif', 'ben.avif', 'carlos.avif', 'diana.avif'];


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
    "name": "Ben Thompson",
    "age": 34,
    "email": "ben.thompson@example.com",
    "dietaryRestrictions": [],
    "parents": ["Robert Thompson", "Julia Thompson"],
    "siblings": [],
    "hotel": "Grand Sunset Resort",
    "arrivalDate": "2025-07-14",
    "flightInfo": {
      "airline": "United",
      "flightNumber": "UA123",
      "arrivalTime": "10:15",
      "departureAirport": "LAX"
    },
    "aboutMe": "Excited for some quality cousin time and dad jokes around the fire pit. Somebody bring Uno!"
  },
  {
    "name": "Carlos Rivera",
    "age": 22,
    "email": "carlos.rivera@example.com",
    "dietaryRestrictions": ["gluten-free"],
    "parents": ["Antonio Rivera", "Marisol Rivera"],
    "siblings": ["Sofia Rivera", "Luis Rivera"],
    "hotel": "Seaside Inn",
    "arrivalDate": "2025-07-16",
    "flightInfo": {
      "airline": "American Airlines",
      "flightNumber": "AA789",
      "arrivalTime": "17:45",
      "departureAirport": "ORD"
    },
    "aboutMe": "Just here for the snacks and the chaos. Let’s get a big cousins photo this year!"
  },
  {
    "name": "Diana Smith",
    "age": 45,
    "email": "diana.smith@example.com",
    "dietaryRestrictions": ["vegan", "no peanuts"],
    "parents": ["Margaret Lane"],
    "siblings": [],
    "hotel": "Grand Sunset Resort",
    "arrivalDate": "2025-07-15",
    "flightInfo": {
      "airline": "JetBlue",
      "flightNumber": "B678",
      "arrivalTime": "09:00",
      "departureAirport": "BOS"
    },
    "aboutMe": "Looking forward to some beach time, family stories, and maybe sneaking away with a book for a bit of peace ☀️📚."
  }
].map((person, idx) => ({
  ...person,
  photo: `static/images/${FILE_NAMES[idx]}`
}));;

// /images/${FILE_NAMES[idx]}`     // ← add a unique random image

/** @type {import('./$types').PageLoad} */


export async function load() {
  return {
    people: PEOPLE
  };
}
