import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import {
  BAPE_PROFILES,
  getBapeProfileAvatar,
} from "@/lib/data/BapeProfiles"
import { getBadgesForPerson } from "@/lib/data/badges"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"
import { getOlympicCountry } from "@/lib/data/olympics/countries"

type PersonModalContentProps = {
  personId: string
}

const olympicsArchive = [OLYMPICS_2021_DATA, OLYMPICS_2023_DATA]

function getOlympicsEditionLogo(year: string) {
  if (year === "2026") {
    return {
      light: "https://i.postimg.cc/j5KKMgT0/lavendar.png",
      dark: "https://i.postimg.cc/RFNrsj8m/Lavender-White.png",
    }
  }

  if (year === "2023") {
    return {
      light: "https://i.postimg.cc/T16hcGMv/Black-Bape-Olympics2023.png",
      dark: "https://i.postimg.cc/J0LtQmVL/White-Bape-Olympics2023.png",
    }
  }

  if (year === "2021") {
    return {
      light:
        "https://i.postimg.cc/Kv1C5TNW/Bape-Olympics-Logo-Rockingham-Black.png",
      dark:
        "https://i.postimg.cc/hPN6ZGZh/Bape-Olympics-Rockingham-White.png",
    }
  }

  return null
}

function OlympicsEditionLogo({ year }: { year: string }) {
  const logo = getOlympicsEditionLogo(year)
  if (!logo) return null

  return (
    <span
      aria-hidden="true"
      className="grid size-6 shrink-0 place-items-center"
    >
      <Image
        src={logo.light}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain dark:hidden"
      />
      <Image
        src={logo.dark}
        alt=""
        width={24}
        height={24}
        className="hidden h-6 w-6 object-contain dark:block"
      />
    </span>
  )
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string | number
  tone?: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="flex items-baseline justify-center gap-1.5 px-1.5 py-1.5">
      <p
        className={[
          "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
          tone === "gold" ? "text-[#9a6500] dark:text-[#f8c75c]" : "",
          tone === "silver" ? "text-slate-600 dark:text-[#d8dde3]" : "",
          tone === "bronze" ? "text-[#8a4f18] dark:text-[#dfb582]" : "",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="text-base font-bold tabular-nums">{value}</p>
    </div>
  )
}

function StatSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <h3 className="border-b pb-2 text-lg font-semibold tracking-wide">
        {title}
      </h3>
      {children}
    </section>
  )
}

