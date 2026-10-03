"use client"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import { cn } from "@/lib/utils"

type CountryProfileButtonProps = {
  country: string
  className?: string
  compact?: boolean
  meta?: string
  large?: boolean
  iconOnly?: boolean
}

export function CountryProfileButton({
  country,
  className,
  compact = false,
  meta,
  large = false,
  iconOnly = false,
}: CountryProfileButtonProps) {
  const olympicCountry = getOlympicCountry(country)
  const label = olympicCountry?.name ?? country
  const flag = olympicCountry?.flag

  return (
    <EntityTrigger
      type="country"
      id={label}
      className={cn(
        "group inline-flex max-w-full min-w-0 items-center gap-2 overflow-hidden rounded-full border bg-background px-3 py-1.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 hover:no-underline hover:shadow-md",
        compact && "px-2 py-1",
        iconOnly &&
          "size-8 justify-center rounded-md border-transparent bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:border-transparent hover:bg-muted/50 hover:shadow-none",
        className,
      )}
    >
      {flag ? (
        <span className={cn("shrink-0 text-lg", large && "text-2xl")}>{flag}</span>
      ) : null}
      {iconOnly ? (
        <span className="sr-only">{label}</span>
      ) : (
        <span className="min-w-0 flex-1 overflow-hidden">
          <span
            className={cn(
              "block truncate text-sm font-semibold text-foreground group-hover:underline",
              large && "text-xl leading-tight",
            )}
          >
            {label}
          </span>
          {meta ? (
            <span className="block truncate text-xs text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </span>
      )}
    </EntityTrigger>
  )
}
