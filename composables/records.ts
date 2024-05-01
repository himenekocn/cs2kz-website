import type { Record, RecordQuery } from "~/types/record"

export function useRecords() {
  const records = ref<Record[] | undefined>([])

  const getRecords = async () => {
    records.value = await $api("/records", { query: validQuery(query) })
  }

  const query = reactive<RecordQuery>({
    mode: "classic",
    player: "",
    course: "",
    server: "",
    style: "normal",
    before: "",
    after: "",
    limit: 100,
  })

  watch(query, () => {
    getRecords()
  })

  return {
    query,
    records,
    getRecords,
  }
}
