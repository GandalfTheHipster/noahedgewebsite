import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"

export function SocialLinks() {
  const iconClass =
    "h-5 w-5"

  const linkClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

  const links = {
    github: "https://github.com/GandalfTheHipster",
    linkedin: "https://www.linkedin.com/in/noahkedge/",
    instagram: "https://www.instagram.com/_noahedge/",
    youtube: "https://www.youtube.com/@noahkobeedge",
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={linkClass}>
        <Github className={iconClass} aria-hidden="true" />
      </Link>

      <Link href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={linkClass}>
        <Linkedin className={iconClass} aria-hidden="true" />
      </Link>

      <Link href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}>
        <Instagram className={iconClass} aria-hidden="true" />
      </Link>

      <Link href={links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={linkClass}>
        <Youtube className={iconClass} aria-hidden="true" />
      </Link>
    </div>
  )
}
