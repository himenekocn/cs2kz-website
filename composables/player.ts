import type { PlayerSteam } from "~/types"

export const usePlayer = () =>
  useState<PlayerSteam | null>("player", () => null)
