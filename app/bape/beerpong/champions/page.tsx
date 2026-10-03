import Image from "next/image"
import Link from "next/link"

import { BapePageShell } from "@/components/bape/BapePageChrome"
import { BeerPongPageHeader } from "@/components/bape/BeerPongPageHeader"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { BEERPONG_2025_26_ARCHIVE } from "@/lib/data/beerpong/playoffs"

export const metadata = {
  title: "Champions Wall | Bape Beer Pong League",
  description: "Every Bape Beer Pong League champion, season by season.",
}

const champions = [BEERPONG_2025_26_ARCHIVE]

export default function BeerPongChampionsPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BeerPongPageHeader title="Champions Wall" />
        <BeerPongSectionNav />

        <section aria-label="Bape Beer Pong League champions" className="rounded-[1.75rem] border bg-card p-5 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {champions.map(({ season, champion }) => (
              <article key={season} className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-6 text-center">
                <Link href="/bape/beerpong/2025-2026" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{season}</Link>
                <div className="mx-auto my-7 grid size-40 place-items-center rounded-full border border-amber-500/25 bg-amber-500/5">
                  <Image src={champion.logo} alt={`${champion.name} crest`} width={120} height={120} priority className="size-28 object-contain" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">League champions</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{champion.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kyle Taplin</p>
                <div className="mt-6 border-t border-amber-500/20 pt-5">
                  <p className="text-xs text-muted-foreground">Grand Final · 2026</p>
                  <p className="mt-2 text-sm font-medium">Taplin <span className="px-2 text-lg font-bold tabular-nums">1–0</span> Kobe</p>
                </div>
              </article>
            ))}
          </div>

        </section>
      </div>
    </BapePageShell>
  )
}
