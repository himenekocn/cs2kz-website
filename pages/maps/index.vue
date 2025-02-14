<script setup lang="ts">
const { maps, loading, query, getMaps } = useMaps()

getMaps()
</script>

<template>
  <Main>
    <MapQuery v-model:query="query" />

    <MapTiles :query="query" :loading="loading" :maps="maps" />
  </Main>
</template>
