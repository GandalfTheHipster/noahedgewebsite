import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function BapeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <SiteNav compactContent />

        {/* CONTENT */}
        <div className="flex-1 flex flex-col items-center max-w-5xl w-full px-5 pb-10 pt-4 sm:pt-6">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>

      </div>
    </main>
  )
}
