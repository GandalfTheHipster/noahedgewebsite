"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

import {
  BapeSortableHeader,
  BapeSortableTable,
} from "@/components/bape/BapeSortableTable"
import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import type { AllTimeOlympicChampion } from "@/lib/data/olympics/all-time"
import { cn } from "@/lib/utils"

type AllTimeChampionsListProps = {
  champions: AllTimeOlympicChampion[]
}

export function AllTimeChampionsList({ champions }: AllTimeChampionsListProps) {
  const columns = useMemo<ColumnDef<AllTimeOlympicChampion>[]>(
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
        cell: ({ row }) => <ChampionAthlete champion={row.original} />,
      },
      {
        accessorKey: "championships",
        header: ({ column }) => (
          <BapeSortableHeader label="Titles" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <p className="pr-2 text-right text-2xl font-bold tabular-nums tracking-tight">
            {row.original.championships}
          </p>
        ),
      },
    ],
    [],
  )

  return (
    <>
      <div className="lg:hidden">
        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          {champions.map((champion, index) => (
            <div
              key={champion.id}
              className={cn(
                "grid grid-cols-[2.5rem_minmax(0,1fr)_3.5rem] items-center gap-2.5 border-b px-3.5 py-4 last:border-b-0",
                index === 0 && "bg-[#f8c75c]/[0.07]",
              )}
            >
              <RankBadge rank={index + 1} />
              <ChampionAthlete champion={champion} />
              <p className="text-right text-xl font-bold tabular-nums">
                {champion.championships}
                <span className="sr-only"> titles</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <BapeSortableTable
          data={champions}
          columns={columns}
          initialSort={[{ id: "championships", desc: true }]}
          getRowKey={(champion) => String(champion.id)}
          isHighlighted={(_, index) => index === 0}
          columnWidths={{ rank: "6%", name: "76%", championships: "18%" }}
        />
      </div>
    </>
  )
}

function ChampionAthlete({
  champion,
}: {
  champion: AllTimeOlympicChampion
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      <PersonProfileButton
        bapeID={String(champion.id)}
        labelMode="full"
        nameClassName="text-base sm:text-lg"
        className="max-w-full rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:border-transparent hover:bg-transparent hover:shadow-none"
      />
      {champion.wins.map((win) => (
        <Link
          key={`${champion.id}-${win.year}-${win.country}`}
          href={`/bape/olympics/${win.year}`}
          aria-label={`View ${win.year} Bape Olympics archive for ${win.country}`}
          className="rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-2 py-1 text-xs font-semibold text-foreground/75 transition-colors hover:border-violet-400/35 hover:bg-violet-400/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {win.flag} {win.year}
        </Link>
      ))}
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
