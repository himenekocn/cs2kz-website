<script setup lang="ts">
const { query, total, records, loading, error, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <PageHelper :total="total" :query="query" @refresh="getRecords" />

    <RecordTable :loading="loading" :error="error" :records="records" />
  </Main>
</template>
