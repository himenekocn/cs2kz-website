import type { CourseExt, Record as Run } from "~/types"
import { format } from "date-fns"

// for testing
const maps = [
  "kz_natureblock_scte",
  "kz_bhop_algetic",
  "kz_tangent",
  "kz_maxine",
  "kz_bigcastle",
  "kz_mz",
]

export function getUrl(high?: boolean) {
  const map = maps[Math.floor(Math.random() * maps.length)]

  return high
    ? `https://kzglobalteam.github.io/map-images/webp/${map}.webp?raw=true`
    : `https://kzglobalteam.github.io/map-images/webp/medium/${map}.webp?raw=true`
}

export function validQuery(query: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== "" && value !== null,
    ),
  )
}

export function sort<T extends CourseExt>(
  data: T[],
  order: "ascending" | "descending",
  orderBy: keyof T,
) {
  const ord = order === "ascending" ? 1 : -1
  if (!orderBy) return data

  return data.sort((a, b) => {
    const aValue = a[orderBy] as unknown
    const bValue = b[orderBy] as unknown

    if (typeof aValue === "number" && typeof bValue === "number")
      return (aValue - bValue) * ord

    if (typeof aValue === "string" && typeof bValue === "string")
      return aValue.localeCompare(bValue) * ord

    return 0
  })
}

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

export function toLocal(date: string) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss")
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = (seconds % 60).toFixed(3)

  const timeParts = []

  if (hours > 0) {
    timeParts.push(hours.toString().padStart(2, "0"))
  }

  if (minutes > 0 || hours > 0) {
    timeParts.push(minutes.toString().padStart(2, "0"))
  }

  timeParts.push(remainingSeconds.padStart(6, "0"))

  return timeParts.join(":")
}

export function getWrHistory(records: Run[]) {
  // will remove this part when api is able to sort them
  const sorted = records.sort((a, b) => {
    return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
  })

  const history: Run[] = []

  sorted.forEach((record) => {
    const len = history.length
    if (len === 0) {
      history.push(record)
    } else {
      const last = history[len - 1] as Run
      if (record.time <= last.time) {
        history.push(record)
      }
    }
  })

  return history.reverse()
}
