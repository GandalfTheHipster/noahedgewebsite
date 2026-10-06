import { AllTimeChampionsList } from "@/components/bape/AllTimeChampionsList"
import { OlympicsStatsFrame } from "@/components/bape/OlympicsStatsFrame"
import { getAllTimeOlympicChampions } from "@/lib/data/olympics/all-time"

const champions = getAllTimeOlympicChampions()

export default function OlympicsTitlesRankingPage() {
  return (
    <OlympicsStatsFrame title="Titles ranking">
      <section>
        <AllTimeChampionsList champions={champions} />
      </section>
    </OlympicsStatsFrame>
  )
}
