import type { Record, RecordQuery, RecordResponse } from "~/types"
import { debounce } from "radash"

export function useRecords() {
  const { $api } = useNuxtApp()

  const route = useRoute()

  const loading = ref(false)
  const records = ref<Record[]>([])

  const total = ref(0)

  // query that corresponds to the actual input
  const query = reactive<RecordQuery>({
    mode: "classic",
    has_teleports: "overall",
    top: true,
    player: (route.params.steam_id as string) || "",
    map: "",
    course: "",
    server: "",
    styles: [],
    sort_by: "submission-date",
    sort_order: "descending",
    limit: 30,
    offset: 0,
  })

  const debouncedUpdate = debounce({ delay: 300 }, getRecords)

  watch([() => query.player, () => query.map, () => query.course, () => query.server], debouncedUpdate)

  watch(
    [
      () => query.mode,
      () => query.has_teleports,
      () => query.top,
      () => query.max_rank,
      () => query.styles,
      () => query.sort_by,
      () => query.sort_order,
      () => query.limit,
      () => query.offset,
    ],
    getRecords,
  )

  async function getRecords() {
    try {
      loading.value = true

      const transformedQuery = {
        ...toRaw(query),
        has_teleports: query.has_teleports === "overall" ? null : query.has_teleports === "pro" ? false : true,
        styles: query.styles.length === 0 ? null : query.styles,
      }

      const data: RecordResponse | undefined = await $api("/records", {
        query: validQuery(transformedQuery),
      })

      if (data) {
        records.value = data.values
        total.value = data.total
      } else {
        records.value = []
        total.value = 0
      }
    } catch (error) {
      console.error(error)

      records.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  return {
    records,
    loading,
    query,
    total,
    getRecords,
  }
}
