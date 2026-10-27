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
import { getOlympicCountry } from "@/lib/data/olympics/countries"
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

  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="grid gap-10 sm:gap-12">
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


        <TeamRosterPanel
          year={data.date}
          rosters={teamRosters}
          mvp={data.mvp}
          hasResults={hasResults}
        />

        {data.calendar?.length ? <OlympicsCalendar data={data} /> : null}

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
  const hasResults = hasOlympicsResults(data)

  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title="Medal Table"
          description={
            hasResults
              ? "Ranked by points, then medal count. Gold, silver, and bronze decide bragging rights."
              : undefined
          }
        />

        <BapePanel className="overflow-hidden">
          <div className="border-b bg-muted/20 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {data.date} MEDAL TABLE
            </p>
          </div>
          <OlympicsMedalTable
            entries={data.medalTable}
            isUpcoming={!hasResults}
          />
        </BapePanel>
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsStandingsPage({ data }: OlympicsEditionPageProps) {
  return <OlympicsMedalTablePage data={data} />
}

export function OlympicsEventsPage({ data }: OlympicsEditionPageProps) {
  const hasResults = hasOlympicsResults(data)
  const completedEvents = data.events.filter(
    (event) => event.status === "completed",
  )

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
          <EventCategoryList events={completedEvents} year={data.date} />
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
      <div className="grid items-start gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column[0].date} className="grid content-start gap-4">
            {column.map((day) => (
              <BapePanel key={day.date} className="overflow-hidden rounded-2xl border-border/70 shadow-none">
                <div className="flex shrink-0 items-center gap-2.5 border-b border-border/70 bg-muted/25 px-4 py-4">
                  <CalendarDays className="size-4 shrink-0 text-violet-500 dark:text-violet-400" aria-hidden="true" />
                  <h3 className="text-sm font-semibold">
                    <time dateTime={day.date}>{day.label}</time>
                  </h3>
                </div>
                <ol className="divide-y divide-border/60 px-4">
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
                      <li key={"eventId" in item ? `${item.eventId}-${"eventNightId" in item ? item.eventNightId ?? "" : ""}` : item.name} className="py-4">
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

function EventCategoryList({
  events,
  year,
}: {
  events: OlympicEvent[]
  year: string
}) {
  const categories = groupEventsByCategory(events)

  return (
    <div className="grid gap-6 sm:gap-7">
      {categories.map((category) => (
        <section key={category.name} className="grid gap-3">
          <div className="px-1">
            <h2 className="text-sm font-semibold tracking-tight text-foreground/90 sm:text-base">
              {category.name}
            </h2>
          </div>
          <OlympicsEventResultsList events={category.events} year={year} category={category.name} />
        </section>
      ))}
    </div>
  )
}

function UpcomingEventCategoryList({ data }: OlympicsEditionPageProps) {
  const teamRosters = getTeamRosters(data)
  const events = data.events
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
}: {
  year: string
  rosters: TeamRoster[]
  mvp?: string
  hasResults: boolean
}) {
  const pointsLeader = Math.max(...rosters.map((roster) => roster.entry.pts))
  const shouldTintLeader = hasResults && pointsLeader > 0
  const rosterList = (
    <div
      className={cn(
        "grid gap-4",
        hasResults ? "lg:grid-cols-3" : "md:grid-cols-2",
      )}
    >
      {rosters.map((roster) => {
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

            <div className={cn("mt-3 grid gap-x-4 gap-y-1", !hasResults && "sm:grid-cols-2")}>
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

function OlympicsMedalTable({
  entries,
  isUpcoming,
}: {
  entries: OlympicMedalTableEntry[]
  isUpcoming: boolean
}) {
  return (
    <>
      <div className="grid gap-3 p-3 md:hidden">
        {entries.map((entry, index) => (
          <MedalTableMobileCard
            key={entry.name}
            entry={entry}
            rank={index + 1}
            isUpcoming={isUpcoming}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-background">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16 px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Rank
              </TableHead>
              <TableHead className="min-w-[280px] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Team
              </TableHead>
              <MedalHead label="Gold" />
              <MedalHead label="Silver" />
              <MedalHead label="Bronze" />
              <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Total
              </TableHead>
              <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                PTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow
                key={entry.name}
                className={cn(
                  "group border-border/80 hover:bg-muted/25",
                  isUpcoming && "hover:bg-muted/40",
                  entry.pts > 0 &&
                    index === 0 &&
                    "bg-amber-50/60 hover:bg-amber-50/80 dark:bg-amber-950/15 dark:hover:bg-amber-950/25",
                )}
              >
                <TableCell className="px-4 py-5 text-center text-sm font-semibold text-muted-foreground">
                  {isUpcoming ? "—" : index + 1}
                </TableCell>
                <TableCell className="px-4 py-5">
                  <CountryProfileButton
                    country={entry.name}
                    className="border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                  />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.gold} tone="gold" isUpcoming={isUpcoming} />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.silver} tone="silver" isUpcoming={isUpcoming} />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.bronze} tone="bronze" isUpcoming={isUpcoming} />
                </TableCell>
                <TableCell className="px-4 py-5 text-right text-base font-semibold">
                  {isUpcoming ? "—" : getMedalTotal(entry)}
                </TableCell>
                <TableCell className="px-4 py-5 text-right text-sm font-semibold text-muted-foreground">
                  {isUpcoming ? "—" : entry.pts}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function MedalTableMobileCard({
  entry,
  rank,
  isUpcoming,
}: {
  entry: OlympicMedalTableEntry
  rank: number
  isUpcoming: boolean
}) {
  const isLeader = !isUpcoming && rank === 1 && entry.pts > 0

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-none",
        isLeader && "bg-amber-50/60 dark:bg-amber-950/15",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
            isLeader
              ? "border-foreground bg-foreground text-background"
              : "bg-muted/35 text-muted-foreground",
          )}
        >
          {isUpcoming ? "—" : rank}
        </span>

        <div className="min-w-0 flex-1">
          <CountryProfileButton
            country={entry.name}
            className="border-transparent bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
          />
        </div>

        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            PTS
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {isUpcoming ? "—" : entry.pts}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MobileMedalStat label="Gold" value={entry.gold} tone="gold" isUpcoming={isUpcoming} />
        <MobileMedalStat label="Silver" value={entry.silver} tone="silver" isUpcoming={isUpcoming} />
        <MobileMedalStat label="Bronze" value={entry.bronze} tone="bronze" isUpcoming={isUpcoming} />
      </div>
    </div>
  )
}

function MedalHead({ label }: { label: string }) {
  return (
    <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="inline-flex items-center justify-end gap-2">
        <span
          className={cn(
            "size-2.5 rounded-full",
            label === "Gold" && "bg-[#f8c75c]",
            label === "Silver" && "bg-[#d9dde1]",
            label === "Bronze" && "bg-[#d9a66f]",
          )}
        />
        {label}
      </span>
    </TableHead>
  )
}

function MedalCount({
  value,
  tone,
  isUpcoming = false,
}: {
  value: number
  tone: "gold" | "silver" | "bronze"
  isUpcoming?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-base font-bold text-neutral-950 ring-1 ring-inset",
        tone === "gold" && "bg-[#f8c75c] ring-[#b47a00]/35",
        tone === "silver" && "bg-[#e5e7e9] ring-black/10 dark:bg-[#d8dde3]",
        tone === "bronze" && "bg-[#dfb582] ring-[#8a4f18]/30",
      )}
    >
      {isUpcoming ? "—" : value}
    </span>
  )
}

function MobileMedalStat({
  label,
  value,
  tone,
  isUpcoming,
}: {
  label: string
  value: number
  tone: "gold" | "silver" | "bronze"
  isUpcoming: boolean
}) {
  return (
    <div className="rounded-xl border bg-background p-3">
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
          tone === "gold" && "text-[#9a6500] dark:text-[#f8c75c]",
          tone === "silver" && "text-slate-600 dark:text-[#d8dde3]",
          tone === "bronze" && "text-[#9a5724] dark:text-[#d98a4b]",
        )}
      >
        {label}
      </p>
      <div className="mt-2 flex justify-center">
        <MedalCount value={value} tone={tone} isUpcoming={isUpcoming} />
      </div>
    </div>
  )
}

function getMedalTotal(entry: OlympicMedalTableEntry) {
  return entry.gold + entry.silver + entry.bronze
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
