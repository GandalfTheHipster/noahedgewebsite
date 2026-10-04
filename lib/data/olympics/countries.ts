export type OlympicCountry = {
  name: string
  flag: string
  aliases?: string[]
  rosterFlag?: string
}

export const OLYMPIC_COUNTRIES: OlympicCountry[] = [
  {
    name: "Cote d'Ivoire",
    flag: "🇨🇮",
    aliases: ["Côte d'Ivoire", "Ivory Coast"],
  },
  {
    name: "Yugoslavia",
    flag: "🇷🇸",
    aliases: ["Serbia"],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
  },
  {
    name: "Norway",
    flag: "🇳🇴",
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    aliases: ["Korea"],
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Mongolia",
    flag: "🇲🇳",
  },
  {
    name: "San Marino",
    flag: "🇸🇲",
  },
  {
    name: "TBD",
    flag: "🏴‍☠️",
    rosterFlag: "🇸🇲",
  },
  {
    name: "Scotland",
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
