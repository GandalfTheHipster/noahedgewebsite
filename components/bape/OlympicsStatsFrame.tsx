import type { ReactNode } from "react"

import { BapeHero, BapePageShell } from "@/components/bape/BapePageChrome"
import { OlympicsStatsNav } from "@/components/bape/OlympicsStatsNav"

export function OlympicsStatsFrame({ children }: { children: ReactNode }) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero title="Bape Olympics Stats" variant="wordmark" />

        <OlympicsStatsNav />

        {children}
      </div>
    </BapePageShell>
  )
}
