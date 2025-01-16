<script setup lang="ts">
import type { Mode } from "~/types"

// const route = useRoute()

const props = defineProps<{
  mode: Mode
}>()

const { records, loading, query, total, getRecords } = useRecords()

// query.player = route.params.steam_id as string
query.player = "76648292156514919"

watch(
  () => props.mode,
  (mode) => {
    query.mode = mode
  },
)
</script>

<template>
  <div>
    <p class="text-3xl text-gray-300 font-semibold mb-2">{{ $t("profile.runs.title") }}</p>

    <UCard
      :ui="{
        body: { padding: '' },
      }">
      <RecordQuery v-model:query="query" />

      <div v-if="total > 0" class="mx-auto py-3">
        <PageHelper v-model:limit="query.limit!" v-model:offset="query.offset!" :total="total" @refresh="getRecords" />
      </div>

      <RecordTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :query="query"
        :loading="loading"
        :records="records" />
    </UCard>
  </div>
</template>
