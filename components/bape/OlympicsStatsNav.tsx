"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const items = [
  { href: "/bape/olympics/stats", label: "Athlete Medal Table" },
  { href: "/bape/olympics/stats/titles", label: "Titles Ranking" },
]

export function OlympicsStatsNav() {
  const pathname = usePathname()

  return (
    <nav className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-[1.5rem] border bg-card p-2 shadow-sm sm:mx-0 sm:w-full sm:justify-start">
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
