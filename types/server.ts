export interface Server {
  id: number
  name: string
  ip_address: string
  owner: {
    name: string
    steam_id: string
  }
  created_on: string
}

export interface ServerData {
  total: number
  results: Server[]
}

export interface ServerWithInfo extends Server {
  info: ServerInfo | null
}

export interface ServerInfo {
  protocol: number
  name: string
  map: string
  folder: string
  game: string
  appID: number
  players: { online: number; max: number; bots: number }
  type: string
  OS: string
  hasPassword: boolean
  VAC: boolean
  version: string
  gamePort: number
  steamID: bigint
  keywords: string[]
  gameID: bigint
  ping: number
}

export interface ServerQuery {
  name?: string
  ip_address?: string
  owned_by?: string
  created_after?: string
  created_before?: string
  limit: number
  offset: number
}
