import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

export type BapeBadge = {
  id: string
  name: string
  description: string
  imageUrl: string
}

export type PersonBadgeAssignment = {
  personName: string
  badgeId: string
  dateReceived: string
}

export const BAPE_BADGES: BapeBadge[] = [
  {
    id: "beerpong_league_champion_2026",
    name: "2026 Beer Pong League Champion",
    description: "Awarded for winning the 2026 Bape Beer Pong League.",
    imageUrl: "https://i.postimg.cc/0jS7qSxq/taplin-bpc.png",
  },
  {
    id: "pistolshrimp",
    name: "Pistolshrimp",
    description:
      "Awarded for representing the Pistolshrimps mixed basketball team.",
    imageUrl: "https://i.postimg.cc/Pq8StZ5z/pistolshrimp.png",
  },
  {
    id: "dinoco",
    name: "Team Dinoco",
    description:
      "Awarded for representing the Team Dinoco men's basketball team.",
    imageUrl: "https://i.postimg.cc/HxpLNmsm/dinocobadge.png",
  },
  {
    id: "olympicchampion_2021",
    name: "Ivory March",
    description:
      "Awarded for winning the 2021 Bape Olympics with Cote d'Ivoire.",
    imageUrl: "https://i.postimg.cc/htvC5NFY/ivorycoastchamps.png",
  },
  {
    id: "olympicchampion_2023",
    name: "Very Nice!",
    description:
      "Awarded for winning the 2023 Bape Olympics with Kazakhstan.",
    imageUrl: "https://i.postimg.cc/7ZRB8XwZ/kazak.png",
  },
  {
    id: "vanburen",
    name: "Van Buren Boy",
    description:
      "Awarded for representing the Van Buren Boys indoor soccer team.",
    imageUrl: "https://i.postimg.cc/L5RcX26c/vanburen.png",
  },
  {
    id: "l_oftheyear",
    name: "L of the Year",
    description:
      "Recognises a nomination for the annual L of the Year award.",
    imageUrl: "https://i.postimg.cc/hjWphjJF/lossoftheyear.png",
  },
  {
    id: "w_oftheyear",
    name: "W of the Year",
    description:
      "Recognises a nomination for the annual W of the Year award.",
    imageUrl: "https://i.postimg.cc/Ghq7zdfY/bigw.png",
  },
]

// Current BAPE roster reference:
// 1 Jack Coleman
// 2 Kyle Taplin
// 3 Andrew Turnbull
// 4 Lucas Cinquina
// 5 Aleksa Kvrgic
// 6 Thomas Dempsey
// 7 Priyen Moodley
// 8 Joseph Hart
// 9 Noah Edge
// 10 Daniel Morrell
// 11 Todd Williams
// 12 Elvin Lamprecht
// 13 Sam Collings
// 14 Cian Bye
// 15 Brady Swift

export const PERSON_BADGE_ASSIGNMENTS: PersonBadgeAssignment[] = [
  {
    personName: "Jack Coleman",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "beerpong_league_champion_2026",
    dateReceived: "2026-10-04",
  },
  {
    personName: "Noah Edge",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Elvin Lamprecht",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Daniel Morrell",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Jack Coleman",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Thomas Dempsey",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Noah Edge",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Elvin Lamprecht",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Cruz Deabreu",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Eric Yao",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Jayden Chang",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Thomas Dempsey",
    badgeId: "dinoco",
    dateReceived: "2026-03-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Lucas Cinquina",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Jack Coleman",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Elvin Lamprecht",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Brady Swift",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Thomas Dempsey",
    badgeId: "l_oftheyear",
    dateReceived: "2021-12-30",
  },
  {
    personName: "Priyen Moodley",
    badgeId: "l_oftheyear",
    dateReceived: "2022-12-30",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "l_oftheyear",
    dateReceived: "2023-12-30",
  },
  {
    personName: "Lucas Cinquina",
    badgeId: "l_oftheyear",
    dateReceived: "2024-12-30",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "l_oftheyear",
    dateReceived: "2025-12-30",
  },
  {
    personName: "Lucas Cinquina",
    badgeId: "w_oftheyear",
    dateReceived: "2022-12-30",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "w_oftheyear",
    dateReceived: "2023-12-30",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "w_oftheyear",
    dateReceived: "2024-12-30",
  },
  {
    personName: "Joseph Hart",
    badgeId: "w_oftheyear",
    dateReceived: "2025-12-30",
  },
  {
    personName: "Joseph Hart",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Lucas Cinquina",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Daniel Morrell",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Thomas Dempsey",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Jack Coleman",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "vanburen",
    dateReceived: "2020-10-19",
  },
]

export function getBadgesForPerson(bapeID: number) {
  const fullName = getPersonNameByBapeID(bapeID)
  const assignments = PERSON_BADGE_ASSIGNMENTS.filter(
    (assignment) => assignment.personName === fullName,
  )

  return assignments
    .map((assignment) => {
      const badge = BAPE_BADGES.find((item) => item.id === assignment.badgeId)

      if (!badge) return null

      return {
        ...badge,
        dateReceived: assignment.dateReceived,
      }
    })
    .filter((badge): badge is BapeBadge & { dateReceived: string } =>
      Boolean(badge),
    )
}

function getPersonNameByBapeID(bapeID: number) {
  const profile = BAPE_PROFILES.find((item) => item.bapeID === bapeID)

  return profile ? `${profile.firstName} ${profile.lastName}` : null
}
