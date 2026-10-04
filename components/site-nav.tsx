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

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col gap-3 px-5 py-3 md:h-16 md:flex-row md:items-center md:justify-center md:gap-4 md:py-0">
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] transition-opacity hover:opacity-70"
          >
            NOAHEDGE
          </Link>
          <nav className="flex items-center rounded-full border border-border/70 bg-muted/35 p-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav className="flex w-full items-center rounded-full border border-border/70 bg-muted/35 p-1 text-sm md:hidden">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 rounded-full px-3 py-2 text-center text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
