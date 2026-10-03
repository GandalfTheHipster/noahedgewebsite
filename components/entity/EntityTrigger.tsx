"use client"

import { forwardRef, useState } from "react"
import { XIcon } from "lucide-react"
import { Dialog } from "radix-ui"

import { CountryModalContent } from "@/components/entity/CountryModalContent"
import { PersonModalContent } from "@/components/entity/PersonModalContent"
import { TeamModalContent } from "@/components/entity/TeamModalContent"
import { cn } from "@/lib/utils"

export type EntityType = "team" | "person" | "country"

type EntityTriggerProps = {
  type: EntityType
  id: string
  children: React.ReactNode
  className?: string
}

export const EntityTrigger = forwardRef<HTMLButtonElement, EntityTriggerProps>(
  function EntityTrigger(
    {
      type,
      id,
      children,
      className,
    },
    ref,
  ) {
    const title =
      type === "team"
        ? "Team profile"
        : type === "person"
          ? "Player profile"
          : "Country profile"
    const [open, setOpen] = useState(false)

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            ref={ref}
            type="button"
            className={cn(
              "cursor-pointer text-left underline-offset-4 transition hover:underline focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              className ?? "font-medium",
            )}
          >
            {children}
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid max-h-[86dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-background shadow-2xl focus:outline-none">
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-muted-foreground shadow-sm ring-offset-background transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Close profile"
              >
                <XIcon className="size-4" />
              </button>
            </Dialog.Close>

            <div className="max-h-[calc(86dvh-2px)] min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6">
              {type === "team" ? (
                <TeamModalContent teamCode={id} />
              ) : type === "person" ? (
                <PersonModalContent personId={id} />
              ) : (
                <CountryModalContent countryId={id} />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  },
)

EntityTrigger.displayName = "EntityTrigger"
