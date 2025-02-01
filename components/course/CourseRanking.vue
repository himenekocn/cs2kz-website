<script setup lang="ts">
import type { Record } from "~/types"

const props = defineProps<{
  records: Record[]
  loading: boolean
  total: number
}>()

const { t } = useI18n()

const { expand, toggleSelect } = useExpand()

const limit = defineModel<number>("limit", { required: true })

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
      key: "submitted_at",
      label: t("records.title.date"),
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
        v-model:expand="expand"
        :ui="{
          th: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
          td: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :columns="columns"
        :rows="rows"
        @select="toggleSelect">
        <template #rank-data="{ row }">
          {{ row.rank }}
        </template>

        <template #player-data="{ row }">
          <span
            class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400"
            @click.stop="navigateTo(`/profile/${row.player.id}`)">
            {{ row.player.name }}
          </span>
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

        <template #nub_points-data="{ row }">
          {{ row.nub_points ? seperateThousands(row.nub_points) : "-" }}
        </template>

        <template #pro_points-data="{ row }">
          {{ row.pro_points ? seperateThousands(row.pro_points) : "-" }}
        </template>

        <template #submitted_at-data="{ row }">
          {{ toLocal(row.submitted_at) }}
        </template>

        <template #expand="{ row }">
          <div class="p-3">
            <RecordDetail :detailed="false" :record="row as Record" />
          </div>
        </template>
      </UTable>
    </UCard>

    <div class="flex items-center gap-2 mt-2">
      <span
        v-if="records.length < total"
        class="text-green-600 hover:text-green-400 cursor-pointer"
        @click="limit += 100"
        >Show more</span
      >
      <span v-if="records.length > 100" class="text-gray-400">-</span>
      <span v-if="records.length > 100" class="text-gray-600 hover:text-gray-400 cursor-pointer" @click="limit -= 100"
        >Show less</span
      >
    </div>
  </div>
</template>

<style scoped>
:deep(tr th:first-of-type) {
  width: 1rem;
}
</style>
