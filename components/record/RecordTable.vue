<script setup lang="ts">
import type { Record } from "~/types"
import RecordDetail from "./RecordDetail.vue"

defineProps<{
  records: Record[]
  loading: boolean
}>()

const sortBy = defineModel<"submission-date" | "time">("sortBy", { required: true })
const sortOrder = defineModel<"ascending" | "descending">("sortOrder", {
  required: true,
})

const { t } = useI18n()

const { expand, toggleSelect } = useExpand()

const sort = ref({
  column: "submitted_at",
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
      key: "nub_rank",
      label: t("records.title.nubRank"),
    },
    {
      key: "pro_rank",
      label: t("records.title.proRank"),
    },
    {
      key: "submitted_at",
      label: t("records.title.date"),
      sortable: true,
    },
  ]
})

function onSort(sort: { column: "submitted_at" | "time"; direction: "asc" | "desc" }) {
  sortBy.value = sort.column === "submitted_at" ? "submission-date" : "time"
  sortOrder.value = sort.direction === "asc" ? "ascending" : "descending"
}
</script>

<template>
  <div class="mt-8">
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        v-model:expand="expand"
        v-model:sort="sort"
        :loading="loading"
        :ui="{
          th: { size: 'text-base', padding: 'py-2' },
          td: { size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :columns="columns"
        :rows="records"
        @select="toggleSelect"
        @update:sort="onSort">
        <template #map-data="{ row }">
          <NuxtLink :to="`/maps/${row.map}`" class="text-slate-300 font-semibold text-lg hover:text-slate-200">
            {{ row.map.name }}
          </NuxtLink>
        </template>

        <template #course-data="{ row }">
          <NuxtLink :to="`/maps/${row.map}?course=${row.course}`" class="text-lg hover:text-slate-300">
            {{ row.course.name }}
          </NuxtLink>
        </template>

        <template #tier-data="{ row }">
          <span :style="{ color: getTierColor(row.course.tier) }" class="text-lg font-medium">
            {{ getNumTier(row.course.tier) }}
          </span>
        </template>

        <template #player-data="{ row }">
          <NuxtLink :to="`/profile/${row.player.id}`" class="text-cyan-600 whitespace-nowrap hover:text-cyan-400">
            {{ row.player.name }}
          </NuxtLink>
        </template>

        <template #time-data="{ row }">
          <div class="flex items-start gap-1">
            <span class="text-slate-300">{{ formatTime(row.time) }}</span>
            <div
              class="flex justify-center items-center text-gray-100 text-[10px] leading-3 rounded-sm px-1"
              :class="{ 'bg-yellow-600': row.teleports > 0, 'bg-blue-600': row.teleports === 0 }">
              {{ row.teleports > 0 ? "TP" : "PRO" }}
            </div>
          </div>
        </template>

        <template #server-data="{ row }">
          <span class="">{{ row.nub_rank }}</span>
        </template>

        <template #teleports-data="{ row }">
          <span class="">{{ row.pro_rank }}</span>
        </template>

        <template #submitted_at-data="{ row }">
          <span class="whitespace-nowrap">{{ toLocal(row.submitted_at) }}</span>
        </template>

        <template #expand="{ row }">
          <div class="p-4">
            <RecordDetail detailed :record="row as Record" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<style scoped>
:deep(tr th:first-of-type) {
  width: 1rem;
}
</style>
