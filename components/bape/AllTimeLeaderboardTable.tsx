"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  BapeSortableHeader,
  BapeSortableTable,
} from "@/components/bape/BapeSortableTable"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import { cn } from "@/lib/utils"

export type AllTimeLeaderboardAthlete = {
  id: number
  name: string
  firstName: string
  teams: string[]
  points: number
  gold: number
  silver: number
  bronze: number
  medals: number
}

type AllTimeLeaderboardTableProps = {
  athletes: AllTimeLeaderboardAthlete[]
}

export function AllTimeLeaderboardTable({
  athletes,
}: AllTimeLeaderboardTableProps) {
  const columns = useMemo<ColumnDef<AllTimeLeaderboardAthlete>[]>(
    () => [
      {
        id: "rank",
        header: "#",
        enableSorting: false,
        cell: ({ row }) => <RankBadge rank={row.index + 1} />,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <BapeSortableHeader label="Athlete" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex min-w-0 items-center gap-2">
            <PersonProfileButton
              bapeID={String(row.original.id)}
              labelMode="full"
              nameClassName="text-base sm:text-lg"
              className="w-fit min-w-0 justify-start rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:border-transparent hover:bg-transparent hover:shadow-none"
            />
            <CountryFlagRow
              athleteId={row.original.id}
              teams={row.original.teams}
            />
          </div>
        ),
      },
      {
        accessorKey: "points",
        header: ({ column }) => (
          <BapeSortableHeader label="PTS" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <StrongNumber
            value={row.original.points}
            className="text-2xl font-bold"
          />
        ),
      },
      {
        accessorKey: "gold",
        header: ({ column }) => (
          <BapeSortableHeader label="Gold" column={column} align="right" />
        ),
        cell: ({ row }) => <MedalCount value={row.original.gold} tone="gold" />,
      },
      {
        accessorKey: "silver",
        header: ({ column }) => (
          <BapeSortableHeader label="Silver" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <MedalCount value={row.original.silver} tone="silver" />
        ),
      },
      {
        accessorKey: "bronze",
        header: ({ column }) => (
          <BapeSortableHeader label="Bronze" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <MedalCount value={row.original.bronze} tone="bronze" />
        ),
      },
    ],
    [],
  )

  return (
    <>
      <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm lg:hidden">
        {athletes.map((athlete, index) => (
          <AthleteMobileCard
            key={athlete.id}
            athlete={athlete}
            rank={index + 1}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        <BapeSortableTable
          data={athletes}
          columns={columns}
          initialSort={[{ id: "points", desc: true }]}
          getRowKey={(athlete) => String(athlete.id)}
          isHighlighted={(_, index) => index === 0}
          columnWidths={{
            rank: "6%",
            name: "46%",
            points: "12%",
            gold: "12%",
            silver: "12%",
            bronze: "12%",
          }}
        />
      </div>
    </>
  )
}

function AthleteMobileCard({
  athlete,
  rank,
}: {
  athlete: AllTimeLeaderboardAthlete
  rank: number
}) {
  const isLeader = rank === 1

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b p-3.5 last:border-b-0 sm:p-4",
        isLeader && "bg-[#f8c75c]/[0.07]",
      )}
    >
      <div className="flex w-full min-w-0 items-center gap-2">
        <RankBadge rank={rank} />

        <div className="min-w-0 flex-1">
          <PersonProfileButton
            bapeID={String(athlete.id)}
            labelMode="full"
            nameClassName="whitespace-normal text-lg font-semibold leading-tight sm:text-xl"
            className="max-w-full min-w-0 justify-start rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:border-transparent hover:bg-transparent hover:shadow-none"
          />
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <CountryFlagRow athleteId={athlete.id} teams={athlete.teams} compact />
          <div className="flex items-center gap-1">
            <MobileMedalCount label="Gold" value={athlete.gold} tone="gold" />
            <MobileMedalCount label="Silver" value={athlete.silver} tone="silver" />
            <MobileMedalCount label="Bronze" value={athlete.bronze} tone="bronze" />
          </div>
          <div className="ml-1 flex items-baseline gap-1 border-l pl-2.5 text-right">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              PTS
            </span>
            <span className="text-lg font-bold tabular-nums">{athlete.points}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
        rank === 1 && "border-[#b47a00]/35 bg-[#f8c75c]/25 text-[#7a5100] dark:text-[#f8c75c]",
        rank === 2 && "border-slate-400/30 bg-slate-300/30 text-slate-700 dark:text-slate-200",
        rank === 3 && "border-[#8a4f18]/30 bg-[#9a5724]/15 text-[#8a3f0f] dark:text-[#dfb582]",
        rank > 3 && "bg-muted/35 text-muted-foreground",
      )}
    >
      {rank}
    </span>
  )
}

function CountryFlagRow({
  athleteId,
  teams,
  compact = false,
}: {
  athleteId: number
  teams: string[]
  compact?: boolean
}) {
  return (
    <div className={cn("flex shrink-0 items-center whitespace-nowrap leading-none opacity-70", compact ? "gap-0 text-sm" : "gap-1 text-base")}>
      {teams.map((team) => (
        <EntityTrigger
          key={`${athleteId}-${team}`}
          type="country"
          id={team}
          aria-label={`View ${getOlympicCountry(team)?.name ?? team} profile`}
          title={getOlympicCountry(team)?.name ?? team}
          className={cn("rounded-sm px-0.5 py-0.5 leading-none hover:bg-transparent hover:underline-offset-2", compact ? "text-sm" : "text-base")}
        >
          {team}
        </EntityTrigger>
      ))}
    </div>
  )
}

function StrongNumber({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "text-right text-lg font-semibold tabular-nums text-foreground",
        className,
      )}
    >
      {value}
    </div>
  )
}

function MedalCount({
  value,
  tone,
}: {
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="flex justify-center">
      <MedalBadge value={value} tone={tone} />
    </div>
  )
}

function MobileMedalCount({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <span role="img" aria-label={`${label}: ${value}`} title={`${label}: ${value}`}>
      <MedalBadge value={value} tone={tone} size="size-7 text-xs" />
    </span>
  )
}

function MedalBadge({
  value,
  tone,
  size = "size-9 text-sm",
}: {
  value: number
  tone: "gold" | "silver" | "bronze"
  size?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold tabular-nums text-neutral-950 ring-1 ring-inset",
        size,
        tone === "gold" && "bg-[#f8c75c] ring-[#b47a00]/35",
        tone === "silver" && "bg-[#e5e7e9] ring-black/10 dark:bg-[#d8dde3]",
        tone === "bronze" && "bg-[#9a5724] text-white ring-[#7a3f16]/40 dark:bg-[#b66a31]",
      )}
    >
      {value}
    </span>
  )
}
