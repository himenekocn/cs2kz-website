<script setup lang="ts">
const { query, total, records, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <section>
      <RecordQuery v-model:query="query" />

      <RecordPagination :total="total" :query="query" />

      <RecordTable :records="records" />
    </section>
  </Main>
</template>
