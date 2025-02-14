<script setup lang="ts">
const { maps, loading, query, getMaps } = useMaps()

getMaps()
</script>

<template>
  <Main>
    <MapQuery v-model:query="query" />

    <div v-if="loading" class="mt-8 flex justify-center">
      <IconLoading class="inline" />
    </div>

    <div v-else-if="maps.length > 0" class="overflow-x-auto">
      <MapTiles :query="query" :loading="loading" :maps="maps" />
    </div>

    <div v-else class="mt-8 flex justify-center">
      <p class="text-gray-500">
        {{ $t("common.noData") }}
      </p>
    </div>
  </Main>
</template>
