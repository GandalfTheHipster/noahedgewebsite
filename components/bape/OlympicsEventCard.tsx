import Image from "next/image"
import { Medal } from "lucide-react"

import { BapePanel } from "@/components/bape/BapePageChrome"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES, getBapeProfileAvatar } from "@/lib/data/BapeProfiles"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type { OlympicEvent } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

const medals = [
  { key: "gold", label: "Gold", color: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300" },
  { key: "silver", label: "Silver", color: "bg-slate-100 text-slate-600 dark:bg-slate-400/15 dark:text-slate-300" },
  { key: "bronze", label: "Bronze", color: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-300" },
] as const

export function OlympicsEventCard({
  event,
  year,
  isUpcoming = false,
}: {
  event: OlympicEvent
  year: string
  isUpcoming?: boolean
}) {
  return (
    <BapePanel className="overflow-hidden rounded-2xl shadow-none">
      <div className="flex items-center gap-2.5 border-b bg-muted/20 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-4">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-lg border bg-background text-lg sm:size-10 sm:rounded-xl sm:text-xl">
          {event.emoji}
        </span>
        <h3 className="min-w-0 flex-1 text-base font-semibold tracking-tight sm:text-lg">{event.name}</h3>
      </div>
      {!isUpcoming ? (
        <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {medals.map((medal) => (
            <div key={medal.key} className={cn("flex min-w-0 items-center gap-2 px-3 py-1.5 sm:block sm:p-5", medal.key === "gold" && "bg-amber-50/50 dark:bg-amber-400/[0.04]")}>
              <div className="flex shrink-0 items-center gap-2 sm:mb-3">
                <span className={cn("grid size-7 place-items-center rounded-full", medal.color)}>
                  <Medal aria-hidden="true" className="size-4" />
                </span>
                <p className="sr-only text-xs font-semibold uppercase tracking-[0.14em] sm:not-sr-only">{medal.label}</p>
              </div>
              <div className="grid min-w-0 flex-1 grid-cols-2 items-center gap-x-2 gap-y-0.5 [&>*:only-child]:col-span-2 sm:grid-cols-1 sm:gap-1 sm:[&>*:only-child]:col-span-1">
                {event[medal.key]?.length ? getMedalRecipients(event[medal.key]!, year).map((name) => (
                  <Medalist key={name} name={name} year={year} />
                )) : (
                  <p className="py-1 text-sm text-muted-foreground">No result recorded</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </BapePanel>
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
  const flag = profile
    ? year === "2023" ? profile.country[1] ?? profile.country[0] : profile.country[0]
    : undefined

  if (country) {
    return <CountryProfileButton country={name} className="rounded-lg border-0 bg-transparent px-1 py-1 shadow-none hover:translate-y-0 hover:shadow-none" />
  }

  const content = (
    <>
      {profile ? (
        <span className="relative shrink-0">
          <Image
            src={getBapeProfileAvatar(profile, year)}
            alt=""
            width={36}
            height={36}
            className="size-7 rounded-full object-cover sm:size-9"
          />
          {flag ? (
            <span aria-hidden="true" className="absolute -bottom-0.5 -right-1 grid size-4 place-items-center rounded-full bg-background text-[11px] leading-none">
              {flag}
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="min-w-0 break-words text-xs font-medium leading-4 sm:text-sm sm:leading-6">{name}</span>
    </>
  )

  return profile ? (
    <EntityTrigger type="person" id={String(profile.bapeID)} className="flex min-h-11 min-w-0 max-w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left hover:bg-muted/60 sm:gap-3">
      {content}
    </EntityTrigger>
  ) : <div className="flex min-w-0 items-start gap-2 px-1 py-1">{content}</div>
}
