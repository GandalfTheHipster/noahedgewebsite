import type { OlympicMedalTableEntry } from "@/lib/data/olympics/olympics-template"

export function compareMedalStandings(a: OlympicMedalTableEntry, b: OlympicMedalTableEntry) {
  return b.pts - a.pts || b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze
}
