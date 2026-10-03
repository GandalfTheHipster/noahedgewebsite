import Image from "next/image"

import { BapeHero } from "@/components/bape/BapePageChrome"

const BEERPONG_LEAGUE_LOGO = "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export function BeerPongPageHeader({ title }: { title: string }) {
  return (
    <BapeHero title={title} variant="wordmark">
      <Image
        src={BEERPONG_LEAGUE_LOGO}
        alt="Bape Beer Pong League logo"
        width={280}
        height={280}
        priority
        className="h-16 w-16 object-contain sm:h-20 sm:w-20"
      />
    </BapeHero>
  )
}
