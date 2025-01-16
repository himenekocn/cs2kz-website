<script setup lang="ts">
const route = useRoute()

const { records, loading, query, total, getRecords } = useRecords()

query.player = route.params.steam_id as string
</script>

<template>
  <div>
    <p class="text-3xl text-gray-300 font-semibold mb-2">Runs</p>

    <UCard
      :ui="{
        body: { padding: '' },
      }">
      <RecordQuery v-model:query="query" />
      <!-- <ProfileRunsQuery v-model="query" /> -->

      <div v-if="total > 0" class="mx-auto py-3 border-b border-gray-700">
        <PageHelper v-model:limit="query.limit!" v-model:offset="query.offset!" :total="total" @refresh="getRecords" />
      </div>

      <!-- <ProfileRunsTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :records="records"
        :loading="loading"
      /> -->

      <RecordTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :query="query"
        :loading="loading"
        :records="records" />
    </UCard>
  </div>
</template>
