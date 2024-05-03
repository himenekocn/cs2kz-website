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

export interface ServerQuery {
  name?: string
  ip_address?: string
  owned_by?: string
  created_after?: string
  created_before?: string
  limit: number
  offset: number
}
