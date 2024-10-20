import type { Record, RecordQuery, RecordResponse } from "~/types"

export function useRecords() {
  const loading = ref(false)
  const records = ref<Record[] | null>(null)

  const total = ref(0)

  // query that corresponds to the actual input
  const query = reactive<RecordQuery>({
    mode: "classic",
    has_teleports: "all",
    player: "",
    course: "",
    server: "",
    styles: [],
    sort_by: "date",
    sort_order: "descending",
    created_before: null,
    created_after: null,
    limit: 30,
    offset: 0,
  })

  watch(query, () => {
    getRecords()
  })

  async function getRecords() {
    try {
      loading.value = true
      const transformedQuery = {
        ...toRaw(query),
        has_teleports:
          query.has_teleports === "all" ? null : query.has_teleports,
        styles: query.styles.length === 0 ? null : query.styles,
      }
      const data: RecordResponse | undefined = await $api("/records", {
        query: validQuery(transformedQuery),
      })

      if (data) {
        records.value = data.records
        total.value = data.total
      } else {
        records.value = []
      }
    } catch (err) {
      records.value = null
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
