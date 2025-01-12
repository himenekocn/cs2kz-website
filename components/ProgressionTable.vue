<script setup lang="ts">
import type { Record } from "~/types"

const props = defineProps<{
  history: Record[]
  loading: boolean
}>()

const rows = computed(() => {
  return props.history.map((record) => ({
    player: record.player.name,
    player_id: record.player.id,
    time: formatTime(record.time),
    server: record.server.name,
    teleports: record.teleports,
    created_on: toLocal(record.submitted_at),
  }))
})

const uiTable = {
  tr: {
    selected: "bg-gray-800/50",
    active: "hover:bg-gray-800/50 cursor-pointer",
    base: "hover:bg-gray-800 transition ease-in",
  },
  th: {
    color: "text-white",
    size: "text-base",
    padding: "py-3",
  },
  td: {
    size: "text-base",
    color: "text-gray-400",
    font: "Poppings",
    padding: "py-3",
  },
}

const columns = [
  {
    key: "player",
    label: "Contender",
  },
  {
    key: "time",
    label: "Time",
  },
  {
    key: "server",
    label: "Server",
  },
  {
    key: "teleports",
    label: "TPs",
  },
  {
    key: "created_on",
    label: "Date",
  },
]
</script>

<template>
  <UCard
    :ui="{
      body: { padding: '' },
      divide: 'divide-y divide-gray-800',
      header: { padding: 'py-2' },
    }">
    <template #header>
      <div class="flex justify-center">
        <p class="text-gray-300">WR Progression</p>
      </div>
    </template>

    <UTable :ui="uiTable" :loading="loading" :columns="columns" :rows="rows">
      <template #player-data="{ row }">
        <NuxtLink
          :to="`/profile/${row.player_id}`"
          class="py-2 px-2 lg:px-0 text-cyan-600 text-lg whitespace-nowrap hover:text-cyan-400">
          {{ row.player }}
        </NuxtLink>
      </template>
    </UTable>
  </UCard>
</template>
