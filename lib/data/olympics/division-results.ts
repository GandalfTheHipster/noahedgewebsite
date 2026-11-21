import type { OlympicEvent } from "@/lib/data/olympics/olympics-template"

export function expandDivisionResults(event: OlympicEvent, { showDivision = true } = {}): OlympicEvent[] {
  if (!event.divisions?.length) return [event]

  return event.divisions.map((division, index) => {
    const gold = division.goldMatch?.winner
    const silver = division.goldMatch?.teams.find((team) => team !== gold)
    const bronzeMatch = division.bronzeMatch
    const bronze = bronzeMatch?.teams.find((team) =>
      team === bronzeMatch.winner || bronzeMatch.players?.[team]?.includes(bronzeMatch.winner),
    )
    const recipients = (team: string | undefined, players = division.players) =>
      team ? players[team]?.filter((name): name is string => Boolean(name)) ?? [team] : undefined

    return {
      ...event,
      id: `${event.id}-division-${index + 1}`,
      name: showDivision ? `${event.name} · ${division.name}` : event.name,
      divisions: [division],
      gold: recipients(gold),
      silver: recipients(silver),
      bronze: recipients(bronze, bronzeMatch?.players),
    }
  })
}
