export type Tier =
  | "very_easy"
  | "easy"
  | "medium"
  | "advanced"
  | "hard"
  | "very_hard"
  | "extreme"
  | "death"
  | "unfeasible"
  | "impossible"

export type Mode = "classic" | "vanilla"

export type Style =
  | "normal"
  | "backwards"
  | "sideways"
  | "half_sideways"
  | "w_only"
  | "low_gravity"
  | "high_gravity"
  | "no_prestrafe"
  | "negev"
  | "ice"

export type RankedStatus = "never" | "unranked" | "ranked"

export type GlobalStatus = "global" | "not_global" | "in_testing"

type SortByOptions = "map" | "tier"

interface Player {
  name: string
  steam_id: string
}

export interface Filter {
  id: number
  mode: Mode
  teleports: boolean
  tier: Tier
  ranked_status: RankedStatus
  notes?: string
}

export interface Course {
  id: number
  name: string
  description?: string
  filters: Filter[]
  mappers: Player[]
}

export interface CourseExt {
  id: number
  map: string
  name: string
  tier: Tier
  ranked_status: RankedStatus
  mappers: Player[]
  created_on: string
  img: string
}

export interface Map {
  id: number
  name: string
  description?: string
  global_status: GlobalStatus
  checksum: number
  workshop_id: number
  courses: Course[]
  mappers: Player[]
  created_on: string
}

export interface MapData {
  total: number
  results: Map[]
}

export interface CourseQuery {
  name: string
  mode: Mode
  teleports: "standard" | "pro"
  tier: Tier | "all"
  sort_by: SortByOptions
  sort_order: "ascending" | "descending"
  created_after: string
  created_before: string
  limit: number
  offset: number
}
