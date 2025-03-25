<script setup lang="ts">
import { useServers } from '@/composables/servers'

const { servers, loading, query } = useServers()

function loadServers() {
  if (servers.value.length > 0) {
    query.limit += 30
  }
}
</script>
<template>
  <div class="max-w-7xl mx-auto justify-center px-2 lg:px-10 py-2 lg:py-6">
    <ServerQuery v-model:query="query" detailed />
    <InfiniteScroller :has-data="servers.length > 0" :loading="loading" @infinite="loadServers">
      <ServerTable :query="query" :loading="loading" :servers="servers" />
    </InfiniteScroller>
  </div>
</template>
