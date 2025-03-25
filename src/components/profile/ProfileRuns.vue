<script setup lang="ts">
import { watch } from 'vue'
import type { Mode } from '@/types'
import { useRoute } from 'vue-router'
import { useRecords } from '@/composables/records'

const props = defineProps<{
  mode: Mode
}>()

const route = useRoute()

const { records, loading, query } = useRecords({ player: route.params.steamId as string })

watch(
  () => props.mode,
  (mode) => {
    query.mode = mode
  },
)

function loadRecords() {
  if (records.value.length > 0) {
    query.limit += 30
  }
}
</script>

<template>
  <div>
    <p class="text-3xl text-gray-300 font-semibold mb-2">{{ $t('profile.runs.title') }}</p>
    <InfiniteScroller :loading="loading" :has-data="records.length > 0" @infinite="loadRecords">
      <RecordQuery v-model:query="query" />

      <RecordTable
        v-model:sort-by="query.sort_by"
        v-model:sort-order="query.sort_order"
        :query="query"
        :loading="loading"
        :records="records"
      />
    </InfiniteScroller>
  </div>
</template>
