<script setup lang="ts">
const { records, loading, query, total, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <PageHelper
      v-if="total > 0"
      v-model:limit="query.limit!"
      v-model:offset="query.offset!"
      :total="total"
      @refresh="getRecords"
    />

    <RecordTable
      v-model:sort-by="query.sort_by"
      v-model:sort-order="query.sort_order"
      :loading="loading"
      :records="records"
    />
  </Main>
</template>
