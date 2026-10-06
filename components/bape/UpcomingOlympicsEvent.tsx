"use client"

import Image from "next/image"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES, getBapeProfileAvatar } from "@/lib/data/BapeProfiles"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type { OlympicEvent } from "@/lib/data/olympics/olympics-template"

export function UpcomingOlympicsEvent({
  event,
  hasMedalGames,
  compact = false,
}: {
  event: OlympicEvent
  hasMedalGames: boolean
  compact?: boolean
}) {
  const order = event.battingOrder ?? event.playingOrder
  const orderLabel = event.battingOrder ? "Batting order" : "Playing order"
  const scoreLabel = event.battingOrder ? "Runs" : "Points"
  const results = event.battingOrder ? event.runs : event.points

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          id={`event-${event.id}`}
          className={compact
            ? "mt-1 inline-flex min-h-8 items-center gap-1.5 rounded-md text-left text-sm font-semibold text-foreground underline-offset-4 hover:text-violet-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            : "flex min-h-16 items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}
        >
          <span aria-hidden="true" className={compact ? "shrink-0 text-base leading-none" : "shrink-0 text-2xl leading-none"}>{event.emoji}</span>
          <span className={compact ? "" : "text-sm font-semibold"}>{event.name}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 max-h-[86dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-6 shadow-2xl focus:outline-none"
        >
          <div className="flex items-center gap-3 pr-10">
            <span aria-hidden="true" className="text-3xl leading-none">{event.emoji}</span>
            <Dialog.Title className="text-xl font-semibold">{event.name}</Dialog.Title>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close event"
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" />
            </button>
          </Dialog.Close>
          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl border bg-muted/20 p-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Date</dt>
              <dd className="mt-1 text-sm font-semibold">{event.scheduledDate || "To be confirmed"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Time</dt>
              <dd className="mt-1 text-sm font-semibold">{event.scheduledTime || "To be confirmed"}</dd>
            </div>
            {event.location ? (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs font-medium text-muted-foreground">Location</dt>
                <dd className="mt-1 text-sm font-semibold">{event.location}</dd>
              </div>
            ) : null}
          </dl>
          {event.id === "cooking" ? (
            <div className="mt-6 grid gap-6">
              <section className="grid gap-3" aria-label="Chosen dishes">
                <h3 className="text-sm font-semibold">Chosen dishes</h3>
                <ul className="grid gap-2">
                  {Object.entries(event.chosenDishes ?? {}).map(([country, dish]) => (
                    <li key={country} className="flex items-center gap-3 rounded-xl border bg-muted/20 px-4 py-2">
                      <MatchTeam country={country} align="left" />
                      <span className="text-right text-sm text-muted-foreground">{dish ?? "Undecided"}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <EventPodium />
            </div>
          ) : event.id === "mario-kart" ? (
            <div className="mt-6 grid gap-6">
              <section className="grid gap-3" aria-label="Mario Kart points">
                <h3 className="text-sm font-semibold">Points</h3>
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Mario Kart team points</caption>
                    <thead className="bg-muted/40 text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left font-medium">Country</th>
                        <th scope="col" className="px-4 py-3 text-right font-medium">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(event.points ?? {}).map(([country, points]) => (
                        <tr key={country} className="border-t">
                          <th scope="row" className="px-4 py-2"><MatchTeam country={country} align="left" /></th>
                          <td className="px-4 py-2 text-right font-semibold tabular-nums">
                            {points ?? <><span aria-hidden="true">—</span><span className="sr-only">Not recorded</span></>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <EventPodium />
            </div>
          ) : event.provisionalTopTen?.length ? (
            <DrinkingTopTen players={event.provisionalTopTen} />
          ) : event.masterminds ? (
            <TriviaDetails event={event} />
          ) : event.runners?.length ? (
            <SprintRunners runners={event.runners} />
          ) : order?.length ? (
            <section className="mt-6 grid gap-3" aria-label={orderLabel}>
              <div className="flex items-center justify-between px-4">
                <h3 className="text-sm font-semibold">{orderLabel}</h3>
                <span className="w-14 text-center text-xs font-medium text-muted-foreground">{scoreLabel}</span>
              </div>
              <ol className="grid gap-3">
                {order.map((country, index) => (
                  <li key={country} className="flex items-center gap-3 rounded-xl border bg-muted/20 px-4 py-3">
                    <span aria-hidden="true" className="w-6 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{index + 1}</span>
                    <MatchTeam country={country} align="left" />
                    <span
                      aria-label={`${country} ${scoreLabel.toLowerCase()}: ${results?.[country] ?? "not recorded"}`}
                      className="flex min-h-10 w-14 shrink-0 items-center justify-center rounded-md border bg-background text-sm font-semibold tabular-nums"
                    >
                      {results?.[country] ?? <span aria-hidden="true">—</span>}
                    </span>
                  </li>
                ))}
              </ol>
              <ScoreMedals order={order} results={results} scoreLabel={scoreLabel} />
            </section>
          ) : hasMedalGames ? (
            <div className="mt-6 grid gap-5">
              <section className="grid gap-3" aria-label="Opening matches">
                <h3 className="text-sm font-semibold">Opening matches</h3>
                {event.openingMatches?.length ? (
                  event.openingMatches.map((teams, index) => (
                    <GameSlot key={index} label={`Match ${index + 1}`} teams={teams} />
                  ))
                ) : (
                  <>
                    <GameSlot label="Match 1" />
                    <GameSlot label="Match 2" />
                  </>
                )}
              </section>
              <section className="grid gap-3" aria-label="Gold medal game">
                <h3 className="text-sm font-semibold"><span aria-hidden="true">🥇 </span>Gold medal game</h3>
                <GameSlot label="Gold medal game" />
              </section>
              <section className="grid gap-3" aria-label="Bronze medal game">
                <h3 className="text-sm font-semibold"><span aria-hidden="true">🥉 </span>Bronze medal game</h3>
                <GameSlot label="Bronze medal game" />
              </section>
            </div>
          ) : (
            <div className="mt-6 grid gap-3" role="list" aria-label="Games to be scheduled">
              {[1, 2].map((game) => (
                <div key={game} role="listitem" className="h-20 rounded-xl border border-dashed bg-muted/20">
                  <span className="sr-only">Game {game}, to be scheduled</span>
                </div>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function DrinkingTopTen({ players }: { players: string[] }) {
  return (
    <section className="mt-6 grid gap-3" aria-label="Drinking top ten">
      <h3 className="text-sm font-semibold">Top ten</h3>
      <p className="text-xs text-muted-foreground">Placeholder rankings — results to be confirmed.</p>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <caption className="sr-only">Provisional drinking top ten players</caption>
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th scope="col" className="w-16 px-4 py-3 text-center font-medium">Rank</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Player</th>
            </tr>
          </thead>
          <tbody>
            {players.slice(0, 10).map((name, index) => {
              const profile = BAPE_PROFILES.find((person) => `${person.firstName} ${person.lastName}` === name)
              return (
                <tr key={name} className="border-t">
                  <td className="px-4 py-2 text-center font-semibold tabular-nums">{index + 1}</td>
                  <th scope="row" className="px-4 py-2 text-left font-semibold">
                    {profile ? (
                      <EntityTrigger type="person" id={String(profile.bapeID)} className="flex min-h-10 w-full items-center gap-3 text-sm font-semibold">
                        <Image src={getBapeProfileAvatar(profile)} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover" />
                        <span>{name}</span>
                      </EntityTrigger>
                    ) : name}
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TriviaDetails({ event }: { event: OlympicEvent }) {
  const teams = Object.entries(event.masterminds ?? {})

  return (
    <div className="mt-6 grid gap-6">
      <section className="grid gap-3" aria-label="Mastermind chosen">
        <h3 className="text-sm font-semibold">Mastermind chosen</h3>
        <ul className="grid gap-2">
          {teams.map(([country, mastermind]) => (
            <li key={country} className="flex items-center gap-3 rounded-xl border bg-muted/20 px-4 py-2">
              <MatchTeam country={country} align="left" />
              <span className="shrink-0 text-sm text-muted-foreground">{mastermind ?? "Undecided"}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-3" aria-label="Trivia points">
        <h3 className="text-sm font-semibold">Points</h3>
        <ul className="grid gap-2">
          {teams.map(([country]) => (
            <li key={country} className="flex items-center gap-3 rounded-xl border bg-muted/20 px-4 py-2">
              <MatchTeam country={country} align="left" />
              <span
                aria-label={`${country} points: ${event.points?.[country] ?? "not recorded"}`}
                className="flex min-h-10 w-14 shrink-0 items-center justify-center rounded-md border bg-background text-sm font-semibold tabular-nums"
              >
                {event.points?.[country] ?? <span aria-hidden="true">—</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function SprintRunners({ runners }: { runners: string[] }) {
  return (
    <div className="mt-6 grid gap-6">
      <section className="grid gap-3" aria-label="Current confirmed runners">
        <h3 className="text-sm font-semibold">Current confirmed runners</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {runners.map((name) => {
            const profile = BAPE_PROFILES.find((person) => `${person.firstName} ${person.lastName}` === name)
            return (
              <li key={name} className="rounded-xl border bg-muted/20 px-4 py-2">
                {profile ? (
                  <EntityTrigger type="person" id={String(profile.bapeID)} className="flex min-h-10 w-full items-center gap-3 text-sm font-semibold">
                    <Image
                      src={getBapeProfileAvatar(profile)}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <span>{name}</span>
                  </EntityTrigger>
                ) : <span className="flex min-h-10 items-center text-sm font-semibold">{name}</span>}
              </li>
            )
          })}
        </ul>
      </section>
      <EventPodium />
    </div>
  )
}

function EventPodium() {
  return (
      <section className="grid gap-3" aria-label="Podium">
        <h3 className="text-sm font-semibold">Podium</h3>
        <div className="grid grid-cols-3 items-end gap-2">
          {[
            { label: "Silver", emoji: "🥈", height: "h-24", tone: "bg-slate-400/10 border-slate-400/30" },
            { label: "Gold", emoji: "🥇", height: "h-32", tone: "bg-yellow-400/10 border-yellow-400/30" },
            { label: "Bronze", emoji: "🥉", height: "h-20", tone: "bg-orange-400/10 border-orange-400/30" },
          ].map(({ label, emoji, height, tone }) => (
            <div key={label} className="grid gap-3 text-center">
              <span className="text-xs text-muted-foreground">To be confirmed</span>
              <div className={`flex flex-col items-center justify-center gap-2 rounded-t-xl border ${height} ${tone}`}>
                <span aria-hidden="true" className="text-2xl">{emoji}</span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

function ScoreMedals({ order, results, scoreLabel }: {
  order: string[]
  results?: Record<string, number | null>
  scoreLabel: string
}) {
  const scores = order.map((country) => ({
    country,
    score: results?.[country],
  }))
  const complete = scores.length >= 3 && scores.every(({ score }) =>
    typeof score === "number" && Number.isInteger(score) && score >= 0,
  )
  const ranked = [...scores].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  const tied = complete && ranked.some((score, index) =>
    index > 0 && score.score === ranked[index - 1].score,
  )

  return (
    <section className="mt-2 grid gap-3" aria-label="Medal standings">
      <h3 className="text-sm font-semibold">Medals</h3>
      <p className="text-xs text-muted-foreground">
        {tied
          ? `${scoreLabel} are tied. Medal places await a tiebreak result.`
          : `Most ${scoreLabel.toLowerCase()} wins gold, followed by silver and bronze. Medals are confirmed once all ${scoreLabel.toLowerCase()} are recorded.`}
      </p>
      {["🥇 Gold", "🥈 Silver", "🥉 Bronze"].map((medal, index) => (
        <div key={medal} className="flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2">
          <span className="shrink-0 text-sm font-medium">{medal}</span>
          {complete && !tied ? (
            <MatchTeam country={ranked[index].country} />
          ) : (
            <span className="ml-auto text-xs text-muted-foreground">To be confirmed</span>
          )}
        </div>
      ))}
    </section>
  )
}

function GameSlot({ label, teams }: { label: string; teams?: [string, string] }) {
  return (
    <div className="grid min-h-20 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-dashed bg-muted/20 px-4 py-3" role="group" aria-label={label}>
      {!teams ? <span className="sr-only">{label}: teams to be confirmed</span> : null}
      <MatchTeam country={teams?.[0]} />
      <span aria-hidden={teams ? undefined : true} className="text-xs font-medium text-muted-foreground">vs</span>
      <MatchTeam country={teams?.[1]} />
    </div>
  )
}

function MatchTeam({ country, align = "center" }: { country?: string; align?: "left" | "center" }) {
  const team = country ? getOlympicCountry(country) : undefined

  return country ? (
    <EntityTrigger
      type="country"
      id={team?.name ?? country}
      className={`flex min-h-10 min-w-0 w-full items-center gap-2 py-1 text-sm font-semibold ${align === "left" ? "justify-start text-left" : "justify-center text-center"}`}
    >
      {team?.flag ? <span aria-hidden="true" className="shrink-0 text-lg">{team.flag}</span> : null}
      <span className="min-w-0 break-words">{team?.name ?? country}</span>
    </EntityTrigger>
  ) : (
    <span aria-hidden="true" className="min-h-8 min-w-0 flex-1 rounded-md border bg-background" />
  )
}
