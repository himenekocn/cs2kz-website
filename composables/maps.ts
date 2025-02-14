import type { Map, MapResponse, MapQuery } from "~/types"
import { debounce } from "radash"

export function useMaps() {
  const { $api } = useNuxtApp()

  const loading = ref(false)
  const error = ref(null)
  const maps = ref<Map[]>([])

  const total = ref(0)

  const query = reactive<MapQuery>({
    name: "",
    mode: "classic",
    state: "approved",
    leaderboardType: "overall",
    limit: 30,
    offset: 0,
  })

  const debouncedUpdate = debounce({ delay: 300 }, getMaps)

  watch([() => query.name], debouncedUpdate)

  watch([() => query.mode, () => query.state, () => query.limit, () => query.offset], getMaps)

  async function getMaps() {
    try {
      loading.value = true

      const data: MapResponse | undefined = await $api("/maps", {
        query: validQuery(query),
      })
      if (data) {
        total.value = data.total
        maps.value = data.values
      } else {
        maps.value = []
        total.value = 0
      }
    } catch (err) {
      console.error(err)
      maps.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  return {
    maps,
    loading,
    error,
    query,
    total,
    getMaps,
  }
}
