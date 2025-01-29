import type { Profile, ProfileQuery } from "~/types"

export function useProfile() {
  const { $api } = useNuxtApp()

  const route = useRoute()

  const loading = ref(false)
  const error = ref(null)
  const profile = ref<Profile | null>(null)

  const query = reactive<ProfileQuery>({
    player_id: (route.params.steam_id as string) || "",
    mode: "classic",
  })

  watch(query, getProfile)

  async function getProfile() {
    try {
      loading.value = true

      profile.value = await $api(`/players/${query.player_id}/profile`, {
        query: { mode: query.mode },
      })
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
    error,
    query,
    getProfile,
  }
}
