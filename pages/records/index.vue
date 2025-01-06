<script setup lang="ts">
const { records, loading, query, total, getRecords } = useRecords()

getRecords()
</script>
<template>
  <Main>
    <RecordQuery v-model:query="query" />

    <div v-if="total > 0" class="px-4 py-2 mt-8 border border-gray-700 rounded-md lg:mx-auto lg:w-max">
      <PageHelper v-model:limit="query.limit!" v-model:offset="query.offset!" :total="total" @refresh="getRecords" />
    </div>

    <RecordTable
      v-model:sort-by="query.sort_by"
      v-model:sort-order="query.sort_order"
      :loading="loading"
      :records="records" />
  </Main>
</template>
