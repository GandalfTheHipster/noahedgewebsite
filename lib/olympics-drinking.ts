export type DrinkingTeamRoster = {
  team: string
  members: string[]
}

function rankScores<T extends { score: number | null }>(entries: T[]) {
  const sorted = [...entries].sort((a, b) => {
    if (a.score === null) return b.score === null ? 0 : 1
    if (b.score === null) return -1
    return b.score - a.score
  })
  let previousScore: number | null = null
  let previousRank: number | null = null
  return sorted.map((entry, index) => {
    const rank = entry.score === null ? null : entry.score === previousScore ? previousRank : index + 1
    previousScore = entry.score
    previousRank = rank
    return { ...entry, rank }
  })
}

export function getDrinkingStandings(
  rosters: DrinkingTeamRoster[],
  contributions: Record<string, number | null> = {},
) {
  return rankScores(rosters.map(({ team, members }) => {
    const rankedMembers = rankScores(members.map((name) => ({
      name,
      score: contributions[name] ?? null,
    })))
    const recorded = rankedMembers.filter((member) => member.score !== null)
    return {
      team,
      members: rankedMembers,
      recordedCount: recorded.length,
      score: recorded.length ? recorded.reduce((total, member) => total + member.score!, 0) : null,
    }
  }))
}
