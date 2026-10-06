import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

export const OLYMPICS_2026_DATA: OlympicPageData = {
  title: "Bape Olympics 2026",
  date: "2026",
  startDate: "November 20th – 23rd 2026",
  location: "Mundaring",
  imageOfTheDay: "https://i.postimg.cc/DySHpqn9/IMG-3906.jpg",
  // Add image links for the Images page here.
  images: [
    // {
    //   src: "https://example.com/olympics-photo.jpg",
    //   caption: "Photo caption",
    //   orientation: "landscape",
    // },
  ],
  highlights: [
    // {
    //   title: "Highlight title",
    //   description: "What happened.",
    //   imageSrc: "https://example.com/highlight-image.jpg",
    // },
  ],
  description: "",

  host: "Mundaring",
  captains: {
    "South Africa": "Noah Edge",
    Mongolia: "Lucas Cinquina",
    TBD: "Jayden Chang",
    Scotland: "Elvin Lamprecht",
  },

  medalTable: [
    {
      name: "Mongolia",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "Scotland",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "South Africa",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "TBD",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
  ],

  events: [
    {
      id: "cooking",
      name: "Cooking",
      emoji: "🧑‍🍳",
      status: "upcoming",
      chosenDishes: { Mongolia: null, Scotland: null, "South Africa": null, TBD: null },
    },
    {
      id: "trivia",
      name: "Trivia",
      emoji: "🤔",
      status: "upcoming",
      masterminds: { Mongolia: null, Scotland: null, "South Africa": null, TBD: null },
      points: { Mongolia: null, Scotland: null, "South Africa": null, TBD: null },
    },
    {
      id: "futsal",
      name: "Futsal",
      emoji: "⚽️",
      status: "upcoming",
      scheduledDate: "21 November 2026",
      openingMatches: [
        ["TBD", "Scotland"],
        ["Mongolia", "South Africa"],
      ],
    },
    {
      id: "basketball",
      name: "Basketball",
      emoji: "🏀",
      status: "upcoming",
      scheduledDate: "21 November 2026",
      openingMatches: [
        ["Scotland", "Mongolia"],
        ["South Africa", "TBD"],
      ],
    },
    {
      id: "beer-pong",
      name: "Beer Pong",
      emoji: "🏓",
      status: "upcoming",
      openingMatches: [
        ["Scotland", "Mongolia"],
        ["South Africa", "TBD"],
      ],
    },
    {
      id: "pickleball",
      name: "Pickleball",
      emoji: "🥒",
      status: "upcoming",
      scheduledDate: "21 November 2026",
      scheduledTime: "Earlier in the day · time to be confirmed",
      openingMatches: [
        ["Scotland", "South Africa"],
        ["Mongolia", "TBD"],
      ],
    },
    {
      id: "cricket",
      name: "Cricket",
      emoji: "🏏",
      status: "upcoming",
      battingOrder: ["TBD", "Scotland", "Mongolia", "South Africa"],
      runs: { TBD: null, Scotland: null, Mongolia: null, "South Africa": null },
    },
    {
      id: "two-square",
      name: "Two Square",
      emoji: "🎾",
      status: "upcoming",
      openingMatches: [
        ["TBD", "Scotland"],
        ["Mongolia", "South Africa"],
      ],
    },
    {
      id: "sprint",
      name: "Sprint",
      emoji: "🏃‍♂️",
      status: "upcoming",
      runners: ["Noah Edge", "Jack Coleman", "Eric Yao", "Thomas Dempsey", "Joseph Hart"],
    },
    {
      id: "drinking",
      name: "Drinking",
      emoji: "🍺",
      status: "upcoming",
      provisionalTopTen: [
        "Aleksa Kvrgic",
        "Noah Edge",
        "Thomas Dempsey",
        "Priyen Moodley",
        "Kyle Taplin",
        "Joseph Hart",
        "Todd Williams",
        "Cruz Deabreu",
        "James Crossley",
        "Jayden Nolan",
      ],
    },
    {
      id: "wii-bowling",
      name: "Wii Bowling",
      emoji: "🎳",
      status: "upcoming",
      playingOrder: ["Mongolia", "Scotland", "TBD", "South Africa"],
      points: { Mongolia: null, Scotland: null, TBD: null, "South Africa": null },
    },
    {
      id: "wii-baseball",
      name: "Wii Baseball",
      emoji: "⚾️",
      status: "upcoming",
      openingMatches: [
        ["Scotland", "South Africa"],
        ["Mongolia", "TBD"],
      ],
    },
    {
      id: "mario-kart",
      name: "Mario Kart",
      emoji: "🏎️",
      status: "upcoming",
      points: { Mongolia: null, Scotland: null, "South Africa": null, TBD: null },
    },
  ],
}
