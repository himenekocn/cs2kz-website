import type { Mode } from "~/types"

interface SavedCourseQuery {
  course: string
  mode: Mode
  has_teleports: "overall" | "pro"
}

export const useCourseQuery = () =>
  useState<SavedCourseQuery>("courseQuery", () => ({
    course: "",
    mode: "classic",
    has_teleports: "overall",
  }))
