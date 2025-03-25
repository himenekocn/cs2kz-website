import { defineStore } from 'pinia'
import type { Mode, LeaderboardType } from '@/types'

export const useCourseQueryStore = defineStore('course-query', {
  state: () => {
    return {
      course: '',
      mode: 'classic' as Mode,
      leaderboardType: 'overall' as LeaderboardType,
    }
  },
})
