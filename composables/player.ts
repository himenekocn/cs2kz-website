import type { Player } from "~/types/player"

export const usePlayer = () =>
  useState<Player | null>("player", () => ({
    steam_id: "",
    steam_id64: "",
    username: "",
    realname: "",
    country: "",
    profile_url: "",
    avatar_url: "",
  }))
