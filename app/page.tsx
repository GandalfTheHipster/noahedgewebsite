import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SocialLinks } from "@/components/landing/SocialLinks"
import { SiteNav } from "@/components/site-nav"

const projects = [
  {
    imageSrc: "https://i.postimg.cc/wB8jxcqN/IMG-0666.jpg",
    title: "Bape Olympics",
    description:
      "Annual multi-event competition archive with squads, medals, events, winners, and all-time rankings.",
    buttonText: "View Bape Olympics",
    href: "/bape/olympics",
  },
  {
    imageSrc: "https://i.postimg.cc/ZR6kb86T/beerponglogo.png",
    title: "Bape Beer Pong League",
    description:
      "League hub for standings, results, team profiles, and the playoff bracket.",
    buttonText: "View League",
    href: "/bape/beerpong",
  },
  {
    title: "LuckyAS",
    description:
      "A class project allocation app built for a software engineering assignment.",
    buttonText: "Coming Soon",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col items-center">
        <SiteNav />

        <div className="flex w-full max-w-6xl flex-1 flex-col items-center px-4 py-6 sm:px-5 sm:py-12">
          <section className="grid w-full items-center gap-7 py-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-14">
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Noah Edge
                </h1>
                <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg md:mx-0 md:max-w-2xl md:text-xl md:leading-8">
                  I&apos;m a West Australian software engineering student at
                  Curtin University with a passion for history, politics, and
                  video games.
                </p>
              </div>
              <SocialLinks />
            </div>

            <div className="relative order-first mx-auto w-full max-w-[14rem] md:order-none md:max-w-md">
              <div className="absolute -inset-3 rounded-[2rem] bg-muted/60 md:-inset-4" />
              <div className="relative overflow-hidden rounded-[1.5rem] border bg-card shadow-xl md:rounded-[1.75rem]">
                <Image
                  src="https://i.postimg.cc/ZqjfKrd3/IMG-8793.jpg"
                  alt="Noah Edge"
                  width={900}
                  height={1200}
                  priority
                  className="aspect-square h-full w-full object-cover object-center md:hidden"
                />
                <Image
                  src="https://i.postimg.cc/yYGh0bHx/IMG-8793.jpg"
                  alt="Noah Edge"
                  width={900}
                  height={1200}
                  priority
                  className="hidden h-full w-full object-cover md:block md:aspect-[4/5] md:object-[center_30%]"
                />
              </div>
            </div>
          </section>

          <section id="projects" className="w-full py-8 sm:py-12 md:py-16">
            <div className="mb-5 max-w-2xl text-center md:mb-8 md:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Projects
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Ongoing projects
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] pt-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[2.2/1] w-full overflow-hidden md:aspect-video">
                    {project.imageSrc ? (
                      <>
                        <Image
                          src={project.imageSrc}
                          alt=""
                          width={700}
                          height={400}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/70">
                        <div className="text-center">
                          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            Coming Soon
                          </p>
                          <p className="mt-2 text-3xl font-semibold">
                            LuckyAS
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardHeader className="gap-2 px-4 pb-0 sm:px-6">
                    <CardTitle className="text-xl leading-tight">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <CardDescription className="leading-6">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="mt-auto px-4 sm:px-6">
                    {project.href ? (
                      <Button asChild className="w-full">
                        <Link href={project.href}>{project.buttonText}</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" disabled>
                        {project.buttonText}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
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
