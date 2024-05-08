import type { Record, RecordData, RecordQuery } from "~/types/record"

export function useRecords() {
  const loading = ref(false)
  const error = ref(null)
  const records = ref<Record[] | null>(null)

  const total = ref(0)

  const query = reactive<RecordQuery>({
    mode: "classic",
    player: "",
    course: "",
    server: "",
    styles: "normal",
    sort_by: "date",
    sort_order: "descending",
    created_before: "",
    created_after: "",
    limit: 30,
    offset: 0,
  })

  watch(query, () => {
    getRecords()
  })

  async function getRecords() {
    try {
      loading.value = true
      const data: RecordData | undefined = await $api("/records", {
        query: validQuery(query),
      })

      if (data) {
        records.value = data.results
        total.value = data.total
      } else {
        records.value = []
      }
    } catch (err: any) {
      error.value = err.data
      records.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    records,
    loading,
    error,
    query,
    total,
    getRecords,
  }
}
