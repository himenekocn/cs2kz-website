<script setup lang="ts">
import type { Server, ServerQuery } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  servers: Server[]
  loading: boolean
  query: ServerQuery
}>()

const activeServers = computed(() => {
  return props.servers.filter((server) => server.a2s_info !== null)
})
</script>

<template>
  <div class="mt-8 p-1 mx-auto w-max">
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-10 lg:place-items-center">
      <ServerCard v-for="server in activeServers" :key="server.id" :query="query" :server="server" />
    </div>
  </div>
</template>
