import type { TableRow } from "#ui/types"

interface ExpandData {
  openedRows: TableRow[]
  row: TableRow
}

export function useExpand() {
  const expand = ref<ExpandData>({
    openedRows: [],
    row: {},
  })

  function toggleSelect(row: TableRow) {
    const openedRows = expand.value.openedRows
    if (openedRows.length === 0) {
      expand.value.openedRows = [row]
    } else if (openedRows[0].id === row.id) {
      // how is `openedRows[0]` possibly undefined???
      expand.value.openedRows = []
    } else {
      expand.value.openedRows = [row]
    }
  }

  return { expand, toggleSelect }
}
