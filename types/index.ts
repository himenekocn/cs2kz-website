import type { paths, components } from "~/openapi-types"

export type Player = components["schemas"]["PlayerInfo"]

export interface PlayerSteam {
  id: string
  name: string
  country: string
  profile_url: string
  avatar_url: string
}

export type Tier = components["schemas"]["CourseFilterTier"]

export type Mode = components["schemas"]["Mode"]

export type Style = components["schemas"]["Styles"]

export type MapState = components["schemas"]["MapState"]

export type Map = components["schemas"]["Map"]

export type MapResponse = paths["/maps"]["get"]["responses"]["200"]["content"]["application/json"]

export type CourseFilterState = components["schemas"]["CourseFilterState"]

export type CourseFilter = components["schemas"]["CourseFilter"]
export type CourseFilters = components["schemas"]["CourseFilters"]

export type Course = components["schemas"]["Course"]

export interface CourseExt {
  id: string
  map: string
  name: string
  tier: Tier
  state: CourseFilterState
  mappers: Player[]
  created_on: string
  img: string
}

export interface CourseQuery {
  name: string
  mode: Mode
  has_teleports: "overall" | "pro"
  tier?: Tier
  sort_by: "map" | "tier" | "created_on"
  sort_order: "ascending" | "descending"
  limit: number
  offset: number
}

export type Record = components["schemas"]["Record"]

export type RecordResponse = paths["/records"]["get"]["responses"]["200"]["content"]["application/json"]

export interface RecordQuery {
  mode: Mode
  has_teleports: "overall" | "tp" | "pro"
  top: boolean
  max_rank?: number
  player: string
  map: string
  course: string
  server: string
  styles: Style[]
  sort_by: "submission-date" | "time"
  sort_order: "ascending" | "descending"
  limit: number
  offset: number
}

export type Server = components["schemas"]["Server"]

export type ServerResponse = paths["/servers"]["get"]["responses"]["200"]["content"]["application/json"]

export interface ServerWithInfo extends Server {
  info: ServerInfo | null
}

export interface ServerInfo {
  name: string
  map: string
  players: { online: number; max: number; bots: number }
  hasPassword: boolean
  VAC: boolean
  version: string
  ping: number
  connection: "good" | "mid" | "bad"
}

export interface ServerQuery {
  name: string
  host: string
  owned_by: string
  limit: number
  offset: number
}

export interface Profile {
  id: string
  name: string
  rating: number
  first_joined_at: string
}

export interface ProfileQuery {
  player_id: string
  mode: Mode
}
