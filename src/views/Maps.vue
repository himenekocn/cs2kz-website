<script setup lang="ts">
import { useMaps } from '@/composables/maps'

const { maps, loading, query } = useMaps()
</script>

<template>
  <Main>
    <MapQuery v-model:query="query" />

    <div v-if="loading" class="mt-8 flex justify-center">
      <IconLoading class="inline" />
    </div>

    <div v-else-if="maps.length > 0" class="overflow-y-visible">
      <MapTiles :query="query" :loading="loading" :maps="maps" />
    </div>

    <div v-else class="mt-8 flex justify-center">
      <p class="text-gray-500">
        {{ $t('common.noData') }}
      </p>
    </div>
  </Main>
</template>
