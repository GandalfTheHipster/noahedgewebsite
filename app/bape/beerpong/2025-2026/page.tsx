import Image from "next/image"
import { Medal, Trophy } from "lucide-react"

import {
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongPageHeader } from "@/components/bape/BeerPongPageHeader"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongSeasonResults } from "@/components/bape/BeerPongSeasonResults"
import { BEERPONG_COMPLETED_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"
import {
  BEERPONG_2025_26_ARCHIVE,
} from "@/lib/data/beerpong/playoffs"

export default function BeerPongPlayoffsPage() {
  const { champion, minorPremiers } = BEERPONG_2025_26_ARCHIVE

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BeerPongPageHeader title="Beer Pong · 2025–2026" />

        <BeerPongSectionNav />
        <nav aria-label="Season sections" className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
          <a href="#playoffs" className="hover:text-foreground hover:underline">Playoffs</a>
          <a href="#standings" className="hover:text-foreground hover:underline">Standings</a>
          <a href="#results" className="hover:text-foreground hover:underline">Results</a>
        </nav>

        <section className="relative overflow-hidden rounded-[1.75rem] border bg-card text-foreground shadow-sm">
          <div className="absolute -right-16 -top-16 size-64 rounded-full border border-foreground/10" />
          <div className="absolute -bottom-32 right-1/4 size-64 rounded-full border border-foreground/10" />
          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:p-10">
            <div className="max-w-2xl">
              <div className="flex w-fit items-center gap-2 rounded-full border border-foreground/20 bg-muted/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/85">
                <Trophy className="size-3.5" aria-hidden="true" />
                2025–26 season honours
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Taplin BPC are 2026 champions.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-foreground/70 sm:text-base">
                Taplin BPC&apos;s 1–0 Grand Final win over Kobe Beer Pong delivered
                the playoff championship. Dempsey BPC finished the league
                season first to claim the minor premiership.
              </p>
            </div>

            <div className="grid gap-3">
              <HonourCard
                icon={<Trophy className="size-4" aria-hidden="true" />}
                label="Champions"
                team={champion}
                detail="Grand Final winner"
                priority
                champion
              />
              <HonourCard
                icon={<Medal className="size-4" aria-hidden="true" />}
                label="Minor premiers"
                team={minorPremiers}
                detail={`League leaders · ${minorPremiers.pts} pts`}
              />
            </div>
          </div>
        </section>

        <section id="playoffs" className="flex scroll-mt-6 flex-col gap-5">
          <BapeSectionHeader
            eyebrow="2025–26 season archive"
            title="Playoffs"
            description="Five knockout ties distilled into one champion. Winning teams are highlighted, with every official scoreline and player recorded below."
          />
          <BeerPongPlayoffBracket />
        </section>

        <section id="standings" className="flex scroll-mt-6 flex-col gap-5">
          <BapeSectionHeader title="Regular-season standings" />
          <BapePanel className="overflow-hidden p-3 sm:p-4">
            <BeerPongLeagueTable />
          </BapePanel>
        </section>

        <section id="results" className="flex scroll-mt-6 flex-col gap-5">
          <BapeSectionHeader title="Regular-season results" />
          <BeerPongSeasonResults fixtures={BEERPONG_COMPLETED_FIXTURES} />
        </section>

      </div>
    </BapePageShell>
  )
}

function HonourCard({
  icon,
  label,
  team,
  detail,
  priority = false,
  champion = false,
}: {
  icon: React.ReactNode
  label: string
  team: (typeof BEERPONG_2025_26_ARCHIVE.champion)
  detail: string
  priority?: boolean
  champion?: boolean
}) {
  return (
    <div
      className={
        champion
          ? "flex items-center gap-3 rounded-2xl border border-[#9b7a35]/55 bg-[#9b7a35]/20 p-3.5 text-foreground shadow-sm"
          : "flex items-center gap-3 rounded-2xl border border-foreground/15 bg-muted/10 p-3.5 backdrop-blur-sm"
      }
    >
      <Image
        src={team.logo}
        alt={team.name}
        width={52}
        height={52}
        priority={priority}
        className="size-12 shrink-0 object-contain"
      />
      <div className="min-w-0">
        <p
          className={
            champion
              ? "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/65"
              : "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/65"
          }
        >
          {icon}
          {label}
        </p>
        <p className="mt-1 truncate text-base font-semibold">{team.name}</p>
        <p
          className={
            champion
              ? "mt-0.5 truncate text-xs text-foreground/65"
              : "mt-0.5 truncate text-xs text-foreground/65"
          }
        >
          {detail}
        </p>
      </div>
    </div>
  )
}
