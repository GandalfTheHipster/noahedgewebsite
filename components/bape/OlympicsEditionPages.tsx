import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Medal, Users } from "lucide-react"

import {
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEditionHeader } from "@/components/bape/OlympicsEditionHeader"
import { UpcomingOlympicsEvent } from "@/components/bape/UpcomingOlympicsEvent"
import { OlympicsEventResultsList } from "@/components/bape/OlympicsEventCard"
import { OlympicsImageGallery } from "@/components/bape/OlympicsImageGallery"
import { OlympicsSectionNav } from "@/components/bape/OlympicsSectionNav"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES, getBapeProfileAvatar } from "@/lib/data/BapeProfiles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { expandDivisionResults } from "@/lib/data/olympics/division-results"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import { compareMedalStandings } from "@/lib/data/olympics/medal-standings"
import type {
  OlympicEvent,
  OlympicImage,
  OlympicMedalTableEntry,
  OlympicPageData,
} from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

type OlympicsEditionPageProps = {
  data: OlympicPageData
}

export function OlympicsOverviewPage({ data }: OlympicsEditionPageProps) {
  const teamRosters = getTeamRosters(data)
  const hasResults = hasOlympicsResults(data)
  const is2026 = data.date === "2026"
  const teamRosterPanel = (
    <TeamRosterPanel
      year={data.date}
      rosters={teamRosters}
      mvp={data.mvp}
      hasResults={hasResults}
      horizontalWinner={is2026 ? data.winner : undefined}
    />
  )

  return (
    <OlympicsPageFrame data={data}>
      <section className="grid gap-10 sm:gap-12">
        {is2026 && teamRosterPanel}

        {hasResults ? (
          <BapeSectionHeader
            title="Overview"
          />
        ) : null}

        <OlympicsAtAGlance
          data={data}
          rosters={teamRosters}
          hasResults={hasResults}
        />

        {!is2026 && teamRosterPanel}
        {!is2026 && data.calendar?.length ? <OlympicsCalendar data={data} /> : null}
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsTeamsPage({ data }: OlympicsEditionPageProps) {
  const hasResults = hasOlympicsResults(data)

  return (
    <OlympicsPageFrame data={data}>
      <TeamRosterPanel
        year={data.date}
        rosters={getTeamRosters(data)}
        mvp={data.mvp}
        hasResults={hasResults}
      />
    </OlympicsPageFrame>
  )
}

export function OlympicsImagesPage({ data }: OlympicsEditionPageProps) {
  const images = getOlympicImages(data)
  const hasImages = images.length > 0

  return (
    <OlympicsPageFrame data={data}>
      <section className="grid gap-5">
        <BapeSectionHeader
          title="Images"
          description={
            hasImages
              ? "Photos from the edition."
              : undefined
          }
        />

        {hasImages ? (
          <OlympicsImageGallery images={images} title={data.title} />
        ) : (
          <BapePanel className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              No content yet.
            </p>
          </BapePanel>
        )}
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsMedalTablePage({ data }: OlympicsEditionPageProps) {
  return (
    <OlympicsPageFrame data={data}>
      <OlympicsMedalTableSection data={data} />
    </OlympicsPageFrame>
  )
}

function OlympicsMedalTableSection({ data }: OlympicsEditionPageProps) {
  const hasResults = hasOlympicsResults(data)
  const entries = data.medalTable.toSorted(compareMedalStandings)
  const results = data.date === "2026" ? getOlympicsResultsLog(data) : []

  return (
    <section className="flex flex-col gap-5">
      <BapeSectionHeader title={data.date === "2026" ? "Results" : "Medal Table"} />

      <OlympicsMedalTable entries={entries} isUpcoming={!hasResults} />
      {results.length > 0 && (
        <OlympicsEventResultsList events={results} year={data.date} category="All event" teamRosters={getTeamRosters(data)} />
      )}
    </section>
  )
}

function getOlympicsResultsLog(data: OlympicPageData) {
  const calendarOrder = new Map<string, number>()
  let position = 0
  for (const day of data.calendar ?? []) {
    for (const item of day.items) {
      if ("eventId" in item) calendarOrder.set(item.eventId, position++)
    }
  }

  return data.events
    .filter((event) => event.status === "completed")
    .reverse()
    .sort((a, b) =>
      (calendarOrder.get(b.id) ?? Infinity) - (calendarOrder.get(a.id) ?? Infinity),
    )
    .flatMap((event) => expandDivisionResults(event))
    .filter((event) => event.winner || event.gold?.length || event.silver?.length || event.bronze?.length)
    .map((event) => event.gold?.length || !event.winner
      ? event
      : { ...event, gold: [event.winner] },
    )
}

export function OlympicsStandingsPage({ data }: OlympicsEditionPageProps) {
  return <OlympicsMedalTablePage data={data} />
}

export function OlympicsEventsPage({ data }: OlympicsEditionPageProps) {
  const hasResults = hasOlympicsResults(data)
  const completedEvents = data.events.filter(
    (event) => event.status === "completed",
  ).flatMap((event) => expandDivisionResults(event))

  const upcomingEvents = data.events.filter((event) => event.status === "upcoming")

  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title={hasResults ? "Event results" : "Events"}
        />

        {data.events.length > 0 && !hasResults ? (
          <UpcomingEventCategoryList data={data} />
        ) : data.events.length > 0 ? (
          <OlympicsEventResultsList events={completedEvents} year={data.date} category="Event" teamRosters={getTeamRosters(data)} />
        ) : (
          <BapePanel className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              No content yet.
            </p>
          </BapePanel>
        )}
      </section>
      {hasResults && upcomingEvents.length > 0 && (
        <section className="flex flex-col gap-5">
          <BapeSectionHeader title="Upcoming events" />
          <UpcomingEventCategoryList data={data} events={upcomingEvents} />
        </section>
      )}

    </OlympicsPageFrame>
  )
}

export function OlympicsCalendarPage({ data }: OlympicsEditionPageProps) {
  return (
    <OlympicsPageFrame data={data}>
      {data.calendar?.length ? (
        <OlympicsCalendar data={data} />
      ) : (
        <section className="grid gap-5">
          <BapeSectionHeader title="Calendar" />
          <BapePanel className="p-6">
            <p className="text-sm font-medium text-muted-foreground">No content yet.</p>
          </BapePanel>
        </section>
      )}
    </OlympicsPageFrame>
  )
}

function OlympicsCalendar({ data }: OlympicsEditionPageProps) {
  const days = data.calendar ?? []
  const teamRosters = getTeamRosters(data)
  const columns = [days.slice(0, 1), days.slice(1, 2), days.slice(2)].filter(
    (column) => column.length > 0,
  )

  return (
    <section className="grid gap-5" aria-label="Calendar">
      <BapeSectionHeader title="Calendar" />
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column[0].date} className="flex flex-col gap-4">
            {column.map((day) => (
              <BapePanel key={day.date} className="flex flex-col overflow-hidden rounded-2xl border-border/70 shadow-none first:flex-1">
                <div className="flex shrink-0 items-center gap-2.5 border-b border-border/70 bg-muted/25 px-4 py-4">
                  <CalendarDays className="size-4 shrink-0 text-violet-500 dark:text-violet-400" aria-hidden="true" />
                  <h3 className="text-sm font-semibold">
                    <time dateTime={day.date}>{day.label}</time>
                  </h3>
                </div>
                <ol className="flex flex-1 flex-col divide-y divide-border/60 px-4">
                  {day.items.map((item) => {
                    const event = "eventId" in item
                      ? data.events.find((event) => event.id === item.eventId)
                      : undefined
                    const name = "name" in item ? item.name : event?.name
                    const eventNight = event && "eventNightId" in item
                      ? event.nights?.find((night) => night.id === item.eventNightId)
                      : undefined
                    const time = "time" in item ? item.time : eventNight?.scheduledTime ?? event?.scheduledTime
                    const location = ("location" in item ? item.location : undefined) ?? eventNight?.location ?? event?.location
                    const hasMedalGames = Boolean(event && (
                      ["Team Sports", "Athletics"].includes(getEventCategory(event)) ||
                      ["beer-pong", "two-square", "wii-tennis"].includes(event.id)
                    ))

                    return (
                      <li key={"eventId" in item ? `${item.eventId}-${"eventNightId" in item ? item.eventNightId ?? "" : ""}` : item.name} className="flex-1 py-4">
                        {time ? <p className="text-xs font-medium tabular-nums text-muted-foreground">{time}</p> : null}
                        {event ? (
                          <UpcomingOlympicsEvent event={event} hasMedalGames={hasMedalGames} teamRosters={teamRosters} compact />
                        ) : (
                          <p className="mt-1 text-sm font-semibold">{name}</p>
                        )}
                        {location ? <p className="mt-1 text-xs leading-5 text-muted-foreground/80">{location}</p> : null}
                      </li>
                    )
                  })}
                </ol>
              </BapePanel>
            ))}
          </div>
        ))}
      </div>
      <p className="text-sm leading-6 text-muted-foreground">Calendar subject to change.</p>
    </section>
  )
}

