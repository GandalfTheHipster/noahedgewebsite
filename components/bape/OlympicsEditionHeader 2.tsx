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
  const isLavenderEdition = data.date === "2026"
  const showLavenderAccent = isUpcoming && isLavenderEdition

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border bg-card p-4 sm:p-6",
        isUpcoming &&
          "border-border/80 bg-muted/10",
        showLavenderAccent &&
          "border-violet-300/35 bg-violet-500/[0.03] dark:border-violet-400/15 dark:bg-violet-950/[0.05]",
      )}
    >
      <Image
        src={data.imageOfTheDay}
        alt=""
        fill
        priority
        className={cn(
          "object-cover",
          isUpcoming ? "opacity-[0.16]" : "opacity-25",
        )}
        sizes="(max-width: 768px) 100vw, 960px"
      />
      <div
        className={cn(
          "absolute inset-0 bg-background/85 dark:bg-zinc-950/85",
          showLavenderAccent &&
            "bg-background/90 dark:bg-zinc-950/90",
        )}
      />
      <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-center">
        <div className="order-2 md:order-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground",
              showLavenderAccent && "border-violet-300/30 bg-violet-500/[0.03] text-violet-700 dark:border-violet-300/15 dark:text-violet-200",
            )}>
              <Sparkles className="size-3.5" />
              {isUpcoming ? "Next edition" : "Edition archive"}
            </span>
            {!isUpcoming ? (
              <span className="text-sm font-medium text-muted-foreground">
                {data.location}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          {data.description ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {data.description}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-6 gap-x-10 gap-y-4",
              isUpcoming
                ? "grid max-w-sm grid-cols-1"
                : "flex max-w-2xl flex-wrap",
            )}
          >
            {isUpcoming ? (
              <div className="flex items-center gap-3 py-3">
                <CalendarDays className={cn("size-5 text-muted-foreground", showLavenderAccent && "text-violet-500")} />
                <div>
                  <p className="font-semibold">{data.startDate ?? "TBA"}</p>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div
          className={cn(
            "order-1 grid min-h-56 place-items-center p-5 md:order-2",
          )}
        >
          {logo ? (
            <div className="relative flex h-40 w-full items-center justify-center sm:h-48">
              <Image
                src={logo.light}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="relative h-full w-full object-contain dark:hidden"
              />
              <Image
                src={logo.dark}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="relative hidden h-full w-full object-contain dark:block"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Bape Olympics
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                {data.date}
              </p>
            </div>
          )}
        </div>
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
    <div className="min-w-40">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  )
}
