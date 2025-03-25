import type { TableRow } from '@nuxt/ui'
import type { Record } from '@/types'
import { ref } from 'vue'

export function useExpand() {
  const openedRow = ref<TableRow<Record> | null>(null)

  function toggleExpand(row: TableRow<Record>) {
    if (!openedRow.value) {
      openedRow.value = row
    } else if (openedRow.value.original.id !== row.original.id) {
      openedRow.value.toggleExpanded()
      openedRow.value = row
    } else {
      openedRow.value = null
    }
    row.toggleExpanded()
  }

  return { toggleExpand }
}
