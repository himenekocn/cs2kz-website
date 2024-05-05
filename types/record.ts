import type { Tier, Style, Mode, RankedStatus } from "./common"

export interface Record {
  id: number
  player: {
    steam_id: string
    name: string
  }
  map: {
    id: number
    name: string
  }
  course: {
    id: number
    name: string
    tier: Tier
  }
  server: {
    id: number
    name: number
  }
  mode: Mode
  ranked_status: RankedStatus
  style: string
  teleports: number
  time: number
  bhop_stats: {
    perfs: number
    tick0: number
    tick1: number
    tick2: number
    tick3: number
    tick4: number
    tick5: number
    tick6: number
    tick7: number
    tick8: number
  }
  plugin_version: string
  created_on: string
}

export interface RecordData {
  total: number
  results: Record[]
}

// without mode
export interface RecordQuery {
  mode: Mode
  player?: string
  course?: string
  server?: string
  teleports?: boolean
  styles: string
  sort_by: "time" | "date"
  sort_order: "ascending" | "descending"
  after?: string
  before?: string
  limit: number
  offset: number
}
