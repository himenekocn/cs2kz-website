<script setup lang="ts">
import type { Record, RecordQuery } from "~/types"
import RecordDetail from "./RecordDetail.vue"
import type { TableRow } from "#ui/types"

const props = defineProps<{
  detailed?: boolean
  records: Record[]
  query: RecordQuery
  loading: boolean
}>()

const sortBy = defineModel<"submission-date" | "time">("sortBy", { required: true })
const sortOrder = defineModel<"ascending" | "descending">("sortOrder", {
  required: true,
})

const { t } = useI18n()

const { expand, toggleSelect } = useExpand()

const courseQuery = useCourseQuery()

const sort = ref({
  column: "submitted_at",
  direction: "desc" as const,
})

const columns = computed(() => {
  const cols = [
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

  if (props.detailed) {
    cols.splice(3, 0, {
      key: "player",
      label: t("records.title.player"),
    })
  }

  return cols
})

function onSort(sort: { column: "submitted_at" | "time"; direction: "asc" | "desc" }) {
  sortBy.value = sort.column === "submitted_at" ? "submission-date" : "time"
  sortOrder.value = sort.direction === "asc" ? "ascending" : "descending"
}

function goToCourse(row: TableRow) {
  courseQuery.value.course = row.course.name
  courseQuery.value.mode = props.query.mode
  courseQuery.value.has_teleports = props.query.has_teleports
  navigateTo(`/maps/${row.map.name}`)
}
</script>

<template>
  <UCard :ui="{ body: { padding: '' } }">
    <UTable
      v-model:expand="expand"
      v-model:sort="sort"
      :loading="loading"
      :ui="{
        th: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
        td: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
        tr: { base: 'hover:bg-gray-800 transition ease-in' },
      }"
      :columns="columns"
      :rows="records"
      @select="toggleSelect"
      @update:sort="onSort"
    >
      <template #map-data="{ row }">
        <span class="text-slate-300 font-semibold text-lg hover:text-slate-200" @click.stop="goToCourse(row)">
          {{ row.map.name }}
        </span>
      </template>

      <template #course-data="{ row }">
        <span class="text-lg hover:text-slate-300" @click.stop="goToCourse(row)">
          {{ row.course.name }}
        </span>
      </template>

      <template #tier-data="{ row }">
        <span
          :style="{ color: getTierColor(row.teleports > 0 ? row.course.nub_tier : row.course.pro_tier) }"
          class="text-lg font-medium"
        >
          {{ getNumTier(row.teleports > 0 ? row.course.nub_tier : row.course.pro_tier) }}
        </span>
      </template>

      <template v-if="detailed" #player-data="{ row }">
        <span
          class="text-cyan-600 whitespace-nowrap hover:text-cyan-400"
          @click.stop="navigateTo(`/profile/${row.player.id}`)"
        >
          {{ row.player.name }}
        </span>
      </template>

      <template #time-data="{ row }">
        <div class="flex items-start gap-1">
          <span class="text-slate-300">{{ formatTime(row.time) }}</span>
          <div
            class="flex justify-center items-center text-gray-100 text-[10px] leading-3 rounded-sm px-1"
            :class="{ 'bg-yellow-600': row.teleports > 0, 'bg-blue-600': row.teleports === 0 }"
          >
            {{ row.teleports > 0 ? "TP" : "PRO" }}
          </div>
        </div>
      </template>

      <template #nub_rank-data="{ row }">
        <IconMedalFirst v-if="row.nub_rank === 1" />
        <IconMedalSecond v-else-if="row.nub_rank === 2" />
        <IconMedalThird v-else-if="row.nub_rank === 3" />
        <span v-else>{{ row.nub_rank || "-" }}</span>
      </template>

      <template #pro_rank-data="{ row }">
        <IconMedalFirst v-if="row.pro_rank === 1" />
        <IconMedalSecond v-else-if="row.pro_rank === 2" />
        <IconMedalThird v-else-if="row.pro_rank === 3" />
        <span v-else>{{ row.pro_rank || "-" }}</span>
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
</template>

<style scoped>
:deep(tr th:first-of-type) {
  width: 1rem;
}
</style>
