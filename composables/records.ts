import type { Record, RecordQuery } from "~/types/record"

export function useRecords() {
  const records = ref<Record[] | undefined>([])

  const currentPage = ref(1)

  const query = reactive<RecordQuery>({
    mode: "classic",
    player: "",
    course: "",
    server: "",
    style: "normal",
    before: "",
    after: "",
    limit: 30,
    offset: 0,
  })

  watch(query, () => {
    getRecords()
  })

  async function getRecords() {
    records.value = await $api("/records", { query: validQuery(query) })
  }

  return {
    query,
    records,
    currentPage,
    getRecords,
  }
}
