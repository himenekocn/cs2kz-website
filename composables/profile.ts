import type { Profile, ProfileQuery } from "~/types"

export function useProfile() {
  const { $api } = useNuxtApp()

  const loading = ref(false)
  const error = ref(null)
  const profile = ref<Profile>()

  const query = reactive<ProfileQuery>({
    player_id: "",
    mode: "classic",
  })

  watch(query, getProfile)

  async function getProfile() {
    try {
      loading.value = true

      profile.value = await $api(`/players/${query.player_id}/profile`, {
        query: { mode: query.mode },
      })

      console.log("profile data", profile.value)
    } catch (err) {
      console.error(err)
      profile.value = undefined
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