export function PersonModalContent({ personId }: PersonModalContentProps) {
  const numericPersonId = Number(personId)

  const profile = BAPE_PROFILES.find(
    (profile) => profile.bapeID === numericPersonId,
  )

  const beerPongTeams = BEERPONG_TEAMS.filter((team) =>
    team.players.includes(numericPersonId),
  )

  if (!profile) {
    return (
      <div className="pr-10">
        <h2 className="text-xl font-semibold">Person not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No person exists for ID: {personId}
        </p>
      </div>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`
  const badges = getBadgesForPerson(profile.bapeID)
  const upcomingTeam = OLYMPICS_2026_DATA.medalTable.find((team) => {
    const country = getOlympicCountry(team.name)
    return country ? profile.country.includes(country.flag) : false
  })
  const upcomingCountry = upcomingTeam
    ? getOlympicCountry(upcomingTeam.name)
    : undefined

  const olympicEditions = olympicsArchive
    .map((olympics) => {
      const medals = olympics.events.flatMap((event) => {
        const results = [
          { medal: "Gold", names: event.gold ?? [] },
          { medal: "Silver", names: event.silver ?? [] },
          { medal: "Bronze", names: event.bronze ?? [] },
        ]

        return results
          .filter((result) => result.names.includes(fullName))
          .map((result) => ({
            event: event.name,
            medal: result.medal,
            emoji: event.emoji,
          }))
      })

      if (medals.length === 0) return null

      return {
        year: olympics.date,
        location: olympics.location,
        medals,
      }
    })
    .filter((edition): edition is NonNullable<typeof edition> =>
      Boolean(edition),
    )

  let countryIndex = 0
  const olympicTeams = olympicEditions.map((edition) => {
    const flag = profile.country[countryIndex] ?? profile.country[0]
    countryIndex += 1
    const country = flag ? getOlympicCountry(flag) : undefined
    const gold = edition.medals.filter((medal) => medal.medal === "Gold")
    const silver = edition.medals.filter((medal) => medal.medal === "Silver")
    const bronze = edition.medals.filter((medal) => medal.medal === "Bronze")

    return {
      ...edition,
      country,
      gold,
      silver,
      bronze,
      points: gold.length * 3 + silver.length * 2 + bronze.length,
      medals: edition.medals.toSorted(
        (a, b) => getMedalSortValue(a.medal) - getMedalSortValue(b.medal),
      ),
    }
  }).sort((a, b) => Number(b.year) - Number(a.year))
  const hasBeerPongClub = beerPongTeams.length > 0
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pr-12">
        <Image
          src={getBapeProfileAvatar(profile)}
          alt={fullName}
          width={88}
          height={88}
          className="h-16 w-16 shrink-0 rounded-xl border object-cover"
        />

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
            {fullName}
          </h2>
        </div>
      </div>

      <StatSection title="Olympics">
        <div className="divide-y rounded-xl border bg-muted/10 px-3">
          {upcomingCountry ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3">
              <Link
                href={`/bape/olympics/${OLYMPICS_2026_DATA.date}`}
                aria-label={`View ${OLYMPICS_2026_DATA.date} Olympics in ${OLYMPICS_2026_DATA.location}`}
                className="col-start-1 row-start-1 inline-flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <OlympicsEditionLogo year={OLYMPICS_2026_DATA.date} />
                <span className="truncate">
                  {OLYMPICS_2026_DATA.date} {OLYMPICS_2026_DATA.location}
                </span>
              </Link>
              <span className="col-start-1 row-start-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                Upcoming
              </span>
              <div className="col-start-2 row-start-1 flex items-center gap-1">
                <CountryProfileButton
                  country={upcomingCountry.name}
                  compact
                  iconOnly
                />
                <EntityTrigger
                  type="country"
                  id={upcomingCountry.name}
                  className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {upcomingCountry.name}
                </EntityTrigger>
              </div>
            </div>
          ) : null}
          {olympicTeams.length > 0 ? (
            olympicTeams.map((edition) => (
              <div
                key={edition.year}
                className="py-3 first:pt-3 last:pb-3"
              >
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <Link
                    href={`/bape/olympics/${edition.year}`}
                    aria-label={`View ${edition.year} Olympics overview`}
                    className="inline-flex min-w-0 flex-1 items-center gap-2 text-lg font-bold tracking-tight underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <OlympicsEditionLogo year={edition.year} />
                    <span className="truncate">
                      {edition.year} {edition.location}
                    </span>
                  </Link>
                  {edition.country ? (
                    <div className="flex shrink-0 items-center gap-1">
                      <CountryProfileButton
                        country={edition.country.name}
                        compact
                        iconOnly
                      />
                      <EntityTrigger
                        type="country"
                        id={edition.country.name}
                        className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        {edition.country.name}
                      </EntityTrigger>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 grid grid-cols-3 divide-x rounded-lg bg-muted/30 text-center">
                  <StatTile
                    label="Gold"
                    value={edition.gold.length}
                    tone="gold"
                  />
                  <StatTile
                    label="Silver"
                    value={edition.silver.length}
                    tone="silver"
                  />
                  <StatTile
                    label="Bronze"
                    value={edition.bronze.length}
                    tone="bronze"
                  />
                </div>

                <details className="group/medals mt-3">
                  <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <span className="group-open/medals:hidden">Expand to see medals</span>
                    <span className="hidden group-open/medals:inline">Hide medals</span>
                    <span className="sr-only"> for {edition.year} Olympics</span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform group-open/medals:rotate-180"
                    />
                  </summary>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {edition.medals.map((medal) => (
                      <MedalPill
                        key={`${medal.event}-${medal.medal}`}
                        medal={medal.medal}
                        emoji={medal.emoji}
                        event={medal.event}
                      />
                    ))}
                  </div>
                </details>
              </div>
            ))
          ) : !upcomingCountry ? (
            <p className="py-3 text-sm text-muted-foreground">
              No Olympics results recorded yet.
            </p>
          ) : null}
        </div>
      </StatSection>

      <StatSection title="Badges">
        {badges.length > 0 ? (
          <div className="divide-y rounded-xl border bg-muted/10 px-3">
            {badges.map((badge) => (
              <div
                key={`${badge.id}-${badge.dateReceived}`}
                className="flex gap-3 py-3 first:pt-3 last:pb-3"
              >
                <Image
                  src={badge.imageUrl}
                  alt={badge.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBadgeDate(badge.dateReceived)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No badges assigned yet.
          </p>
        )}
      </StatSection>

      {hasBeerPongClub ? (
        <BeerPongClubSection beerPongTeams={beerPongTeams} />
      ) : null}
    </div>
  )
}

function MedalPill({
  medal,
  emoji,
  event,
}: {
  medal: string
  emoji: string
  event: string
}) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-0.5 font-medium",
        medal === "Gold"
          ? "border-[#b47a00]/25 bg-[#f8c75c]/25 text-[#7a5100] dark:text-[#f8c75c]"
          : "",
        medal === "Silver"
          ? "border-black/10 bg-[#e5e7e9]/55 text-slate-700 dark:bg-[#d8dde3]/20 dark:text-[#d8dde3]"
          : "",
        medal === "Bronze"
          ? "border-[#7a3f16]/35 bg-[#8a4f18]/25 text-[#8a3f0f] dark:border-[#ff9b54]/30 dark:bg-[#7a3f16]/35 dark:text-[#ff9b54]"
          : "",
      ].join(" ")}
    >
      {emoji} {event}
    </span>
  )
}

function BeerPongClubSection({
  beerPongTeams,
}: {
  beerPongTeams: typeof BEERPONG_TEAMS
}) {
  return (
    <StatSection title="Beer Pong Club">
      <div className="grid gap-2">
        {beerPongTeams.map((team) => (
          <TeamProfileButton
            key={team.code}
            code={team.code}
            meta={`${team.pts} pts · ${getBeerPongPlace(team.code)} place · ${team.w}-${team.l}`}
          />
        ))}
      </div>
    </StatSection>
  )
}

function getMedalSortValue(medal: string) {
  if (medal === "Gold") return 0
  if (medal === "Silver") return 1
  if (medal === "Bronze") return 2
  return 3
}

function getBeerPongPlace(teamCode: string) {
  const standings = [...BEERPONG_TEAMS].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.w !== a.w) return b.w - a.w
    return b.netCups - a.netCups
  })
  const place =
    standings.findIndex((standing) => standing.code === teamCode) + 1

  if (place <= 0) return "N/A"

  return getOrdinal(place)
}

function getOrdinal(value: number) {
  if (value % 100 >= 11 && value % 100 <= 13) return `${value}th`

  switch (value % 10) {
    case 1:
      return `${value}st`
    case 2:
      return `${value}nd`
    case 3:
      return `${value}rd`
    default:
      return `${value}th`
  }
}

function formatBadgeDate(dateReceived: string) {
  const date = new Date(`${dateReceived}T00:00:00`)

  if (Number.isNaN(date.getTime())) return dateReceived

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}
