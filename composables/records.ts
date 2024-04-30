import type { Record, RecordQuery } from "~/types/record"

export function useRecords() {
  const records = ref<Record[]>([])

  const getRecords = async () => {
    try {
      records.value = await fetchRecords(toRaw(query))
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: toErrorMsg(error),
        fatal: true,
      })
    }
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
