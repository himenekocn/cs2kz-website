<script setup lang="ts">
import type { Record } from "~/types"

const props = defineProps<{
  records: Record[]
  loading: boolean
}>()

const sortBy = defineModel<"date" | "time">("sortBy", { required: true })
const sortOrder = defineModel<"ascending" | "descending">("sortOrder", {
  required: true,
})

const { t } = useI18n()

const sort = ref({
  column: "date",
  direction: "desc" as const,
})

const columns = computed(() => {
  return [
    {
      key: "map",
      label: t("records.title.map"),
    },
    {
      key: "course",
      label: t("records.title.course"),
    },
    {
      key: "tier",
      label: t("records.title.tier"),
    },
    {
      key: "player",
      label: t("records.title.player"),
    },
    {
      key: "time",
      label: t("records.title.time"),
      sortable: true,
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
      sortable: true,
    },
  ]
})

const rows = computed(() => {
  return props.records.map((record) => {
    return {
      map: record.course.map_name,
      course: record.course.name,
      tier: record.course.tier,
      player: record.player.name,
      player_id: record.player.steam_id,
      time: formatTime(record.time),
      server: record.server.name,
      teleports: record.teleports,
      date: toLocal(record.created_on),
    }
  })
})

function onSort(sort: { column: "date" | "time"; direction: "asc" | "desc" }) {
  sortBy.value = sort.column
  sortOrder.value = sort.direction === "asc" ? "ascending" : "descending"
}
</script>

<template>
  <div class="mt-8">
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        v-model:sort="sort"
        :loading="loading"
        :ui="{
          th: { size: 'text-base', padding: 'py-2' },
          td: { size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :columns="columns"
        :rows="rows"
        @update:sort="onSort"
      >
        <template #map-data="{ row }">
          <NuxtLink
            :to="`/maps/${row.map}`"
            class="text-slate-300 font-medium text-lg hover:text-slate-200"
          >
            {{ row.map }}
          </NuxtLink>
        </template>

        <template #course-data="{ row }">
          <NuxtLink
            :to="`/maps/${row.map}?course=${row.name}`"
            class="text-lg hover:text-slate-300"
          >
            {{ row.course }}
          </NuxtLink>
        </template>

        <template #tier-data="{ row }">
          <span
            :style="{ color: getTierColor(row.tier as string) }"
            class="text-lg font-medium"
          >
            {{ getNumTier(row.tier as string) }}
          </span>
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
          <span>{{ row.teleports }}</span>
        </template>

        <template #date-data="{ row }">
          <span class="whitespace-nowrap">{{ row.date }}</span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
