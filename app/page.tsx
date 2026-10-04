import Image from "next/image"
import Link from "next/link"

import { ArrowUpRight } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SocialLinks } from "@/components/landing/SocialLinks"
import { SiteNav } from "@/components/site-nav"

const projects = [
  {
    imageSrc: "https://i.postimg.cc/wB8jxcqN/IMG-0666.jpg",
    title: "Bape Olympics",
    description:
      "Annual multi-event beer-based competition archive with squads, medals, events, winners, and all-time rankings.",
    buttonText: "View Bape Olympics",
    href: "/bape/olympics",
  },
  {
    imageSrc: "https://i.postimg.cc/ZR6kb86T/beerponglogo.png",
    title: "Bape Beer Pong League",
    description:
      "The Bape Beer Pong League is the pinnacle of competitive Beer Pong in Australia. View stats, results and standings here.",
    buttonText: "View Beer Pong League",
    href: "/bape/beerpong",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col items-center">
        <SiteNav />

        <div className="flex w-full max-w-6xl flex-1 flex-col items-center px-5 sm:px-8">
          <section className="grid w-full items-center gap-8 py-12 sm:py-16 md:grid-cols-[1fr_320px] md:gap-16 md:py-20 lg:gap-24">
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Noah Edge
                </h1>
                <p className="mx-auto max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mx-0">
                  I&apos;m a West Australian software engineering student at
                  Curtin University with a passion for history, politics, and
                  video games.
                </p>
              </div>
              <SocialLinks />
            </div>

            <div className="relative order-first mx-auto w-full max-w-[11rem] md:order-none md:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted">
                <Image
                  src="https://i.postimg.cc/ZqjfKrd3/IMG-8793.jpg"
                  alt="Noah Edge"
                  width={900}
                  height={1200}
                  priority
                  sizes="176px"
                  className="aspect-square h-full w-full object-cover object-center md:hidden"
                />
                <Image
                  src="https://i.postimg.cc/yYGh0bHx/IMG-8793.jpg"
                  alt="Noah Edge"
                  width={900}
                  height={1200}
                  priority
                  sizes="320px"
                  className="hidden h-full w-full object-cover md:block md:aspect-[4/5] md:object-[center_30%]"
                />
              </div>
            </div>
          </section>

          <section
            id="projects"
            aria-labelledby="projects-heading"
            className="w-full border-t border-border/60 py-10 sm:py-12 md:pb-20"
          >
            <h2
              id="projects-heading"
              className="mb-6 text-2xl font-semibold tracking-tight sm:mb-8 sm:text-3xl"
            >
              Projects
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.title} className="h-full">
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <div className="aspect-video overflow-hidden border-b border-border/60 bg-black">
                      <Image
                        src={project.imageSrc}
                        alt=""
                        width={700}
                        height={400}
                        sizes="(min-width: 1152px) 532px, (min-width: 768px) 46vw, 100vw"
                        className={`h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03] ${project.href === "/bape/beerpong" ? "object-contain p-5" : "object-cover"}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        {project.description}
                      </p>
                      <div className="mt-auto pt-6">
                        <span className="flex items-center justify-between border-t border-border/60 pt-4 text-sm font-medium">
                          {project.buttonText}
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <footer className="w-full border-t border-border/60 bg-background/80">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-8">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  )
}
