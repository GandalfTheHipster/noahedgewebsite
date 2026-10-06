import type { ReactNode } from "react"

import { BapePageShell } from "@/components/bape/BapePageChrome"
import { OlympicsStatsNav } from "@/components/bape/OlympicsStatsNav"

export function OlympicsStatsFrame({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-5 sm:gap-6">
        <header className="flex flex-col gap-5 rounded-[1.5rem] border bg-card p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
              Bape Olympics <span className="px-1 text-muted-foreground">/</span> All-time
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          </div>
          <OlympicsStatsNav />
        </header>
        {children}
      </div>
    </BapePageShell>
  )
}
