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
    ...(isUpcoming && year === "2026"
      ? [{ href: `${baseHref}/information`, label: "Information" }]
      : []),
    ...(year === "2026" ? [{ href: `${baseHref}/teams`, label: "Teams" }] : []),
    ...(!isUpcoming
      ? [{ href: `${baseHref}/medaltable`, label: "Medal Table" }]
      : []),
    ...(year === "2026" ? [{ href: `${baseHref}/calendar`, label: "Calendar" }] : []),
    { href: `${baseHref}/events`, label: "Events" },
    ...(!isUpcoming ? [{ href: `${baseHref}/images`, label: "Images" }] : []),
  ]

  return (
    <nav className="sticky top-2 z-20 mx-auto flex w-full max-w-full flex-wrap justify-evenly gap-2 rounded-[1.5rem] border bg-card p-2 sm:mx-0 sm:justify-start">
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
              isActive &&
                "bg-foreground text-background hover:bg-foreground hover:text-background",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
