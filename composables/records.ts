import type { Record, RecordData, RecordQuery } from "~/types/record"

export function useRecords() {
  const records = ref<Record[] | null>(null)

  const total = ref(0)

  const query = reactive<RecordQuery>({
    mode: "classic",
    player: "",
    course: "",
    server: "",
    styles: ["normal"],
    before: "",
    after: "",
    limit: 30,
    offset: 0,
  })

  watch(query, () => {
    getRecords()
  })

  async function getRecords() {
    try {
      const data: RecordData | undefined = await $api("/records", {
        query: validQuery(query),
      })

      if (data) {
        records.value = data.results
        total.value = data.total
      } else {
        records.value = null
      }
    } catch (error) {
      records.value = null
    }
  }

  return {
    query,
    records,
    total,
    getRecords,
  }
}
