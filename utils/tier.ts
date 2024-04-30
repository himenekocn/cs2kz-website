const tierMap = new Map([
  ["very_easy", 1],
  ["easy", 2],
  ["medium", 3],
  ["advanced", 4],
  ["hard", 5],
  ["very_hard", 6],
  ["extreme", 7],
  ["death", 8],
  ["unfeasible", 9],
  ["impossible", 10],
])

const colorMap = new Map([
  ["very_easy", "#02e319"],
  ["easy", "#4CAF50"],
  ["medium", "#8BC34A"],
  ["advanced", "#d8e302"],
  ["hard", "#FFC107"],
  ["very_hard", "#e34202"],
  ["extreme", "#e31c02"],
  ["death", "#e302dc"],
  ["unfeasible", "#a002e3"],
  ["impossible", "#d1d1d1"],
])

export function getNumTier(tier: string) {
  return tierMap.get(tier)
}

export function getTierColor(tier: string) {
  return colorMap.get(tier)
}
