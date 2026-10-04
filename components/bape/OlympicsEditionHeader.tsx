import type { ReactNode } from "react"
import Image from "next/image"
import { CalendarDays, Sparkles } from "lucide-react"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

type OlympicsEditionLogo = {
  light: string
  dark: string
  alt: string
}

type OlympicsEditionHeaderProps = {
  data: OlympicPageData
  logo?: OlympicsEditionLogo
  isUpcoming?: boolean
}

export function OlympicsEditionHeader({
  data,
  logo,
  isUpcoming = false,
}: OlympicsEditionHeaderProps) {
  const accent =
    data.date === "2021"
      ? {
          wash: "bg-orange-500/[0.07]",
          badge: "border-orange-400/35 text-orange-700 dark:text-orange-200",
          panel:
            "border-orange-400/25 bg-orange-500/[0.04]",
          icon: "text-orange-600 dark:text-orange-300",
        }
      : data.date === "2023"
        ? {
            wash: "bg-blue-500/[0.07]",
            badge: "border-blue-400/35 text-blue-700 dark:text-blue-200",
            panel: "border-blue-400/25 bg-blue-500/[0.04]",
            icon: "text-blue-600 dark:text-blue-300",
          }
        : {
            wash: "bg-violet-500/[0.07]",
            badge:
              "border-violet-400/35 text-violet-700 dark:text-violet-200",
            panel: "border-violet-400/25 bg-violet-500/[0.04]",
            icon: "text-violet-600 dark:text-violet-300",
          }

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm">
      <div className="relative grid min-h-56 place-items-center overflow-hidden bg-muted/30 sm:min-h-72">
        <Image
          src={data.imageOfTheDay}
          alt=""
          fill
          priority
          className="scale-105 object-cover opacity-35 blur-[2px]"
          sizes="(max-width: 768px) 100vw, 1100px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/55 to-background/35 dark:from-zinc-950/75 dark:via-zinc-900/55 dark:to-zinc-800/35" />
        <div
          className={cn("pointer-events-none absolute inset-0", accent.wash)}
        />
        <span
          className={cn(
            "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground shadow-sm sm:left-6 sm:top-6",
            accent.badge,
          )}
        >
          <Sparkles className="size-3.5" aria-hidden="true" />
          {isUpcoming ? "Next edition" : "Edition archive"}
        </span>

        {logo ? (
          <div className="relative flex h-36 w-full max-w-md items-center justify-center px-8 py-5 sm:h-48 sm:px-12">
            <Image
              src={logo.light}
              alt={logo.alt}
              width={420}
              height={240}
              priority
              className="h-full w-full object-contain drop-shadow-lg dark:hidden"
            />
            <Image
              src={logo.dark}
              alt={logo.alt}
              width={420}
              height={240}
              priority
              className="hidden h-full w-full object-contain drop-shadow-2xl dark:block"
            />
          </div>
        ) : (
          <div className="relative text-center">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Bape Olympics
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              {data.date}
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {data.location}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          {data.description ? (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {data.description}
            </p>
          ) : null}
        </div>

        {isUpcoming ? (
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border bg-muted/20 px-4 py-3 md:min-w-64",
              accent.panel,
            )}
          >
            <CalendarDays
              className={cn("size-5 shrink-0 text-muted-foreground", accent.icon)}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Starts
              </p>
              <p className="mt-0.5 font-semibold">
                {data.startDate ?? "TBA"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 border-t pt-4 md:min-w-72 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <HeaderFeature label="Champion">
              {data.winner ? (
                <CountryProfileButton
                  country={data.winner}
                  compact
                  className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                />
              ) : (
                <HeaderStatValue value="TBA" />
              )}
            </HeaderFeature>
            <HeaderFeature label="MVP">
              {data.mvp ? (
                <PersonProfileButtonByName
                  name={data.mvp}
                  compact
                  className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                />
              ) : (
                <HeaderStatValue value="TBA" />
              )}
            </HeaderFeature>
          </div>
        )}
      </div>
    </section>
  )
}

function HeaderStatValue({ value }: { value: string }) {
  return <p className="mt-1 truncate font-semibold">{value}</p>
}

function HeaderFeature({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 truncate">{children}</div>
    </div>
  )
}
