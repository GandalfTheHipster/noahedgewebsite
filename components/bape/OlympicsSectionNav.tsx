"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type OlympicsSectionNavProps = {
  year: string
  isUpcoming?: boolean
}

export function OlympicsSectionNav({
  year,
  isUpcoming = false,
}: OlympicsSectionNavProps) {
  const pathname = usePathname()
  const baseHref = `/bape/olympics/${year}`
  const items = [
    { href: baseHref, label: "Overview" },
    ...(year === "2026" ? [{ href: `${baseHref}/teams`, label: "Teams" }] : []),
    ...(!isUpcoming
      ? [{ href: `${baseHref}/medaltable`, label: "Medal Table" }]
      : []),
    ...(year === "2026" ? [{ href: `${baseHref}/calendar`, label: "Calendar" }] : []),
    { href: `${baseHref}/events`, label: "Events" },
    ...(!isUpcoming ? [{ href: `${baseHref}/images`, label: "Images" }] : []),
  ]

  return (
    <nav aria-label="Edition navigation" className="mx-auto flex w-full min-w-0 max-w-full flex-wrap justify-start gap-x-2 border-b border-border/70">
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative -mb-px min-w-fit flex-1 whitespace-nowrap border-b-2 border-transparent px-2 pb-3 pt-2 text-center text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-none md:px-4 md:text-left",
              isActive &&
                "border-foreground text-foreground",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
