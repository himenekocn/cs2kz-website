import type { paths, components } from "~/schema"

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

export type Styles = components["schemas"]["Styles"]

export type RankedStatus = components["schemas"]["RankedStatus"]

export type GlobalStatus = components["schemas"]["GlobalStatus"]

export type Filter = components["schemas"]["Filter"]

export type Course = components["schemas"]["Course"]

export interface CourseExt {
  id: number
  map: string
  name?: string | null
  tier: Tier
  ranked_status: RankedStatus
  mappers: Player[]
  created_on: string
  img: string
}

export interface CourseQuery {
  name: string | null
  mode: Mode | null
  teleports: boolean
  tier: Tier | "all"
  sort_by: "map" | "tier"
  sort_order: "ascending" | "descending"
  created_after: string | null
  created_before: string | null
  limit: number
  offset: number
}

export type Map = components["schemas"]["FetchMapResponse"]

export type MapResponse =
  paths["/maps"]["get"]["responses"]["200"]["content"]["application/json"]

export type RecordResponse =
  paths["/records"]["get"]["responses"]["200"]["content"]["application/json"]

export type Record = components["schemas"]["FetchRecordResponse"]

export type RecordQuery = Exclude<
  paths["/records"]["get"]["parameters"]["query"],
  undefined
>

export type ServerResponse =
  paths["/servers"]["get"]["responses"]["200"]["content"]["application/json"]

export type Server = components["schemas"]["FetchServerResponse"]

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

export type ServerQuery = Exclude<
  paths["/servers"]["get"]["parameters"]["query"],
  undefined
>
