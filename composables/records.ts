import type { Record, RecordResponse, RecordQuery } from "~/types"

export function useRecords() {
  const loading = ref(false)
  const records = ref<Record[] | null>(null)

  const total = ref(0)

  const query = reactive<RecordQuery>({
    mode: "classic",
    player: null,
    course: null,
    server: null,
    styles: null,
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
      const data: RecordResponse | undefined = await $api("/records", {
        query: validQuery(query),
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
