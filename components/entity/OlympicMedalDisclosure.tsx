import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"

export function OlympicMedalDisclosure({
  year,
  gold,
  silver,
  bronze,
  children,
}: {
  year: string
  gold: number
  silver: number
  bronze: number
  children?: ReactNode
}) {
  const counts = (
    <>
      <StatTile label="Gold" value={gold} tone="gold" />
      <span className="border-l">
        <StatTile label="Silver" value={silver} tone="silver" />
      </span>
      <span className="border-l">
        <StatTile label="Bronze" value={bronze} tone="bronze" />
      </span>
    </>
  )

  if (!children) {
    return <div className="mt-3 grid min-h-10 grid-cols-3 items-center rounded-lg bg-muted/30 text-center">{counts}</div>
  }

  return (
    <details className="group/medals mt-3">
      <summary
        aria-label={`${year} Olympic medals. Gold ${gold}, silver ${silver}, bronze ${bronze}`}
        className="grid min-h-10 cursor-pointer list-none grid-cols-[repeat(3,minmax(0,1fr))_auto] items-center rounded-lg bg-muted/30 text-center transition hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
      >
        {counts}
        <ChevronDown
          aria-hidden="true"
          className="mx-2 size-4 text-muted-foreground transition-transform group-open/medals:rotate-180"
        />
      </summary>
      {children}
    </details>
  )
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string | number
  tone?: "gold" | "silver" | "bronze"
}) {
  return (
    <span className="flex items-baseline justify-center gap-1.5 px-1.5 py-1.5">
      <span
        className={[
          "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
          tone === "gold" ? "text-[#9a6500] dark:text-[#f8c75c]" : "",
          tone === "silver" ? "text-slate-600 dark:text-[#d8dde3]" : "",
          tone === "bronze" ? "text-[#8a4f18] dark:text-[#dfb582]" : "",
        ].join(" ")}
      >
        {label}
      </span>
      <span className="text-base font-bold tabular-nums">{value}</span>
    </span>
  )
}
