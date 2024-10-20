import type { paths, components } from "~/schema"

type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>
}

export type Player = components["schemas"]["PlayerInfo"]

export interface PlayerSteam {
  steam_id: string
  steam_id64: string
  username: string
  realname: string
  country: string
  profile_url: string
  avatar_url: string
}

export type Tier = components["schemas"]["Tier"]

export type Mode = components["schemas"]["Mode"]

export type Style = components["schemas"]["Styles"]

export type RankedStatus = components["schemas"]["RankedStatus"]

export type GlobalStatus = components["schemas"]["GlobalStatus"]

export type Filter = RemoveNull<components["schemas"]["Filter"]>

export type Course = RemoveNull<components["schemas"]["Course"]>

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

export interface CourseQuery {
  name: string
  mode: Mode
  teleports: boolean
  tier: Tier | "all"
  sort_by: "map" | "tier" | "created_on"
  sort_order: "ascending" | "descending"
  created_after: string | null
  created_before: string | null
  limit: number
  offset: number
}

export type Map = RemoveNull<components["schemas"]["FetchMapResponse"]>

export type MapResponse =
  paths["/maps"]["get"]["responses"]["200"]["content"]["application/json"]

export type RecordResponse =
  paths["/records"]["get"]["responses"]["200"]["content"]["application/json"]

export type Record = RemoveNull<components["schemas"]["FetchRecordResponse"]>

export interface RecordQuery {
  mode: Mode
  has_teleports: boolean | "all"
  player: string
  course: string
  server: string
  styles: Style[]
  sort_by: "date" | "time"
  sort_order: "ascending" | "descending"
  created_before: string | null
  created_after: string | null
  limit: number
  offset: number
}
export type ServerResponse =
  paths["/servers"]["get"]["responses"]["200"]["content"]["application/json"]

export type Server = RemoveNull<components["schemas"]["FetchServerResponse"]>

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
  created_after: string | null
  created_before: string | null
  limit: number
  offset: number
}
