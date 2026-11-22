import Image from "next/image"
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
    status: "Complete",
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
    image: "https://i.postimg.cc/B66pfv3j/bapesports.jpg",
    icon: Medal,
    accent: "border-sky-400/25",
    iconColor: "text-sky-200",
  },
  {
    href: "/bape/olympics/stats/titles",
    title: "Titles ranking",
    image: "https://i.postimg.cc/x8JnMmg6/81A7CEEB-C84F-4834-93CD-4A3788ED1FAD-1-105-c.jpg",
    icon: Trophy,
    accent: "border-orange-400/25",
    iconColor: "text-orange-200",
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
            {statsLinks.map(({ href, title, image, icon: Icon, accent, iconColor }) => (
              <Link
                key={href}
                href={href}
                className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-card p-4 shadow-sm motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${accent}`}
              >
                <div className={`relative isolate grid min-h-48 place-items-center overflow-hidden rounded-2xl border bg-zinc-900 sm:min-h-52 ${accent}`}>
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 460px"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/65 transition-colors group-hover:bg-black/55" />
                  <div className="relative flex flex-col items-center gap-3 px-4 py-6 text-center text-white">
                    <span className={`grid size-16 place-items-center rounded-2xl border bg-black/50 ${accent} ${iconColor}`}>
                      <Icon aria-hidden="true" className="size-9" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {title}
                    </h3>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="absolute right-3 top-3 size-8 rounded-lg bg-black/60 p-1.5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
