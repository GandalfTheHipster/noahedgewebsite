import { Suspense } from "react"

import { AllTimeLeaderboardTable } from "@/components/bape/AllTimeLeaderboardTable"
import { OlympicsStatsFrame } from "@/components/bape/OlympicsStatsFrame"
import { getAllTimeOlympicAthletes } from "@/lib/data/olympics/all-time"

const athletes = getAllTimeOlympicAthletes()

export default function OlympicsStatsPage() {
  return (
    <OlympicsStatsFrame title="Medal table">
      <section>
        <div className="overflow-x-auto">
          <Suspense fallback={null}>
            <AllTimeLeaderboardTable athletes={athletes} />
          </Suspense>
        </div>
      </section>
    </OlympicsStatsFrame>
  )
}
