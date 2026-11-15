import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/bape/olympics", label: "Olympics" },
  { href: "/bape/beerpong", label: "Beer Pong" },
];

const mobileNavItems = [
  { href: "/", label: "Home" },
  { href: "/bape/olympics", label: "Olympics" },
  { href: "/bape/beerpong", label: "Beer Pong" },
];

export function SiteNav({ compactContent = false }: { compactContent?: boolean }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className={`mx-auto flex min-h-16 w-full flex-col gap-3 px-5 py-3 md:h-16 md:flex-row md:items-center md:py-0 ${compactContent ? "max-w-5xl" : "max-w-6xl sm:px-8"}`}>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] transition-opacity hover:opacity-70"
          >
            NOAHEDGE
          </Link>
          <nav className="flex items-center gap-6 border-l border-border/60 pl-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav className="flex w-full items-center gap-1 text-sm md:hidden">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 rounded-sm px-3 py-2 text-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
