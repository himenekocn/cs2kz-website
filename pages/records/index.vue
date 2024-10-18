<script setup lang="ts">
const { records, loading, query, total, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <PageHelper
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      :total="total"
      @refresh="getRecords"
    />

    <RecordTable :loading="loading" :records="records" />
  </Main>
</template>
