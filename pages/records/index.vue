<script setup lang="ts">
const { query, records, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <section>
      <RecordQuery v-model:query="query" />

      <RecordTable :records="records" :teleports="query.teleports" />
    </section>
  </Main>
</template>
