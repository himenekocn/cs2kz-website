<script setup lang="ts">
const player = usePlayer()

const { records, loading, query, total, getRecords } = useRecords()

// it will trigger data fetch, so no need to call getRecords
query.player = player.value!.steam_id64
</script>

<template>
  <div>
    <p class="text-3xl text-gray-300 font-semibold mb-2">Runs</p>

    <UCard :ui="{ body: { padding: '' } }">
      <ProfileRunsQuery v-model="query" />

      <div class="mx-auto py-3 border-b border-gray-800">
        <PageHelper
          v-if="total > 0"
          v-model:limit="query.limit!"
          v-model:offset="query.offset!"
          :total="total"
          @refresh="getRecords"
        />
      </div>

      <ProfileRunsTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :records="records"
        :loading="loading"
      />
    </UCard>
  </div>
</template>
