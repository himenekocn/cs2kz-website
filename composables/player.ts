import type { Player } from "~/types/player"

export const usePlayer = () => useState<Player | null>("player", () => null)
