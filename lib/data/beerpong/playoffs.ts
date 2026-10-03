import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

export type BeerPongPlayoffMatch = {
  id: string
  round: "quarter-final" | "semi-final" | "grand-final"
  label: string
  teamA: string
  scoreA: number
  teamB: string
  scoreB: number
  winner: string
}

export const BEERPONG_2025_26_PLAYOFFS: BeerPongPlayoffMatch[] = [
  {
    id: "qf-1",
    round: "quarter-final",
    label: "Quarter Final 1",
    teamA: "PCK",
    scoreA: 2,
    teamB: "HAR",
    scoreB: 0,
    winner: "PCK",
  },
  {
    id: "qf-2",
    round: "quarter-final",
    label: "Quarter Final 2",
    teamA: "KOB",
    scoreA: 4,
    teamB: "TUR",
    scoreB: 0,
    winner: "KOB",
  },
  {
    id: "sf-1",
    round: "semi-final",
    label: "Semi Final 1",
    teamA: "TAP",
    scoreA: 4,
    teamB: "PCK",
    scoreB: 0,
    winner: "TAP",
  },
  {
    id: "sf-2",
    round: "semi-final",
    label: "Semi Final 2",
    teamA: "KOB",
    scoreA: 1,
    teamB: "DEM",
    scoreB: 0,
    winner: "KOB",
  },
  {
    id: "gf",
    round: "grand-final",
    label: "Grand Final",
    teamA: "TAP",
    scoreA: 1,
    teamB: "KOB",
    scoreB: 0,
    winner: "TAP",
  },
]

export function getBeerPongPlayoffFinish(teamCode: string) {
  const final = BEERPONG_2025_26_PLAYOFFS.find(
    (match) => match.round === "grand-final",
  )
  if (final?.winner === teamCode) return "Champion"

  const elimination = BEERPONG_2025_26_PLAYOFFS.find(
    (match) =>
      (match.teamA === teamCode || match.teamB === teamCode) &&
      match.winner !== teamCode,
  )

  if (elimination?.round === "grand-final") return "Runner-up"
  if (elimination?.round === "semi-final") return "Semi-final exit"
  if (elimination?.round === "quarter-final") return "Quarter-final exit"
  return "No playoff result"
}

const champion = BEERPONG_TEAMS.find((team) => team.code === "TAP")
const minorPremiers = BEERPONG_TEAMS.find((team) => team.code === "DEM")

if (!champion || !minorPremiers) {
  throw new Error("Champion and minor premiers must be included in the Beer Pong team list.")
}

export const BEERPONG_2025_26_ARCHIVE = {
  season: "2025–2026",
  champion,
  minorPremiers,
  runnerUpCode: "KOB",
} as const

export const BEERPONG_2026_27_CLUBS = BEERPONG_TEAMS.map((team) => ({
  code: team.code,
  name: team.name,
  shortName: team.shortName,
  logo: team.logo,
}))
