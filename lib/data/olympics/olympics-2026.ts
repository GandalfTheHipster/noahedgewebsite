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
    "San Marino": "Jayden Chang",
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
      name: "San Marino",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
  ],

  events: [
    { id: "cooking", name: "Cooking", emoji: "🧑‍🍳", status: "upcoming" },
    { id: "trivia", name: "Trivia", emoji: "🤔", status: "upcoming" },
    { id: "futsal", name: "Futsal", emoji: "⚽️", status: "upcoming" },
    { id: "basketball", name: "Basketball", emoji: "🏀", status: "upcoming" },
    { id: "beer-pong", name: "Beer Pong", emoji: "🏓", status: "upcoming" },
    { id: "pickleball", name: "Pickleball", emoji: "🥒", status: "upcoming" },
    { id: "cricket", name: "Cricket", emoji: "🏏", status: "upcoming" },
    { id: "two-square", name: "Two Square", emoji: "🎾", status: "upcoming" },
    { id: "sprint", name: "Sprint", emoji: "🏃‍♂️", status: "upcoming" },
    { id: "drinking", name: "Drinking", emoji: "🍺", status: "upcoming" },
    { id: "wii-bowling", name: "Wii Bowling", emoji: "🎳", status: "upcoming" },
    { id: "wii-baseball", name: "Wii Baseball", emoji: "⚾️", status: "upcoming" },
    { id: "mario-kart", name: "Mario Kart", emoji: "🏎️", status: "upcoming" },
  ],
}
