<script setup lang="ts">
const { query, total, records, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <PageHelper :total="total" :query="query" />

    <RecordTable :records="records" />
  </Main>
</template>
