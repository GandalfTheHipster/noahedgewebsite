import { BAPE_PROFILES, type BapeProfile } from "@/lib/data/BapeProfiles"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

const OLYMPIC_EDITIONS = [
  OLYMPICS_2021_DATA,
  OLYMPICS_2023_DATA,
  OLYMPICS_2026_DATA,
]

type MedalTone = "gold" | "silver" | "bronze"

export type AllTimeOlympicAthlete = {
  id: number
  name: string
  firstName: string
  teams: string[]
  points: number
  gold: number
  silver: number
  bronze: number
  medals: number
}

export type AllTimeOlympicChampion = {
  id: number
  name: string
  championships: number
  wins: Array<{
    year: string
    title: string
    country: string
    flag: string
  }>
}

function isCompletedEdition(data: OlympicPageData) {
  return data.events.length > 0 && data.medalTable.some((entry) => entry.pts > 0)
}

function getCompletedEditions() {
  return OLYMPIC_EDITIONS.filter(isCompletedEdition)
}

function getProfileName(profile: BapeProfile) {
  return `${profile.firstName} ${profile.lastName}`
}

function getProfileByName(name: string) {
  return BAPE_PROFILES.find((profile) => getProfileName(profile) === name)
}

function getMedalPoints(medal: MedalTone) {
  if (medal === "gold") return 3
  if (medal === "silver") return 2
  return 1
}

function getCompletedTeams(profile: BapeProfile, editions: OlympicPageData[]) {
  const teams = new Set<string>()

  for (const edition of editions) {
    for (const entry of edition.medalTable) {
      const country = getOlympicCountry(entry.name)

      if (country && profile.country.includes(country.flag)) {
        teams.add(country.flag)
      }
    }
  }

  return [...teams]
}

export function getAllTimeOlympicAthletes(): AllTimeOlympicAthlete[] {
  const completedEditions = getCompletedEditions()
  const athletes = new Map<number, AllTimeOlympicAthlete>(
    BAPE_PROFILES.map((profile) => [
      profile.bapeID,
      {
        id: profile.bapeID,
        name: getProfileName(profile),
        firstName: profile.firstName,
        teams: getCompletedTeams(profile, completedEditions),
        points: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
        medals: 0,
      },
    ]),
  )

  for (const edition of completedEditions) {
    for (const event of edition.events) {
      if (event.status !== "completed") continue

      for (const medal of ["gold", "silver", "bronze"] as const) {
        for (const name of event[medal] ?? []) {
          const profile = getProfileByName(name)
          const athlete = profile ? athletes.get(profile.bapeID) : undefined

          if (!athlete) continue

          athlete[medal] += 1
          athlete.medals += 1
          athlete.points += getMedalPoints(medal)
        }
      }
    }
  }

  return [...athletes.values()]
    .filter((athlete) => athlete.medals > 0)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.gold !== a.gold) return b.gold - a.gold
      if (b.silver !== a.silver) return b.silver - a.silver
      if (b.bronze !== a.bronze) return b.bronze - a.bronze
      return a.name.localeCompare(b.name)
    })
}

export function getAllTimeOlympicChampions(): AllTimeOlympicChampion[] {
  const champions = new Map<number, AllTimeOlympicChampion>()

  for (const edition of getCompletedEditions()) {
    if (!edition.winner) continue

    const country = getOlympicCountry(edition.winner)
    if (!country) continue

    for (const profile of BAPE_PROFILES) {
      if (!profile.country.includes(country.flag)) continue

      const existing = champions.get(profile.bapeID) ?? {
        id: profile.bapeID,
        name: getProfileName(profile),
        championships: 0,
        wins: [],
      }

      existing.championships += 1
      existing.wins.push({
        year: edition.date,
        title: edition.title,
        country: country.name,
        flag: country.flag,
      })

      champions.set(profile.bapeID, existing)
    }
  }

  return [...champions.values()].sort((a, b) => {
    if (b.championships !== a.championships) {
      return b.championships - a.championships
    }

    return a.name.localeCompare(b.name)
  })
}
