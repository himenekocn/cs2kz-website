<script setup lang="ts">
import type { RecordWithImproved, RecordQuery, RecordResponse } from "~/types"

const props = defineProps<{
  query: RecordQuery
}>()

const { $api } = useNuxtApp()

const history = ref<RecordWithImproved[]>([])

const loading = ref(false)

const rows = computed(() => {
  return history.value.map((record) => ({
    player: record.player.name,
    player_id: record.player.id,
    time: formatTime(record.time),
    timeImproved: record.timeImproved,
    server: record.server.name,
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
    key: "created_on",
    label: "Date",
  },
]

async function getWrProgression() {
  try {
    loading.value = true

    const data: RecordResponse | undefined = await $api("/records", {
      query: validQuery({
        ...toRaw(props.query),
        has_teleports: props.query.has_teleports === "overall" ? null : false,
        sort_by: "submission-date",
        sort_order: "ascending",
        limit: 100000,
      }),
    })

    if (data) {
      history.value = getWrHistory(data.values)
    } else {
      history.value = []
    }
  } catch (error) {
    console.log(error)
    history.value = []
  } finally {
    loading.value = false
  }
}

getWrProgression()
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
      <template #time-data="{ row }">
        <div class="flex items-center gap-2">
          <span>{{ row.time }}</span>
          <span v-if="row.timeImproved > 0" class="text-green-600">{{ `(+${formatTime(row.timeImproved)})` }}</span>
        </div>
      </template>
    </UTable>
  </UCard>
</template>
