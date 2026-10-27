import Image from "next/image"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES, getBapeProfileAvatar } from "@/lib/data/BapeProfiles"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type { OlympicEvent } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

const medals = [
  { key: "gold", label: "Gold", color: "border-[#b47a00]/35 bg-gradient-to-br from-[#edbd55] to-[#d5a23b] text-neutral-950" },
  { key: "silver", label: "Silver", color: "border-black/10 bg-gradient-to-br from-[#d7dbe0] to-[#b8c0c9] text-neutral-950" },
  { key: "bronze", label: "Bronze", color: "border-[#8a4f18]/30 bg-gradient-to-br from-[#d4a875] to-[#b98752] text-neutral-950" },
] as const

export function OlympicsEventResultsList({
  events,
  year,
  category,
}: {
  events: OlympicEvent[]
  year: string
  category: string
}) {
  return (
    <div aria-label={`${category} results, ${year}`} className="grid min-w-0 divide-y divide-border/40 rounded-2xl border border-border/60 bg-background px-3 sm:px-4">
      {events.map((event) => (
        <div key={event.id} className="grid min-w-0 grid-cols-2 items-center gap-2 py-2.5 sm:gap-4">
          <h3 className="flex min-w-0 items-center gap-2 text-xs font-medium leading-snug text-foreground/90 sm:gap-2.5 sm:text-sm">
            <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center text-lg leading-none sm:size-7 sm:text-xl">{event.emoji}</span>
            <span className="min-w-0 [overflow-wrap:anywhere]">{event.name}</span>
          </h3>
          <div className="grid w-full min-w-0 max-w-64 grid-cols-3 items-stretch justify-self-end gap-1.5 sm:gap-2">
          {medals.map((medal) => (
            <div key={medal.key} className={cn("flex min-w-0 flex-col rounded-lg border border-border/60 bg-background", medal.color)}>
              <span className="sr-only">{medal.label}</span>
              <div className="flex flex-1 flex-col justify-center">
              {event[medal.key]?.length ? getMedalRecipients(event[medal.key]!, year).map((name) => (
                <Medalist key={name} name={name} year={year} />
              )) : (
                <span className="flex min-h-10 items-center justify-center text-xs text-muted-foreground" aria-label="No result recorded">—</span>
              )}
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function getMedalRecipients(names: string[], year: string) {
  if (names.length < 2) return names

  const firstProfile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === names[0],
  )
  if (!firstProfile) return names

  const flag = year === "2023"
    ? firstProfile.country[1] ?? firstProfile.country[0]
    : firstProfile.country[0]
  const country = getOlympicCountry(flag)
  if (!country) return names

  const roster = BAPE_PROFILES.filter((profile) => profile.country.includes(flag))
  const recipients = new Set(names)
  const isWholeTeam = roster.length === recipients.size && roster.every(
    (profile) => recipients.has(`${profile.firstName} ${profile.lastName}`),
  )

  return isWholeTeam ? [country.name] : names
}

function Medalist({ name, year }: { name: string; year: string }) {
  const country = getOlympicCountry(name)
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )
  const teamFlag = profile
    ? year === "2023" ? profile.country[1] ?? profile.country[0] : profile.country[0]
    : undefined
  const team = teamFlag ? getOlympicCountry(teamFlag) : undefined
  const className = "flex min-h-11 w-full min-w-0 items-center justify-center rounded-lg bg-transparent p-1 text-center text-[10px] font-medium leading-tight [overflow-wrap:anywhere] hover:bg-transparent hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

  if (country) {
    return (
      <EntityTrigger type="country" id={country.name} className={className}>
        <span aria-hidden="true" className="text-lg leading-none sm:text-xl">{country.flag}</span>
        <span className="sr-only">{country.name}</span>
      </EntityTrigger>
    )
  }

  return profile ? (
    <EntityTrigger type="person" id={String(profile.bapeID)} className={className}>
      <span className="relative shrink-0">
        <Image
          src={getBapeProfileAvatar(profile, year)}
          alt={team ? `${name}, ${team.name}` : name}
          width={36}
          height={36}
          className="size-8 rounded-md object-cover sm:size-9"
        />
        {teamFlag ? (
          <span aria-hidden="true" className="absolute -bottom-0.5 -right-1 text-[10px] leading-none">
            {teamFlag}
          </span>
        ) : null}
      </span>
    </EntityTrigger>
  ) : <span className={className}>{name}</span>
}
