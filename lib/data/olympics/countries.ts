export type OlympicCountry = {
  name: string
  flag: string
  color?: string
  aliases?: string[]
  rosterFlag?: string
}

export const OLYMPIC_COUNTRIES: OlympicCountry[] = [
  {
    name: "Cote d'Ivoire",
    color: "#f97316",
    flag: "🇨🇮",
    aliases: ["Côte d'Ivoire", "Ivory Coast"],
  },
  {
    name: "Yugoslavia",
    color: "#dc2626",
    flag: "🇷🇸",
    aliases: ["Serbia"],
  },
  {
    name: "Germany",
    color: "#eab308",
    flag: "🇩🇪",
  },
  {
    name: "Norway",
    color: "#ef4444",
    flag: "🇳🇴",
  },
  {
    name: "Kazakhstan",
    color: "#06b6d4",
    flag: "🇰🇿",
  },
  {
    name: "South Korea",
    color: "#ffffff",
    flag: "🇰🇷",
    aliases: ["Korea"],
  },
  {
    name: "South Africa",
    color: "#16a34a",
    flag: "🇿🇦",
  },
  {
    name: "Mongolia",
    color: "#dc2626",
    flag: "🇲🇳",
  },
  {
    name: "San Marino",
    color: "#38bdf8",
    flag: "🇸🇲",
  },
  {
    name: "Estonia",
    color: "#ffffff",
    flag: "🇪🇪",
  },
  {
    name: "Scotland",
    color: "#2563eb",
    flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
  },
]

export function getOlympicCountry(value: string) {
  return OLYMPIC_COUNTRIES.find(
    (country) =>
      country.name === value ||
      country.flag === value ||
      country.aliases?.includes(value),
  )
}
