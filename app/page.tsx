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
      "Events, medals and questionable athleticism.",
    href: "/bape/olympics",
  },
  {
    imageSrc: "https://i.postimg.cc/ZR6kb86T/beerponglogo.png",
    title: "Bape Beer Pong League",
    description:
      "Fixtures, results and standings.",
    href: "/bape/beerpong",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col items-center">
        <SiteNav />

        <div className="flex w-full max-w-6xl flex-col items-center px-5 sm:px-8">
          <section className="grid w-full items-center gap-8 py-12 sm:py-16 md:grid-cols-[1fr_320px] md:gap-16 md:py-20 lg:gap-24">
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Noah Edge
                </h1>
                <p className="mx-auto max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mx-0">
                  Software engineering student at Curtin, based in Perth. Into
                  history, politics and video games.
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
            className="w-full border-t border-border/60 pt-10 pb-12 sm:pt-12 md:pb-20"
          >
            <h2
              id="projects-heading"
              className="mb-6 text-2xl font-semibold tracking-tight sm:mb-8 sm:text-3xl"
            >
              Projects
            </h2>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
              {projects.map((project) => (
                <article key={project.title} className="h-full">
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <div className="aspect-video overflow-hidden rounded-lg bg-black">
                      <Image
                        src={project.imageSrc}
                        alt=""
                        width={700}
                        height={400}
                        sizes="(min-width: 1152px) 532px, (min-width: 768px) 46vw, 100vw"
                        className={`h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03] ${project.href === "/bape/beerpong" ? "object-contain p-5" : "object-cover"}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col pt-5">
                      <h3 className="flex items-center gap-3 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                        {project.title}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="w-full max-w-6xl px-5 sm:px-8"
        >
          <div className="grid gap-8 border-t border-border/60 py-10 sm:py-12 md:grid-cols-2 md:pb-20">
            <div>
              <h2
                id="contact-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Say hello
              </h2>
              <a
                href="mailto:hello@noahedge.com"
                className="mt-4 inline-block max-w-full break-words rounded-sm text-base underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
              >
                hello@noahedge.com
              </a>
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Complain about me
              </h3>
              <a
                href="mailto:grievances@noahedge.com"
                className="mt-4 inline-block max-w-full break-words rounded-sm text-base underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
              >
                grievances@noahedge.com
              </a>
            </div>
          </div>
        </section>

        <footer className="w-full border-t border-border/60 bg-background/80">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-8">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  )
}
