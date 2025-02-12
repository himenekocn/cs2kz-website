<script setup lang="ts">
const { records, loading, query, getRecords } = useRecords()

getRecords()

function loadRecords() {
  if (records.value.length > 0) {
    query.limit += 30
  }
}
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" detailed />

    <InfiniteScroller :has-data="records.length > 0" :loading="loading" @infinite="loadRecords">
      <RecordTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        class="mt-8"
        detailed
        :query="query"
        :loading="loading"
        :records="records"
      />
    </InfiniteScroller>
  </Main>
</template>
