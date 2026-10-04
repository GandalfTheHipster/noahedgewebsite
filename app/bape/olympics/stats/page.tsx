import { Suspense } from "react"

import { AllTimeLeaderboardTable } from "@/components/bape/AllTimeLeaderboardTable"
import { BapeSectionHeader } from "@/components/bape/BapePageChrome"
import { OlympicsStatsFrame } from "@/components/bape/OlympicsStatsFrame"
import { getAllTimeOlympicAthletes } from "@/lib/data/olympics/all-time"

const athletes = getAllTimeOlympicAthletes()

export default function OlympicsStatsPage() {
  return (
    <OlympicsStatsFrame>
      <section className="grid gap-6">
        <BapeSectionHeader title="Athlete Medal Table" />

        <div className="overflow-x-auto">
          <Suspense fallback={null}>
            <AllTimeLeaderboardTable athletes={athletes} />
          </Suspense>
        </div>
      </section>
    </OlympicsStatsFrame>
  )
}