export function OlympicsPageFrame({
  data,
  children,
}: OlympicsEditionPageProps & {
  children: ReactNode
}) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <OlympicsEditionHeader
          data={data}
          logo={getOlympicsEditionLogo(data.date)}
          isUpcoming={!hasOlympicsResults(data)}
        />
        <OlympicsSectionNav
          year={data.date}
          isUpcoming={!hasOlympicsResults(data)}
        />
        {children}
      </div>
    </BapePageShell>
  )
}

export function getOlympicsEditionLogo(year: string) {
  if (year === "2026") {
    return {
      light: "https://i.postimg.cc/j5KKMgT0/lavendar.png",
      dark: "https://i.postimg.cc/RFNrsj8m/Lavender-White.png",
      alt: "Bape Olympics 2026 logo",
    }
  }

  if (year === "2023") {
    return {
      light: "https://i.postimg.cc/T16hcGMv/Black-Bape-Olympics2023.png",
      dark: "https://i.postimg.cc/J0LtQmVL/White-Bape-Olympics2023.png",
      alt: "Bape Olympics 2023 logo",
    }
  }

  if (year === "2021") {
    return {
      light:
        "https://i.postimg.cc/Kv1C5TNW/Bape-Olympics-Logo-Rockingham-Black.png",
      dark:
        "https://i.postimg.cc/hPN6ZGZh/Bape-Olympics-Rockingham-White.png",
      alt: "Bape Olympics Rockingham 2021 logo",
    }
  }
}

