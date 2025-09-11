import { ref, reactive, watch } from 'vue'
import type { Profile, ProfileQuery } from '@/types'
import { api } from '@/utils'

export function useProfile(playerId: string) {
  const loading = ref(false)
  const profile = ref<Profile | null>(null)

  const query = reactive<ProfileQuery>({
    player_id: playerId,
    mode: 'classic',
  })

  watch(query, getProfile)

  getProfile()

  async function getProfile() {
    try {
      loading.value = true

      const { data } = await api.get(`/players/${query.player_id}/profile`, {
        params: { mode: query.mode },
      })

      if (data) {
        profile.value = { ...data, rating: data.rating * 0.1 }
      }
    } catch (err) {
      console.error(err)
      profile.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    query,
  }
}
