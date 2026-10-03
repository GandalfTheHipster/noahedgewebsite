import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import {
  BEERPONG_2025_26_ARCHIVE,
  BEERPONG_2025_26_PLAYOFFS,
  type BeerPongPlayoffMatch,
} from "@/lib/data/beerpong/playoffs"
import { cn } from "@/lib/utils"

const teamByCode = Object.fromEntries(
  BEERPONG_TEAMS.map((team) => [team.code, team]),
)

function PlayoffTeamRow({
  code,
  score,
  winner,
  champion,
}: {
  code: string
  score: number
  winner: boolean
  champion?: boolean
}) {
  const team = teamByCode[code]

  if (!team) return null

  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-2.5 py-2",
        champion
          ? "border-[#9b7a35]/60 bg-[#9b7a35]/25 text-foreground"
          : winner
          ? "border-foreground/30 bg-muted text-foreground"
          : "bg-background text-foreground",
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="min-w-0">
          <TeamProfileButton
            code={code}
            compact
            showMeta={false}
            labelMode="full"
            className={cn(
              "w-full text-sm",
              champion
                ? "text-foreground [&_span]:text-foreground"
                : winner && "text-foreground [&_span]:text-foreground",
            )}
          />
        </div>
      </div>
      <span className="text-xl font-bold tabular-nums">{score}</span>
    </div>
  )
}

function MatchCard({ match }: { match: BeerPongPlayoffMatch }) {
  const isFinal = match.round === "grand-final"

  return (
    <article
      className={cn(
        "rounded-2xl border bg-card p-3 shadow-sm",
        isFinal && "border-[#9b7a35]/65 bg-[#9b7a35]/10",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {match.label}
        </p>
        <span
          className={cn(
            "rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
            isFinal && "border-[#9b7a35]/60 bg-[#9b7a35]/15 text-[#6e5525] dark:text-[#d7bd7d]",
          )}
        >
          Final
        </span>
      </div>
      <div className="grid gap-2">
        <PlayoffTeamRow
          code={match.teamA}
          score={match.scoreA}
          winner={match.winner === match.teamA}
          champion={isFinal && match.winner === match.teamA}
        />
        <PlayoffTeamRow
          code={match.teamB}
          score={match.scoreB}
          winner={match.winner === match.teamB}
          champion={isFinal && match.winner === match.teamB}
        />
      </div>
    </article>
  )
}

function RoundColumn({
  title,
  matches,
  className,
}: {
  title: string
  matches: BeerPongPlayoffMatch[]
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="grid gap-3">{matches.map((match) => <MatchCard key={match.id} match={match} />)}</div>
    </div>
  )
}

export function BeerPongPlayoffBracket() {
  const quarterFinals = BEERPONG_2025_26_PLAYOFFS.filter(
    (match) => match.round === "quarter-final",
  )
  const semiFinals = BEERPONG_2025_26_PLAYOFFS.filter(
    (match) => match.round === "semi-final",
  )
  const grandFinal = BEERPONG_2025_26_PLAYOFFS.filter(
    (match) => match.round === "grand-final",
  )
  const champion = BEERPONG_2025_26_ARCHIVE.champion

  return (
    <section className="overflow-hidden rounded-[1.5rem] border bg-card p-4 shadow-sm sm:p-5">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr] xl:items-start">
        <RoundColumn title="Quarter Finals" matches={quarterFinals} />
        <RoundColumn title="Semi Finals" matches={semiFinals} />
        <div className="flex min-w-0 flex-col gap-4 xl:pt-[4.25rem]">
          <RoundColumn title="Grand Final" matches={grandFinal} />
          <div className="rounded-2xl border border-[#9b7a35]/60 bg-[#9b7a35]/15 p-4 text-foreground shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e5525] dark:text-[#d7bd7d]">
              2026 champions
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Image
                src={champion.logo}
                alt={champion.name}
                width={52}
                height={52}
                className="size-12 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">{champion.name}</p>
                <p className="text-sm text-muted-foreground">1–0 Grand Final win</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
