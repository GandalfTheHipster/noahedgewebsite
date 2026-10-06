"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const items = [
  { href: "/bape/olympics/stats", label: "Medals" },
  { href: "/bape/olympics/stats/titles", label: "Titles" },
]

export function OlympicsStatsNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Olympics statistics" className="flex w-fit max-w-full flex-wrap gap-1 rounded-xl border bg-muted/30 p-1">
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-background hover:text-foreground",
              isActive &&
                "bg-background text-foreground shadow-sm hover:bg-background",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
