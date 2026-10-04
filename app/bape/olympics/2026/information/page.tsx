import { CalendarDays, CircleDollarSign } from "lucide-react"

import {
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsPageFrame } from "@/components/bape/OlympicsEditionPages"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"

const informationItems = [
  {
    label: "Olympics fee",
    detail: "$300",
    note: "Due by October 21, 2026",
    icon: CircleDollarSign,
  },
  {
    label: "Information night",
    detail: "October 17, 2026",
    note: "",
    icon: CalendarDays,
  },
  {
    label: "Launch event",
    detail: "November 14, 2026",
    note: "",
    icon: CalendarDays,
  },
]

export default function LavenderOlympicsInformationPage() {
  return (
    <OlympicsPageFrame data={OLYMPICS_2026_DATA}>
      <div className="flex flex-col gap-8">
        <section>
          <BapeSectionHeader title="Information" />
        </section>

        <section className="grid gap-5">
          <BapeSectionHeader title="Key details" />
          <div className="grid gap-4 md:grid-cols-3">
            {informationItems.map(({ label, detail, note, icon: Icon }) => (
              <BapePanel key={label} className="flex min-h-48 flex-col p-5 sm:p-6">
                <span className="grid size-11 place-items-center rounded-full border border-violet-300/30 bg-violet-500/[0.08] text-violet-600 dark:text-violet-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-sm font-medium text-muted-foreground">
                  {label}
                </h2>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {detail}
                </p>
                {note ? (
                  <p className="mt-2 text-sm text-muted-foreground">{note}</p>
                ) : null}
              </BapePanel>
            ))}
          </div>
        </section>
      </div>
    </OlympicsPageFrame>
  )
}
