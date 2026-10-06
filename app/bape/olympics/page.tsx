import Link from "next/link"
import { ArrowUpRight, Medal, Trophy } from "lucide-react"

import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEditionCard } from "@/components/bape/OlympicsEditionCard"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"

const editions = [
  {
    href: "/bape/olympics/2026",
    data: OLYMPICS_2026_DATA,
    status: "Upcoming",
    disabled: false,
    logo: {
      light: "https://i.postimg.cc/j5KKMgT0/lavendar.png",
      dark: "https://i.postimg.cc/RFNrsj8m/Lavender-White.png",
      alt: "Bape Olympics 2026 logo",
    },
  },
  {
    href: "/bape/olympics/2023",
    data: OLYMPICS_2023_DATA,
    status: "Complete",
    disabled: false,
    logo: {
      light: "https://i.postimg.cc/T16hcGMv/Black-Bape-Olympics2023.png",
      dark: "https://i.postimg.cc/J0LtQmVL/White-Bape-Olympics2023.png",
      alt: "Bape Olympics 2023 logo",
    },
  },
  {
    href: "/bape/olympics/2021",
    data: OLYMPICS_2021_DATA,
    status: "Complete",
    disabled: false,
    logo: {
      light:
        "https://i.postimg.cc/Kv1C5TNW/Bape-Olympics-Logo-Rockingham-Black.png",
      dark:
        "https://i.postimg.cc/hPN6ZGZh/Bape-Olympics-Rockingham-White.png",
      alt: "Bape Olympics Rockingham 2021 logo",
    },
  },
]

const statsLinks = [
  {
    href: "/bape/olympics/stats",
    title: "Athlete medal table",
    icon: Medal,
  },
  {
    href: "/bape/olympics/stats/titles",
    title: "Titles ranking",
    icon: Trophy,
  },
]

export default function OlympicsHubPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-6 sm:gap-8">
        <BapeHero title="Bape Olympics" variant="wordmark" />

        <section className="py-2 sm:py-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s the Bape Olympics?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              The Bape Olympics turns a weekend of games, sports, table events,
              drinking challenges, and oddball skill tests into a full medal
              competition. Players represent nations, collect points through
              event podiums, and chase the title of Olympic champion.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <BapeSectionHeader title="Editions" />

          <div className="grid gap-5 md:grid-cols-3">
            {editions.map((edition) => (
              <OlympicsEditionCard key={edition.href} {...edition} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <BapeSectionHeader title="Stats" />
          <div className="grid gap-4 sm:grid-cols-2">
            {statsLinks.map(({ href, title, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={title}
                className="group flex min-h-44 flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-violet-400/20 bg-card p-5 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-48"
              >
                <span className="grid size-20 place-items-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-700 transition-colors group-hover:bg-violet-400/[0.14] dark:text-violet-300 sm:size-24">
                  <Icon aria-hidden="true" className="size-11 sm:size-12" strokeWidth={1.6} />
                </span>
                <span className="flex items-center gap-2 font-semibold tracking-tight sm:text-lg">
                  {title}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
