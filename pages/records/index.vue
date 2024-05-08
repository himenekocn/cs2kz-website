<script setup lang="ts">
const { records, loading, error, query, total, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <PageHelper
      :total="total"
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      @refresh="getRecords"
    />

    <RecordTable :loading="loading" :error="error" :records="records" />
  </Main>
</template>
