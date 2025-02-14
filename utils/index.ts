import type { CourseExt, Record as Run, RecordWithImproved, Tier, LeaderboardType } from "~/types"
import { format, formatDistanceToNowStrict } from "date-fns"
import { zhCN } from "date-fns/locale"

export function validQuery(query: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(query).filter(([_, value]) => value !== "" && value !== null))
}

export function sort<T extends CourseExt>(data: T[], order: "ascending" | "descending", orderBy: keyof T) {
  const ord = order === "ascending" ? 1 : -1
  if (!orderBy) return data

  return data.sort((a, b) => {
    const aValue = a[orderBy] as unknown
    const bValue = b[orderBy] as unknown

    if (typeof aValue === "number" && typeof bValue === "number") return (aValue - bValue) * ord

    if (typeof aValue === "string" && typeof bValue === "string") return aValue.localeCompare(bValue) * ord

    return 0
  })
}

const tierMap = new Map([
  ["very-easy", 1],
  ["easy", 2],
  ["medium", 3],
  ["advanced", 4],
  ["hard", 5],
  ["very-hard", 6],
  ["extreme", 7],
  ["death", 8],
  ["unfeasible", 9],
  ["impossible", 10],
])

const colorMap = new Map([
  ["very-easy", "#02e319"],
  ["easy", "#4CAF50"],
  ["medium", "#8BC34A"],
  ["advanced", "#d8e302"],
  ["hard", "#FFC107"],
  ["very-hard", "#e34202"],
  ["extreme", "#e31c02"],
  ["death", "#e302dc"],
  ["unfeasible", "#a002e3"],
  ["impossible", "#d1d1d1"],
])

export function getNumTier(tier: string) {
  return tierMap.get(tier) as number
}

export function getTierColor(tier: string) {
  return colorMap.get(tier) as string
}

export function transformTier(tier: Tier) {
  if (tier.includes("-")) {
    return tier
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ")
  } else {
    return tier.charAt(0).toUpperCase() + tier.substring(1)
  }
}

export function toLocal(date: string, short?: boolean) {
  return format(new Date(date), short ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss")
}

export function toLocalDistance(date: string, locale: string) {
  if (locale === "en") {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  } else if (locale === "zh") {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: zhCN })
  }
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

export function seperateThousands(num: number) {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function getWrHistory(records: Run[]) {
  const history: RecordWithImproved[] = []

  records.forEach((record) => {
    const len = history.length
    if (len === 0) {
      history.push({ ...record, timeImproved: 0 })
    } else {
      const last = history[len - 1] as Run
      if (record.time <= last.time) {
        history.push({ ...record, timeImproved: last.time - record.time })
      }
    }
  })

  return history.reverse()
}

// top records and points distribution
export function calcRanksAndPointsDist(runs: Run[], type: LeaderboardType) {
  const wrs = runs.filter((record) => (type === "overall" ? record.nub_rank === 1 : record.pro_rank === 1)).length

  const top20 = runs.filter((record) => (type === "overall" ? record.nub_rank! <= 20 : record.pro_rank! <= 20)).length

  const top50 = runs.filter((record) => (type === "overall" ? record.nub_rank! <= 50 : record.pro_rank! <= 50)).length

  const top100 = runs.filter((record) =>
    type === "overall" ? record.nub_rank! <= 100 : record.pro_rank! <= 100,
  ).length

  const pointsDist = Array.from({ length: 11 }, (_, i) => {
    const lower = i * 1000
    const upper = lower + 1000
    return runs.filter((record) => {
      if (type === "overall") {
        return record.nub_points! >= lower && record.nub_points! < upper
      } else {
        return record.pro_points! >= lower && record.pro_points! < upper
      }
    }).length
  })

  return {
    wrs,
    top20,
    top50,
    top100,
    pointsDist,
  }
}

// completion by tier
export function calcCompletedCourses(runs: Run[], type: LeaderboardType) {
  const tiers = ["very-easy", "easy", "medium", "advanced", "hard", "very-hard", "extreme", "death"]

  return tiers.map((tier) => {
    return runs.filter((record) => tier === (type === "overall" ? record.course.nub_tier : record.course.pro_tier))
      .length
  })
}

export function calcTotalCourses(courses: CourseExt[]) {
  const tiers = ["very-easy", "easy", "medium", "advanced", "hard", "very-hard", "extreme", "death"]

  return tiers.map((tier) => {
    return courses.filter((course) => course.tier === tier).length
  })
}
