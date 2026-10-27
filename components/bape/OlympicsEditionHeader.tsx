import type { ReactNode } from "react"
import Image from "next/image"
import { CalendarDays } from "lucide-react"

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
          panel:
            "border-orange-400/25 bg-orange-500/[0.04]",
          icon: "text-orange-600 dark:text-orange-300",
        }
      : data.date === "2023"
        ? {
            wash: "bg-blue-500/[0.07]",
            panel: "border-blue-400/25 bg-blue-500/[0.04]",
            icon: "text-blue-600 dark:text-blue-300",
          }
        : {
            wash: "bg-violet-500/[0.07]",
            panel: "border-violet-400/25 bg-violet-500/[0.04]",
            icon: "text-violet-600 dark:text-violet-300",
          }

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm">
      <div className="relative grid min-h-40 place-items-center overflow-hidden bg-muted/30 sm:min-h-48">
        <Image
          src={data.imageOfTheDay}
          alt=""
          fill
          priority
          className="scale-105 object-cover opacity-35 blur-[2px]"
          sizes="(max-width: 768px) 100vw, 1100px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/65 to-background/50 dark:from-zinc-950/75 dark:via-zinc-900/65 dark:to-zinc-800/50" />
        <div
          className={cn("pointer-events-none absolute inset-0", accent.wash)}
        />

        {logo ? (
          <div className="relative flex h-28 w-full max-w-md items-center justify-center px-8 py-4 sm:h-36 sm:px-12">
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

      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {data.location}
          </p>
          <h1 className="mt-1 text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
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
              "flex items-center gap-3 border-t border-border/60 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0",
            )}
          >
            <CalendarDays
              className={cn("size-5 shrink-0 text-muted-foreground", accent.icon)}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Dates
              </p>
              <p className="mt-1 text-sm font-medium">
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
