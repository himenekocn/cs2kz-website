import { defineStore } from 'pinia'
import type { PlayerSteam } from '@/types'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      player: null as PlayerSteam | null,
    }
  },
})
