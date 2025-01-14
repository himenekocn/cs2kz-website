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
      key: "nub_points",
      label: t("records.title.nubPoints"),
    },
    {
      key: "pro_points",
      label: t("records.title.proPoints"),
    },
    {
      key: "teleports",
      label: t("records.title.teleports"),
    },
    {
      key: "date",
      label: t("records.title.date"),
    },
    {
      key: "server",
      label: t("records.title.server"),
    },
  ]
})

const rows = computed(() => {
  return props.records?.map((record, index) => ({
    rank: `#${index + 1}`,
    ...record,
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
        :rows="rows">
        <template #rank-data="{ row }">
          {{ row.rank }}
        </template>

        <template #player-data="{ row }">
          <NuxtLink
            :to="`/profile/${row.player_id}`"
            class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400">
            {{ row.player.name }}
          </NuxtLink>
        </template>

        <template #time-data="{ row }">
          <span class="text-slate-300">{{ formatTime(row.time) }}</span>
        </template>

        <template #nub_points-data="{ row }">
          <span class="text-slate-300">{{ row.nub_points || "-" }}</span>
        </template>

        <template #pro_points-data="{ row }">
          <span class="italic whitespace-nowrap">{{ row.pro_points || "-" }}</span>
        </template>

        <template #teleports-data="{ row }">
          {{ row.teleports }}
        </template>

        <template #date-data="{ row }">
          {{ row.submitted_at }}
        </template>

        <template #server-data="{ row }">
          <span class="italic text-slate-300">{{ row.server.name }}</span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
