import { AllTimeChampionsList } from "@/components/bape/AllTimeChampionsList"
import { BapeSectionHeader } from "@/components/bape/BapePageChrome"
import { OlympicsStatsFrame } from "@/components/bape/OlympicsStatsFrame"
import { getAllTimeOlympicChampions } from "@/lib/data/olympics/all-time"

const champions = getAllTimeOlympicChampions()

export default function OlympicsTitlesRankingPage() {
  return (
    <OlympicsStatsFrame>
      <section className="grid gap-6">
        <BapeSectionHeader title="Titles Ranking" />

        <AllTimeChampionsList champions={champions} />
      </section>
    </OlympicsStatsFrame>
  )
}
