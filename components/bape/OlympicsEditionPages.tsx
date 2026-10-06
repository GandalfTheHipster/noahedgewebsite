import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Medal, Trophy, Users } from "lucide-react"

import {
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEditionHeader } from "@/components/bape/OlympicsEditionHeader"
import { UpcomingOlympicsEvent } from "@/components/bape/UpcomingOlympicsEvent"
import { OlympicsEventCard } from "@/components/bape/OlympicsEventCard"
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
      <section className="grid gap-5">
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
          description={
            data.events.length > 0 && hasResults
              ? `${completedEvents.length} completed events. Every podium, every medalist.`
              : undefined
          }
        />

        {data.events.length > 0 && !hasResults ? (
          <UpcomingEventCategoryList events={data.events} />
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
  const columns = [days.slice(0, 1), days.slice(1, 2), days.slice(2)].filter(
    (column) => column.length > 0,
  )

  return (
    <section className="grid gap-5" aria-label="Calendar">
      <BapeSectionHeader title="Calendar" description="Calendar subject to change." />
      <div className="grid items-start gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column[0].date} className="grid content-start gap-4">
            {column.map((day) => (
              <BapePanel key={day.date} className="overflow-hidden">
                <div className="flex items-center gap-3 border-b bg-muted/20 px-5 py-4">
                  <CalendarDays className="size-5 shrink-0 text-violet-500" aria-hidden="true" />
                  <h2 className="text-base font-semibold">
                    <time dateTime={day.date}>{day.label}</time>
                  </h2>
                </div>
                <ol className="divide-y px-5">
                  {day.items.map((item) => {
                    const event = "eventId" in item
                      ? data.events.find((event) => event.id === item.eventId)
                      : undefined
                    const name = "name" in item ? item.name : event?.name
                    const time = "time" in item ? item.time : event?.scheduledTime
                    const location = ("location" in item ? item.location : undefined) ?? event?.location
                    const hasMedalGames = Boolean(event && (
                      ["Team Sports", "Athletics"].includes(getEventCategory(event)) ||
                      ["beer-pong", "two-square", "wii-baseball"].includes(event.id)
                    ))

                    return (
                      <li key={"eventId" in item ? item.eventId : item.name} className="py-4">
                        {time ? <p className="text-xs font-medium tabular-nums text-muted-foreground">{time}</p> : null}
                        {event ? (
                          <UpcomingOlympicsEvent event={event} hasMedalGames={hasMedalGames} compact />
                        ) : (
                          <p className="mt-1 text-sm font-semibold">{name}</p>
                        )}
                        {location ? <p className="mt-1 text-xs text-muted-foreground">{location}</p> : null}
                      </li>
                    )
                  })}
                </ol>
              </BapePanel>
            ))}
          </div>
        ))}
      </div>
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
    <div className="grid gap-6">
      {categories.map((category) => (
        <section key={category.name} className="grid gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {category.name}
            </h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
              {category.events.length}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-4">
            {category.events.map((event) => (
              <OlympicsEventCard key={event.id} event={event} year={year} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function UpcomingEventCategoryList({ events }: { events: OlympicEvent[] }) {
  const categories = groupEventsByCategory(events)

  return (
    <div className="grid gap-7">
      {categories.map((category) => (
        <section key={category.name} className="grid gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {category.name}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {category.events.map((event) => (
              <UpcomingOlympicsEvent
                key={event.id}
                event={event}
                hasMedalGames={
                  category.name === "Team Sports" ||
                  event.id === "beer-pong" ||
                  event.id === "two-square" ||
                  event.id === "wii-baseball"
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
  rosters,
  mvp,
  hasResults,
}: {
  rosters: TeamRoster[]
  mvp?: string
  hasResults: boolean
}) {
  const pointsLeader = Math.max(...rosters.map((roster) => roster.entry.pts))
  const shouldTintLeader = hasResults && pointsLeader > 0
  const rosterList = (
    <div
      className={cn(
        "grid gap-3",
        hasResults ? "mt-5" : "md:grid-cols-2",
      )}
    >
      {rosters.map((roster) => {
        const isPointsLeader =
          shouldTintLeader && roster.entry.pts === pointsLeader

        return (
          <div
            key={roster.team}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-card/50 p-4 transition-colors",
              !hasResults &&
                "border-border/80",
              isPointsLeader &&
                "border-[#b47a00]/45 bg-[#f8c75c]/[0.055]",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <CountryProfileButton
                  country={roster.team}
                  large
                  className="border-0 bg-transparent px-0 py-0 !shadow-none hover:translate-y-0 hover:bg-transparent hover:!shadow-none"
                />
              </div>

              {shouldTintLeader ? (
                <div className="flex shrink-0 items-center gap-3 text-right">
                  {isPointsLeader ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#b47a00]/25 bg-[#f8c75c]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#8a5b00] dark:text-[#f8c75c]">
                      <Trophy aria-hidden="true" className="size-3" />
                      Winner
                    </span>
                  ) : null}
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

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {roster.members.map((member) => (
                <RosterMemberRow
                  key={member}
                  name={member}
                  subtitles={getRosterSubtitles(member, roster.captain, mvp)}
                  isUpcoming={!hasResults}
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
    <BapePanel className="overflow-hidden shadow-none">
      <div className="grid divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <EditionMetric
          icon={<Medal className="size-4" />}
          label="Teams"
          value={rosters.length}
        />
        <EditionMetric
          icon={<Users className="size-4" />}
          label="Competitors"
          value={competitorCount}
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
    <div className="flex items-center gap-3 px-4 py-4 sm:block sm:px-6">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="sm:mt-3">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
      </div>
      {href ? <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground" /> : null}
    </div>
  )

  if (!href) return <div>{content}</div>

  return (
    <Link href={href} className="relative block hover:bg-muted/30">
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
  name,
  subtitles,
  isUpcoming,
}: {
  name: string
  subtitles: Array<{
    label: string
    tone?: "default" | "gold"
  }>
  isUpcoming: boolean
}) {
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )
  const isCaptain = subtitles.some((subtitle) => subtitle.label === "Captain")
  const isMvp = subtitles.some((subtitle) => subtitle.label === "MVP")

  if (!profile) {
    return <p className="text-sm font-medium text-foreground">{name}</p>
  }

  return (
    <EntityTrigger
      type="person"
      id={String(profile.bapeID)}
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-2.5 text-left transition hover:border-foreground/30 hover:bg-muted/20 hover:no-underline",
        isUpcoming && isCaptain && "md:border-white/35 md:bg-white/[0.025]",
        isUpcoming && isMvp && "md:border-yellow-300/60 md:bg-yellow-300/[0.08]",
        !isUpcoming && isMvp && "border-yellow-400/35 bg-yellow-400/[0.045]",
      )}
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={getBapeProfileAvatar(profile)}
          alt={name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block whitespace-normal text-base font-semibold leading-tight text-foreground group-hover:underline">
          {name}
        </span>
      </span>
      {subtitles.length ? (
        <span className="ml-auto flex shrink-0 flex-wrap justify-end gap-1.5">
          {subtitles.map((subtitle) => (
            <span
              key={`${subtitle.label}-${subtitle.tone ?? "default"}`}
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
                isUpcoming &&
                  (subtitle.label === "Captain" || subtitle.label === "MVP") &&
                  "md:hidden",
                subtitle.tone === "gold"
                  ? "border-yellow-400/40 bg-yellow-400/10 text-[#8a5b00] dark:text-[#f5c451]"
                  : "border-border/70 bg-muted/35 text-muted-foreground",
              )}
            >
              {subtitle.label}
            </span>
          ))}
        </span>
      ) : null}
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