function UpcomingEventCategoryList({ data, events = data.events }: OlympicsEditionPageProps & { events?: OlympicEvent[] }) {
  const teamRosters = getTeamRosters(data)
  const categories = groupEventsByCategory(events)

  return (
    <div className="grid items-start gap-4 md:grid-cols-2">
      {categories.map((category) => (
        <section key={category.name} className="min-w-0 rounded-2xl border border-border/80 bg-muted/[0.12] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
            <h3 className="text-lg font-semibold tracking-tight">
              {category.name}
            </h3>
          </div>
          <div className="mt-1 grid divide-y divide-border/40">
            {category.events.map((event) => (
              <UpcomingOlympicsEvent
                key={event.id}
                event={event}
                teamRosters={teamRosters}
                hasMedalGames={
                  category.name === "Team Sports" ||
                  event.id === "beer-pong" ||
                  event.id === "two-square" ||
                  event.id === "wii-tennis"
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

type TeamRoster = {
  team: string
  members: string[]
  captain?: string
  entry: OlympicMedalTableEntry
}

function TeamRosterPanel({
  year,
  rosters,
  mvp,
  hasResults,
  horizontalWinner,
}: {
  year: string
  rosters: TeamRoster[]
  mvp?: string
  hasResults: boolean
  horizontalWinner?: string
}) {
  const winner = rosters.find((roster) => roster.team === horizontalWinner)
  const displayedRosters = winner
    ? [winner, ...rosters.filter((roster) => roster !== winner)]
    : rosters
  const pointsLeader = Math.max(...rosters.map((roster) => roster.entry.pts))
  const shouldTintLeader = hasResults && pointsLeader > 0
  const centerLeader = !winner && shouldTintLeader && rosters.length === 4 &&
    rosters.filter((roster) => roster.entry.pts === pointsLeader).length === 1
  const rosterList = (
    <div
      className={cn(
        "grid gap-4",
        hasResults ? "lg:grid-cols-3" : "md:grid-cols-2",
      )}
    >
      {displayedRosters.map((roster) => {
        const isWinner = roster === winner
        const isPointsLeader =
          shouldTintLeader && roster.entry.pts === pointsLeader

        return (
          <div
            key={roster.team}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-muted/[0.12] p-4 transition-colors sm:p-5",
              !hasResults &&
                "border-border/80",
              isPointsLeader &&
                "border-[#b47a00]/40 bg-gradient-to-b from-[#f8c75c]/[0.07] to-card/50",
              isWinner && "col-span-full",
              centerLeader && (isPointsLeader ? "lg:col-start-2 lg:row-start-1" : "lg:row-start-2"),
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
              <div className="min-w-0 flex-1">
                <CountryProfileButton
                  country={roster.team}
                  large={!hasResults}
                  className="rounded-none border-0 bg-transparent px-0 py-0 !shadow-none [&>span:last-child>span:first-child]:text-lg [&>span:last-child>span:first-child]:font-semibold hover:translate-y-0 hover:bg-transparent hover:!shadow-none"
                />
              </div>

              {shouldTintLeader ? (
                <div className="flex shrink-0 items-center gap-3 text-right">
                  <div className="leading-none">
                    <p className={cn("text-2xl font-bold tabular-nums", isPointsLeader && "text-[#8a5b00] dark:text-[#f8c75c]")}>
                      {roster.entry.pts}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      pts
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className={cn(
              "mt-3 grid gap-x-4 gap-y-1",
              !hasResults && "sm:grid-cols-2",
              isWinner && "grid-cols-2 lg:grid-cols-4",
            )}>
              {roster.members.map((member) => (
                <RosterMemberRow
                  year={year}
                  key={member}
                  name={member}
                  team={roster.team}
                  subtitles={getRosterSubtitles(member, roster.captain, mvp)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  if (!hasResults) {
    return (
      <div className="grid gap-5">
      <BapeSectionHeader title="Athletes & Teams" />
        {rosterList}
      </div>
    )
  }

  return (
    <div className="grid gap-5">
      <BapeSectionHeader
        title="Athletes & Teams"
      />

      {rosterList}
    </div>
  )
}

function OlympicsAtAGlance({
  data,
  rosters,
  hasResults,
}: {
  data: OlympicPageData
  rosters: TeamRoster[]
  hasResults: boolean
}) {
  const competitorCount = rosters.reduce(
    (total, roster) => total + roster.members.length,
    0,
  )
  const medalCount = data.medalTable.reduce(
    (total, entry) => total + entry.gold + entry.silver + entry.bronze,
    0,
  )

  return (
    <BapePanel className="overflow-hidden rounded-xl border-border/50 bg-muted/[0.08] shadow-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0 [&>*]:border-border/70 [&>*:nth-child(even)]:border-l [&>*:nth-child(n+3)]:border-t lg:[&>*+*]:border-l lg:[&>*:nth-child(n+3)]:border-t-0">
        <EditionMetric
          icon={<Medal className="size-4" />}
          label="Teams"
          value={rosters.length}
          href={data.date === "2026" ? `/bape/olympics/${data.date}/teams` : undefined}
        />
        <EditionMetric
          icon={<Users className="size-4" />}
          label="Competitors"
          value={competitorCount}
          href={data.date === "2026" ? `/bape/olympics/${data.date}/teams` : undefined}
        />
        <EditionMetric
          icon={<CalendarDays className="size-4" />}
          label="Events"
          value={data.events.length}
          href={`/bape/olympics/${data.date}/events`}
        />
        <EditionMetric
          icon={hasResults ? <Medal className="size-4" /> : <MapPin className="size-4" />}
          label={hasResults ? "Medals" : "Host"}
          value={hasResults ? medalCount : data.host ?? data.location}
          href={hasResults ? `/bape/olympics/${data.date}/medaltable` : undefined}
        />
      </div>
    </BapePanel>
  )
}

function EditionMetric({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  href?: string
}) {
  const content = (
    <div className="flex min-w-0 items-center gap-2.5 px-4 py-3.5 sm:px-5">
      <span className="shrink-0 text-muted-foreground/70">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-semibold leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-xl">{value}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {label}
        </p>
      </div>
      {href ? <ArrowUpRight className="absolute right-3 top-3 size-3 text-muted-foreground/60" /> : null}
    </div>
  )

  if (!href) return <div>{content}</div>

  return (
    <Link href={href} className="relative block transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
      {content}
    </Link>
  )
}

function getRosterSubtitles(member: string, captain?: string, mvp?: string) {
  return [
    ...(member === captain ? [{ label: "Captain" }] : []),
    ...(member === mvp ? [{ label: "MVP", tone: "gold" as const }] : []),
  ]
}

function RosterMemberRow({
  year,
  name,
  team,
  subtitles,
}: {
  year: string
  name: string
  team: string
  subtitles: Array<{
    label: string
    tone?: "default" | "gold"
  }>
}) {
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )
  const teamColor = getOlympicCountry(team)?.color
  const isMvp = subtitles.some((subtitle) => subtitle.label === "MVP")

  if (!profile) {
    return <p className="text-sm font-medium text-foreground">{name}</p>
  }

  return (
    <EntityTrigger
      type="person"
      id={String(profile.bapeID)}
      className={cn(
        "group flex min-h-16 min-w-0 items-center gap-2.5 rounded-lg px-1 py-2 text-left transition hover:bg-muted/40 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isMvp && "bg-yellow-400/[0.055]",
      )}
    >
      <span
        className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-muted ring-1 ring-inset ring-foreground/5"
        style={teamColor ? {
          backgroundColor: teamColor === "#ffffff"
            ? "#e5e5e5"
            : `color-mix(in srgb, ${teamColor} 12%, hsl(var(--muted)))`,
        } : undefined}
      >
        <Image
          src={getBapeProfileAvatar(profile, year)}
          alt={name}
          fill
          sizes="56px"
          unoptimized
          className="origin-top scale-110 object-cover"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block whitespace-normal text-[13px] font-medium leading-snug text-foreground/90 group-hover:underline">
          {name}
        </span>
      {subtitles.length ? (
        <span className="mt-1 flex flex-wrap gap-1">
          {subtitles.map((subtitle) => (
            <span
              key={`${subtitle.label}-${subtitle.tone ?? "default"}`}
              className={cn(
                "text-[10px] font-medium leading-none",
                subtitle.tone === "gold"
                  ? "text-[#8a5b00] dark:text-[#f5c451]"
                  : "text-muted-foreground",
              )}
            >
              {subtitle.label}
            </span>
          ))}
        </span>
      ) : null}
      </span>
    </EntityTrigger>
  )
}

const medalColumns = [
  { key: "gold", label: "Gold", color: "bg-[#f8c75c]" },
  { key: "silver", label: "Silver", color: "bg-[#d9dde1]" },
  { key: "bronze", label: "Bronze", color: "bg-[#d9a66f]" },
] as const

function OlympicsMedalTable({
  entries,
  isUpcoming,
}: {
  entries: OlympicMedalTableEntry[]
  isUpcoming: boolean
}) {
  const headingClass = "h-12 px-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:h-14 sm:px-3 sm:text-sm"
  const scoreHeadingClass = cn(headingClass, "w-9 px-1 text-center sm:w-24 sm:px-2")
  const numberClass = "px-1 py-3 text-center tabular-nums sm:px-2 sm:py-4"

  return (
    <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
      <Table aria-label="Medal standings" className="table-fixed">
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent">
            <TableHead scope="col" aria-label="Rank" className={cn(headingClass, "w-8 text-center sm:w-12")}>#</TableHead>
            <TableHead scope="col" className={headingClass}>Team</TableHead>
            {medalColumns.map(({ key, label, color }) => (
              <TableHead key={key} scope="col" className={scoreHeadingClass}>
                <span className="inline-flex items-center gap-2 align-middle">
                  <span aria-hidden="true" className={cn("size-2.5 rounded-full", color)} />
                  <span className="sr-only sm:not-sr-only">{label}</span>
                </span>
              </TableHead>
            ))}
            <TableHead scope="col" aria-label="Points" className={scoreHeadingClass}>PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow
              key={entry.name}
              className={cn("hover:bg-muted/25", index === 0 && entry.pts > 0 && "bg-[#f8c75c]/[0.08]")}
            >
              <TableCell className={cn(numberClass, "font-semibold text-muted-foreground")}>
                {isUpcoming ? "—" : index + 1}
              </TableCell>
              <TableCell className="px-2 py-3 sm:px-3 sm:py-4">
                <CountryProfileButton
                  country={entry.name}
                  className="rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                />
              </TableCell>
              {medalColumns.map(({ key, color }) => (
                <TableCell key={key} className={numberClass}>
                  <span
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded-full text-xs font-bold text-neutral-950 ring-1 ring-inset ring-black/15 sm:size-9 sm:text-sm",
                      color,
                    )}
                  >
                    {isUpcoming ? "—" : entry[key]}
                  </span>
                </TableCell>
              ))}
              <TableCell className={cn(numberClass, "font-bold")}>
                {isUpcoming ? "—" : entry.pts}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function getOlympicImages(data: OlympicPageData): OlympicImage[] {
  const images = data.images ?? []

  return images.map((image) =>
    typeof image === "string" ? { src: image } : image,
  )
}

function hasOlympicsResults(data: OlympicPageData) {
  return data.medalTable.some(
    (entry) =>
      entry.gold > 0 || entry.silver > 0 || entry.bronze > 0 || entry.pts > 0,
  )
}

function getTeamRosters(data: OlympicPageData): TeamRoster[] {
  const hasResults = hasOlympicsResults(data)

  return data.medalTable
    .map((entry) => {
      const country = getOlympicCountry(entry.name)
      const captain = data.captains?.[entry.name]
      const members = country
        ? BAPE_PROFILES.filter((profile) =>
            profile.country.includes(country.rosterFlag ?? country.flag),
          )
            .map((profile) => `${profile.firstName} ${profile.lastName}`)
            .sort((a, b) => {
              const aRank = getRosterSortRank(a, captain, data.mvp)
              const bRank = getRosterSortRank(b, captain, data.mvp)
              return aRank - bRank || a.localeCompare(b)
            })
        : []

      return {
        team: entry.name,
        entry,
        captain,
        members,
      }
    })
    .sort((a, b) => {
      if (!hasResults) return 0
      return b.entry.pts - a.entry.pts || a.team.localeCompare(b.team)
    })
}

function getRosterSortRank(name: string, captain?: string, mvp?: string) {
  if (name === captain) return 0
  if (name === mvp) return 1
  return 2
}

function groupEventsByCategory(events: OlympicEvent[]) {
  const categories = [
    "Team Sports",
    "Food & Skill",
    "Athletics",
    "Table Games",
    "Video Games",
    "Other Events",
  ]
  const grouped = new Map<string, OlympicEvent[]>(
    categories.map((category) => [category, []]),
  )

  for (const event of events) {
    grouped.get(getEventCategory(event))?.push(event)
  }

  return categories
    .map((name) => ({ name, events: grouped.get(name) ?? [] }))
    .filter((category) => category.events.length > 0)
}

function getEventCategory(event: OlympicEvent) {
  const key = `${event.id} ${event.name}`.toLowerCase()

  if (key.includes("fifa") || key.includes("wii") || key.includes("mario")) {
    return "Video Games"
  }
  if (
    key.includes("basketball") ||
    key.includes("futsal") ||
    key.includes("soccer") ||
    key.includes("cricket") ||
    key.includes("handball") ||
    key.includes("pickleball")
  ) {
    return "Team Sports"
  }
  if (
    key.includes("pool") ||
    key.includes("darts") ||
    key.includes("table") ||
    key.includes("chess")
  ) {
    return "Table Games"
  }
  if (
    key.includes("beer-pong") ||
    key.includes("two-square") ||
    key.includes("sprint")
  ) {
    return "Athletics"
  }

  if (
    key.includes("cooking") ||
    key.includes("trivia") ||
    key.includes("eggs") ||
    key.includes("drink")
  ) {
    return "Food & Skill"
  }

  return "Other Events"
}
