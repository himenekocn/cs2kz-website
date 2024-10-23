<script setup lang="ts">
import type { Record } from "~/types"

const props = defineProps<{
  records: Record[] | null
  loading: boolean
}>()

const { t } = useI18n()

const columns = computed(() => {
  return [
    {
      key: "rank",
      label: t("records.title.rank"),
    },
    {
      key: "player",
      label: t("records.title.player"),
    },
    {
      key: "time",
      label: t("records.title.time"),
    },
    {
      key: "server",
      label: t("records.title.server"),
    },
    {
      key: "teleports",
      label: t("records.title.teleports"),
    },
    {
      key: "date",
      label: t("records.title.date"),
    },
  ]
})

const rows = computed(() => {
  return props.records?.map((record, index) => ({
    rank: `#${index + 1}`,
    player: record.player.name,
    time: formatTime(record.time),
    server: record.server.name,
    teleports: record.teleports,
    date: toLocal(record.created_on),
  }))
})
</script>

<template>
  <div class="mt-2">
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        :ui="{
          th: { size: 'text-base', padding: 'py-2' },
          td: { size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :columns="columns"
        :rows="rows"
      >
        <template #rank-data="{ row }">
          {{ row.rank }}
        </template>

        <template #player-data="{ row }">
          <NuxtLink
            :to="`/profile/${row.player_id}`"
            class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400"
          >
            {{ row.player }}
          </NuxtLink>
        </template>

        <template #time-data="{ row }">
          <span class="text-slate-300">{{ row.time }}</span>
        </template>

        <template #server-data="{ row }">
          <span class="italic whitespace-nowrap">{{ row.server }}</span>
        </template>

        <template #teleports-data="{ row }">
          {{ row.teleports }}
        </template>

        <template #date-data="{ row }">
          {{ row.date }}
        </template>
      </UTable>
    </UCard>
  </div>
</template>
