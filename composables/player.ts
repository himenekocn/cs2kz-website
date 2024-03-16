import type { Player } from "~/types/player"

export const usePlayer = () =>
  useState<Player | null>("player", () => ({
    steamId: "",
    steamId64: "",
    username: "",
    realname: "",
    country: "",
    profile_url: "",
    avatar_url: "",
  }))
