import type { Mode, LeaderboardType } from "~/types"

interface SavedCourseQuery {
  course: string
  mode: Mode
  leaderboardType: LeaderboardType
}

export const useCourseQuery = () =>
  useState<SavedCourseQuery>("courseQuery", () => ({
    course: "",
    mode: "classic",
    leaderboardType: "overall",
  }))
