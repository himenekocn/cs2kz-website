<script setup lang="ts">
import type { Mode } from "~/types"

const props = defineProps<{
  mode: Mode
}>()

const { records, loading, query, getRecords } = useRecords()

watch(
  () => props.mode,
  (mode) => {
    query.mode = mode
  },
)

getRecords()

function loadRecords() {
  if (records.value.length > 0) {
    query.limit += 30
  }
}
</script>

<template>
  <div>
    <p class="text-3xl text-gray-300 font-semibold mb-2">{{ $t("profile.runs.title") }}</p>
    <InfiniteScroller :loading="loading" :has-data="records.length > 0" @infinite="loadRecords">
      <RecordQuery v-model:query="query" />

      <RecordTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :query="query"
        :loading="loading"
        :records="records"
      />
    </InfiniteScroller>
  </div>
</template>
