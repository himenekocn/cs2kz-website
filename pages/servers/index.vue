<script setup lang="ts">
const { servers, loading, error, query, getServers } = useServers()

getServers()

function loadServers() {
  if (servers.value.length > 0) {
    query.limit += 30
  }
}
</script>
<template>
  <Main class="lg:w-2/3 mx-auto">
    <ServerQuery v-model:query="query" />

    <InfiniteScroller @infinite="loadServers">
      <ServerTable :loading="loading" :error="error" :servers="servers" />
    </InfiniteScroller>
  </Main>
</template>
