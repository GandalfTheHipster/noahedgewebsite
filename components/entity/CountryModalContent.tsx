import { OlympicMedalDisclosure } from "@/components/entity/OlympicMedalDisclosure"
import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"
import { expandDivisionResults } from "@/lib/data/olympics/division-results"
import {
  getOlympicCountry,
  OLYMPIC_COUNTRIES,
} from "@/lib/data/olympics/countries"

const olympicEditions = [OLYMPICS_2026_DATA, OLYMPICS_2023_DATA, OLYMPICS_2021_DATA]

export function CountryModalContent({ countryId }: { countryId: string }) {
  const country =
    getOlympicCountry(countryId) ??
    OLYMPIC_COUNTRIES.find((country) => country.name === countryId)

  if (!country) {
    return (
      <div className="pr-10">
        <h2 className="text-xl font-semibold">Country not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No Olympic country exists for: {countryId}
        </p>
      </div>
    )
  }

  const edition = olympicEditions.find((olympics) =>
    olympics.medalTable.some((entry) => entry.name === country.name),
  )
  const captain = edition?.captains?.[country.name]
  const members = BAPE_PROFILES
    .filter((profile) => profile.country.includes(country.rosterFlag ?? country.flag))
    .map((profile) => ({ id: String(profile.bapeID), name: `${profile.firstName} ${profile.lastName}` }))
    .sort((a, b) => Number(b.name === captain) - Number(a.name === captain) || a.name.localeCompare(b.name))
  const memberNames = new Set(members.map((member) => member.name))
  const standings = edition?.medalTable.toSorted(
    (a, b) => b.pts - a.pts || (b.gold + b.silver + b.bronze) - (a.gold + a.silver + a.bronze),
  ) ?? []
  const rankIndex = standings.findIndex((entry) => entry.name === country.name)
  const standing = standings[rankIndex]
  const hasResults = standings.some((entry) => entry.pts > 0)
  const isOngoing = edition?.events.some((event) => event.status === "upcoming")
  const medals = (edition?.events ?? [])
    .flatMap((event) => expandDivisionResults(event, { showDivision: false }))
    .flatMap((event) =>
      [
        { medal: "Gold", names: event.gold ?? [] },
        { medal: "Silver", names: event.silver ?? [] },
        { medal: "Bronze", names: event.bronze ?? [] },
      ]
        .filter(({ names }) => names.includes(country.name) || names.some((name) => memberNames.has(name)))
        .map(({ medal, names }) => ({
          eventId: event.id,
          event: event.name,
          emoji: event.emoji,
          medal,
          winners: names.filter((name) => memberNames.has(name)),
        })),
    )
    .toSorted((a, b) => getMedalSortValue(a.medal) - getMedalSortValue(b.medal) ||
      a.event.localeCompare(b.event))

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pr-10">
        <div aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-xl border bg-muted/35 text-4xl">
          {country.flag}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{country.name}</h2>
          {edition && (
            <p className="mt-1 text-sm text-muted-foreground">{edition.date} {edition.location}</p>
          )}
        </div>
      </div>

      {edition && standing && (
        <section aria-label="Olympic results" className="rounded-xl border p-3">
          {hasResults && (
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold">
                {formatRank(rankIndex + 1)} {isOngoing ? "in the standings" : "overall"}
              </span>
              <span className="tabular-nums text-muted-foreground">{standing.pts} pts</span>
            </div>
          )}
          <OlympicMedalDisclosure year={edition.date} gold={standing.gold} silver={standing.silver} bronze={standing.bronze}>
            {medals.length ? (
              <div className="mt-2 divide-y divide-border/60">
                {medals.map((medal) => (
                  <CountryMedalRow
                    key={`${medal.eventId}-${medal.medal}`}
                    year={edition.date}
                    medal={medal.medal}
                    emoji={medal.emoji}
                    event={medal.event}
                    winners={medal.winners}
                    teamMemberCount={members.length}
                  />
                ))}
              </div>
            ) : null}
          </OlympicMedalDisclosure>
        </section>
      )}

      <section>
        <h3 className="border-b pb-2 text-base font-semibold">Members</h3>
        <ul className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
          {members.map((member) => (
            <li key={member.id} className="min-w-0">
              <PersonProfileButton
                bapeID={member.id}
                olympicsYear={edition?.date}
                meta={member.name === captain ? "Captain" : undefined}
                labelMode="full"
                nameClassName="whitespace-normal break-words"
                className="min-h-11 w-full rounded-md border-transparent bg-transparent shadow-none hover:translate-y-0 hover:border-transparent hover:shadow-none"
                compact
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function CountryMedalRow({
  year,
  medal,
  emoji,
  event,
  winners,
  teamMemberCount,
}: {
  year: string
  medal: string
  emoji: string
  event: string
  winners: string[]
  teamMemberCount: number
}) {
  const showWinners = winners.length > 0 && winners.length < teamMemberCount

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <MedalPill medal={medal} />
        <p className="min-w-0 truncate font-medium">
          <span className="mr-2">{emoji}</span>
          {event}
        </p>
      </div>
      {showWinners ? (
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {winners.map((winner) => (
            <PersonProfileButton
              key={`${event}-${medal}-${winner}`}
              olympicsYear={year}
              bapeID={getPersonIdByName(winner)}
              compact
              className="px-2 py-1"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function MedalPill({ medal }: { medal: string }) {
  return (
    <span
      className={[
        "w-fit rounded-full border px-2 py-1 text-xs font-semibold",
        getMedalToneClasses(medal),
      ].join(" ")}
    >
      {medal}
    </span>
  )
}

function getMedalToneClasses(medal: string) {
  if (medal === "Gold") {
    return "border-[#b47a00]/25 bg-[#f8c75c]/25 text-[#7a5100] dark:text-[#f8c75c]"
  }

  if (medal === "Silver") {
    return "border-black/10 bg-[#e5e7e9]/55 text-slate-700 dark:bg-[#d8dde3]/20 dark:text-[#d8dde3]"
  }

  if (medal === "Bronze") {
    return "border-[#7a3f16]/35 bg-[#8a4f18]/25 text-[#8a3f0f] dark:border-[#ff9b54]/30 dark:bg-[#7a3f16]/35 dark:text-[#ff9b54]"
  }

  return "bg-muted/35"
}

function getPersonIdByName(name: string) {
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )

  return profile ? String(profile.bapeID) : name
}

function getMedalSortValue(medal: string) {
  if (medal === "Gold") return 0
  if (medal === "Silver") return 1
  if (medal === "Bronze") return 2
  return 3
}

function formatRank(rank: number) {
  const suffix =
    rank % 100 >= 11 && rank % 100 <= 13
      ? "th"
      : rank % 10 === 1
        ? "st"
        : rank % 10 === 2
          ? "nd"
          : rank % 10 === 3
            ? "rd"
            : "th"

  return `${rank}${suffix}`
}
