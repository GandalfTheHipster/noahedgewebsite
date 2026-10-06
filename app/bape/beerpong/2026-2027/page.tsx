import { Sparkles } from "lucide-react"
import { BapePageShell, BapePanel } from "@/components/bape/BapePageChrome"
import { BeerPongPageHeader } from "@/components/bape/BeerPongPageHeader"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { BEERPONG_2026_27_CLUBS } from "@/lib/data/beerpong/playoffs"

export default function BeerPong2026SeasonPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BeerPongPageHeader title="Beer Pong · 2026–2027" />
        <BeerPongSectionNav />
        <BapePanel className="overflow-hidden">
          <div>
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
                2026–2027 season
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Pre-season
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Six returning clubs. Taplin BPC enter as defending champions.
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {BEERPONG_2026_27_CLUBS.map((team) => (
                  <TeamProfileButton
                    key={team.code}
                    code={team.code}
                    labelMode="full"
                    showMeta={false}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

          </div>
        </BapePanel>
      </div>
    </BapePageShell>
  )
}
