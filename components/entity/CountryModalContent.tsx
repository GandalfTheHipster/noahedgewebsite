import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import {
  getOlympicCountry,
  OLYMPIC_COUNTRIES,
} from "@/lib/data/olympics/countries"

type CountryModalContentProps = {
  countryId: string
}

const olympicsArchive = [OLYMPICS_2021_DATA, OLYMPICS_2023_DATA]

function StatTile({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border bg-muted/35 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

export function CountryModalContent({ countryId }: CountryModalContentProps) {
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

  const members = BAPE_PROFILES.filter((profile) =>
    profile.country.includes(country.rosterFlag ?? country.flag),
  )

  const medalTableEntries = olympicsArchive
    .map((olympics) => {
      const medalTableEntry = olympics.medalTable.find(
        (entry) => entry.name === country.name,
      )

      if (!medalTableEntry) return null

      return {
        title: olympics.title,
        year: olympics.date,
        rank:
          olympics.medalTable.findIndex((entry) => entry.name === country.name) +
          1,
        medalTableEntry,
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  const memberNames = new Set(
    members.map((member) => `${member.firstName} ${member.lastName}`),
  )

  const olympicMedalEditions = olympicsArchive
    .map((olympics) => {
      const hasTeamEntry = olympics.medalTable.some(
        (entry) => entry.name === country.name,
      )

      if (!hasTeamEntry) return null

      const medals = olympics.events
        .flatMap((event) => {
          const results = [
            { medal: "Gold", names: event.gold ?? [] },
            { medal: "Silver", names: event.silver ?? [] },
            { medal: "Bronze", names: event.bronze ?? [] },
          ]

          return results
            .filter((result) =>
              result.names.some((name) => memberNames.has(name)),
            )
            .map((result) => ({
              event: event.name,
              emoji: event.emoji,
              medal: result.medal,
              winners: result.names.filter((name) => memberNames.has(name)),
            }))
        })
        .toSorted(
          (a, b) =>
            getMedalSortValue(a.medal) - getMedalSortValue(b.medal) ||
            a.event.localeCompare(b.event),
        )

      if (medals.length === 0) return null

      const gold = medals.filter((medal) => medal.medal === "Gold")
      const silver = medals.filter((medal) => medal.medal === "Silver")
      const bronze = medals.filter((medal) => medal.medal === "Bronze")

      return {
        year: olympics.date,
        medals,
        gold,
        silver,
        bronze,
      }
    })
    .filter((edition): edition is NonNullable<typeof edition> =>
      Boolean(edition),
    )

  const eventWinCount = olympicMedalEditions.reduce(
    (total, edition) => total + edition.gold.length,
    0,
  )

  const olympicsTitle = medalTableEntries[0]?.title ?? "Olympics"
  const finalRank = medalTableEntries[0]?.rank

  const totals = medalTableEntries.reduce(
    (total, entry) => ({
      gold: total.gold + entry.medalTableEntry.gold,
      silver: total.silver + entry.medalTableEntry.silver,
      bronze: total.bronze + entry.medalTableEntry.bronze,
      pts: total.pts + entry.medalTableEntry.pts,
    }),
    { gold: 0, silver: 0, bronze: 0, pts: 0 },
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 pr-10">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border bg-muted/35 text-5xl">
          {country.flag}
        </div>

        <div className="min-w-0 pt-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Olympic Team
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {country.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {olympicsTitle} · {eventWinCount} event wins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Final Rank"
          value={finalRank ? formatRank(finalRank) : "TBA"}
        />
        <StatTile label="Gold" value={totals.gold} />
        <StatTile label="Silver" value={totals.silver} />
        <StatTile label="Bronze" value={totals.bronze} />
      </div>

      <section className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Members
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {members.map((member) => (
            <PersonProfileButton
              key={member.bapeID}
              bapeID={String(member.bapeID)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Medal Haul
        </h3>

        {olympicMedalEditions.length > 0 ? (
          <div className="mt-3 grid gap-4">
            {olympicMedalEditions.map((edition) => (
              <div
                key={edition.year}
                className="rounded-xl border bg-background p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{edition.year} Olympics</p>
                  <div className="flex gap-1.5 text-xs font-semibold">
                    <MedalCountBadge medal="Gold" value={edition.gold.length} />
                    <MedalCountBadge
                      medal="Silver"
                      value={edition.silver.length}
                    />
                    <MedalCountBadge
                      medal="Bronze"
                      value={edition.bronze.length}
                    />
                  </div>
                </div>

                <div className="mt-3 grid gap-2">
                  {edition.medals.map((medal) => (
                    <CountryMedalRow
                      year={edition.year}
                      key={`${edition.year}-${medal.event}-${medal.medal}`}
                      medal={medal.medal}
                      emoji={medal.emoji}
                      event={medal.event}
                      winners={medal.winners}
                      teamMemberCount={members.length}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No Olympic medals recorded yet.
          </p>
        )}
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
    <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-xl border bg-muted/25 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <MedalPill medal={medal} />
        <p className="min-w-0 truncate font-medium">
          <span className="mr-2">{emoji}</span>
          {event}
        </p>
      </div>
      {showWinners ? (
        <div className="flex max-w-[42vw] flex-nowrap gap-1.5 overflow-x-auto sm:max-w-72 sm:justify-end">
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
      ) : (
        <div className="w-0 sm:w-72" />
      )}
    </div>
  )
}

function MedalCountBadge({
  medal,
  value,
}: {
  medal: string
  value: number
}) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-0.5 tabular-nums",
        getMedalToneClasses(medal),
      ].join(" ")}
    >
      {medal[0]} {value}
    </span>
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
