"use client"

import Image from "next/image"
import { History, X } from "lucide-react"
import { Dialog } from "radix-ui"

import { getBapeProfileAvatar, type BapeProfile, type BapePortrait } from "@/lib/data/BapeProfiles"

function PortraitDate({ value }: { value?: string | null }) {
  if (!value) return <>Not recorded</>
  if (/^\d{4}$/.test(value)) return <time dateTime={value}>{value}</time>
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return <>Not recorded</>
  return (
    <time dateTime={value}>
      {new Intl.DateTimeFormat("en-AU", {
        day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
      }).format(date)}
    </time>
  )
}

function PortraitCard({ portrait, current, swappedOutOn, name }: {
  portrait: BapePortrait
  current?: boolean
  swappedOutOn?: string | null
  name: string
}) {
  return (
    <li className="flex min-w-0 gap-3 rounded-xl border bg-muted/10 p-3">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/30 sm:size-24">
        <Image src={portrait.imageUrl} alt={`${current ? "Current" : "Previous"} portrait of ${name}`} fill sizes="96px" className="object-contain" />
      </div>
      <div className="min-w-0 py-0.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="text-sm font-semibold">{current ? "Current" : "Previous"}</h3>
          {portrait.isAiGenerated !== undefined && (
            <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-medium leading-none ${portrait.isAiGenerated ? "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300" : "bg-muted text-muted-foreground"}`}>
              {portrait.isAiGenerated ? "AI generated" : "Non-AI"}
            </span>
          )}
        </div>
        <dl className="mt-2 space-y-1 text-xs">
          <div><dt className="inline text-muted-foreground">Added </dt><dd className="inline"><PortraitDate value={portrait.addedOn} /></dd></div>
          {!current && <div><dt className="inline text-muted-foreground">Swapped out </dt><dd className="inline"><PortraitDate value={swappedOutOn} /></dd></div>}
        </dl>
      </div>
    </li>
  )
}

export function PersonPortraitHistory({ profile }: { profile: BapeProfile }) {
  const name = `${profile.firstName} ${profile.lastName}`
  const history = profile.portraitHistory ?? []
  const current = {
    imageUrl: getBapeProfileAvatar(profile),
    addedOn: profile.avatarAddedOn,
    isAiGenerated: profile.avatarIsAiGenerated,
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" aria-label={`View portrait history for ${name}`} title="View portrait history" className="group relative shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Image src={current.imageUrl} alt={name} width={88} height={88} className="h-16 w-16 rounded-xl border object-cover transition group-hover:brightness-90" />
          <span className="absolute -bottom-1 -right-1 rounded-full border bg-background p-1"><History aria-hidden="true" className="size-3" /></span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] max-h-[86dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-4 shadow-2xl focus:outline-none sm:p-5">
          <Dialog.Title className="pr-10 text-lg font-bold">Portrait history</Dialog.Title>
          <Dialog.Close asChild>
            <button type="button" aria-label="Close portrait history" className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X aria-hidden="true" className="size-5" /></button>
          </Dialog.Close>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            <PortraitCard portrait={current} current name={name} />
            {history.map((portrait, index) => <PortraitCard key={`${portrait.imageUrl}-${index}`} portrait={portrait} swappedOutOn={portrait.swappedOutOn} name={name} />)}
          </ol>
          {history.length === 0 && <p className="mt-3 text-xs text-muted-foreground">No previous portraits.</p>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
