<script setup lang="ts">
import { useServers } from '@/composables/servers'

const { servers, loading, query } = useServers()
</script>
<template>
  <div class="mx-auto px-2 lg:px-10 py-2 lg:py-4">
    <ServerQuery v-model:query="query" detailed />
    <ServerTiles class="mt-4 lg:mt-6" :query="query" :loading="loading" :servers="servers" />
  </div>
</template>
