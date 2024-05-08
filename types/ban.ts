export type BanReason = "auto_strafe" | "auto_bhop"

interface Player {
  name: string
  steam_id: string
}

interface Server {
  id: number
  name: string
}

export interface Ban {
  id: number
  player: Player
  reason: BanReason
  server?: Server
  admin?: Player
  created_on: string
  expires_on?: string
  unban?: Unban
}

export interface Unban {
  id: number
  reason: string
  admin?: Player
  created_on: string
}
