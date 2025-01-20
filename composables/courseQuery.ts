import type { Mode, Teleports } from "~/types"

interface SavedCourseQuery {
  course: string
  mode: Mode
  has_teleports: Teleports
}

export const useCourseQuery = () =>
  useState<SavedCourseQuery>("courseQuery", () => ({
    course: "",
    mode: "classic",
    has_teleports: "overall",
  }))
