<script setup lang="ts">
const { query, currentPage, records, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <section>
      <RecordQuery v-model:query="query" v-model:current-page="currentPage" />

      <RecordTable :records="records" />
    </section>
  </Main>
</template>
