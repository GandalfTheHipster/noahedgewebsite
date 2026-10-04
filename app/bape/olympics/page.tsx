import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

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

export default function OlympicsHubPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
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

        <section>
          <Link
            href="/bape/olympics/stats"
            aria-label="Open Bape Olympics Stats"
            className="group relative isolate flex min-h-64 items-end overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-72 sm:p-8"
          >
            <Image
              src="https://i.postimg.cc/NFDtzH92/hardpic.png"
              alt=""
              fill
              className="-z-10 object-cover opacity-50 blur-[1px] transition duration-500 group-hover:scale-105 group-hover:opacity-60"
              sizes="(max-width: 768px) 100vw, 1100px"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <span className="flex w-full items-center justify-between gap-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Bape Olympics Stats
              <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      </div>
    </BapePageShell>
  )
}
