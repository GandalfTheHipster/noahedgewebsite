import Image from "next/image"
import Link from "next/link"
import { OlympicMedalDisclosure } from "@/components/entity/OlympicMedalDisclosure"
import type { ReactNode } from "react"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { PersonPortraitHistory } from "@/components/entity/PersonPortraitHistory"
import {
  BAPE_PROFILES,
} from "@/lib/data/BapeProfiles"
import { getBadgesForPerson } from "@/lib/data/badges"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { BEERPONG_2025_26_ARCHIVE, getBeerPongPlayoffFinish } from "@/lib/data/beerpong/playoffs"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"
import { get2026OlympicCountry, getOlympicAthleteMedals } from "@/lib/data/olympics/all-time"
import { getOlympicCountry } from "@/lib/data/olympics/countries"

type PersonModalContentProps = {
  personId: string
}

const olympicsArchive = [OLYMPICS_2021_DATA, OLYMPICS_2023_DATA]
const additionalPersonStrengths: Record<string, Array<{ name: string; emoji: string }>> = {
  "Jayden Chang": [
    { name: "Pickleball", emoji: "🥒" },
    { name: "Futsal", emoji: "⚽️" },
    { name: "Mario Kart", emoji: "🏎️" },
  ],
  "Raven Frederickson": [{ name: "Mario Kart", emoji: "🏎️" }],
  "James Crossley": [{ name: "Mario Kart", emoji: "🏎️" }],
  "Eric Yao": [
    { name: "Pickleball", emoji: "🥒" },
    { name: "Cooking", emoji: "🧑‍🍳" },
  ],
  "Noah Edge": [
    { name: "Basketball", emoji: "🏀" },
    { name: "Drinking", emoji: "🍺" },
    { name: "Beer Pong", emoji: "🏓" },
    { name: "FIFA", emoji: "🏟️" },
  ],
  "Cruz Deabreu": [
    { name: "Beer Pong", emoji: "🏓" },
    { name: "Basketball", emoji: "🏀" },
  ],
  "Steven Aldrin": [
    { name: "Cooking", emoji: "🧑‍🍳" },
    { name: "Trivia", emoji: "🙋‍♂️" },
    { name: "Drinking", emoji: "🍺" },
  ],
  "Jayden Lee": [{ name: "Mario Kart", emoji: "🏎️" }],
  "Luke Price": [
    { name: "Drinking", emoji: "🍺" },
    { name: "Cooking", emoji: "🧑‍🍳" },
    { name: "Trivia", emoji: "🙋‍♂️" },
  ],
}

function getPersonStrengths(fullName: string) {
  const strengths = olympicsArchive.flatMap((olympics) =>
    olympics.events
      .filter((event) => event.gold?.includes(fullName))
      .map((event) => ({ name: event.name, emoji: event.emoji })),
  )

  strengths.push(...(additionalPersonStrengths[fullName] ?? []))

  return [...new Map(strengths.map((strength) => [strength.name.toLocaleLowerCase(), strength])).values()]
}

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
  const strengths = getPersonStrengths(fullName)
  const currentCountry = get2026OlympicCountry(profile)

  const olympicEditions = [...olympicsArchive, OLYMPICS_2026_DATA]
    .map((olympics) => {
      const medals = getOlympicAthleteMedals(profile, olympics)

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
    const isCurrentEdition = edition.year === OLYMPICS_2026_DATA.date
    const flag = isCurrentEdition ? undefined : profile.country[countryIndex++] ?? profile.country[0]
    const country = isCurrentEdition ? currentCountry : flag ? getOlympicCountry(flag) : undefined
    const gold = edition.medals.filter((medal) => medal.medal === "gold")
    const silver = edition.medals.filter((medal) => medal.medal === "silver")
    const bronze = edition.medals.filter((medal) => medal.medal === "bronze")

    return {
      ...edition,
      country,
      gold,
      silver,
      bronze,
      medals: edition.medals.toSorted(
        (a, b) => getMedalSortValue(a.medal) - getMedalSortValue(b.medal),
      ),
    }
  }).sort((a, b) => Number(b.year) - Number(a.year))
  const showCurrentTeam = currentCountry && !olympicTeams.some((edition) => edition.year === OLYMPICS_2026_DATA.date)
  const hasBeerPongClub = beerPongTeams.length > 0
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pr-12">
        <PersonPortraitHistory profile={profile} />

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
            {fullName}
          </h2>
        </div>
      </div>

      <StatSection title="Olympics">
        <div className="divide-y rounded-xl border bg-muted/10 px-3">
          {showCurrentTeam ? (
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
                Underway
              </span>
              <div className="col-start-2 row-start-1 flex items-center gap-1">
                <CountryProfileButton
                  country={currentCountry.name}
                  compact
                  iconOnly
                />
                <EntityTrigger
                  type="country"
                  id={currentCountry.name}
                  className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {currentCountry.name}
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

                <OlympicMedalDisclosure
                  year={edition.year}
                  gold={edition.gold.length}
                  silver={edition.silver.length}
                  bronze={edition.bronze.length}
                >
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {edition.medals.map((medal) => (
                      <MedalPill
                        key={`${medal.eventId}-${medal.medal}`}
                        medal={medal.medal}
                        emoji={medal.emoji}
                        event={medal.event}
                      />
                    ))}
                  </div>
                </OlympicMedalDisclosure>
              </div>
            ))
          ) : !currentCountry ? (
            <p className="py-3 text-sm text-muted-foreground">
              No Olympics results recorded yet.
            </p>
          ) : null}
        </div>
      </StatSection>

      <StatSection title="Strengths">
        {strengths.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <span
                key={strength.name}
                className="inline-flex items-center gap-2 rounded-full border bg-muted/20 px-3 py-2 text-sm font-medium"
              >
                <span aria-hidden="true">{strength.emoji}</span>
                {strength.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No strengths listed yet.</p>
        )}
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
        medal === "gold"
          ? "border-[#b47a00]/25 bg-[#f8c75c]/25 text-[#7a5100] dark:text-[#f8c75c]"
          : "",
        medal === "silver"
          ? "border-black/10 bg-[#e5e7e9]/55 text-slate-700 dark:bg-[#d8dde3]/20 dark:text-[#d8dde3]"
          : "",
        medal === "bronze"
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
            meta={`${BEERPONG_2025_26_ARCHIVE.season} · ${getBeerPongPlayoffFinish(team.code)}`}
          />
        ))}
      </div>
    </StatSection>
  )
}

function getMedalSortValue(medal: string) {
  if (medal === "gold") return 0
  if (medal === "silver") return 1
  if (medal === "bronze") return 2
  return 3
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
