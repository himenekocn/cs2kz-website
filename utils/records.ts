import type { RecordQuery, Record } from "~/types/record"
import { validQuery } from "./query"

const config = useRuntimeConfig()

export async function fetchRecords(query: RecordQuery): Promise<Record[]> {
  const data = await $fetch(`${config.public.apiBase}/records`, {
    query: validQuery(query),
  })

  // console.log('data', data);

  return data as Record[]
}
