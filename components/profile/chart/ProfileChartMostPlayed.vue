<script setup lang="ts">
const props = defineProps<{
  sortBy: "time" | "runs"
}>()

const columns = computed(() =>
  [
    {
      key: "course",
      label: "Course",
    },
    {
      key: "map",
      label: "Map",
    },
  ].concat(
    props.sortBy === "time"
      ? [
          {
            key: "time",
            label: "Time",
          },
          {
            key: "runs",
            label: "Runs",
          },
        ]
      : [
          {
            key: "runs",
            label: "Runs",
          },
          {
            key: "time",
            label: "Time",
          },
        ],
  ),
)

const rows = computed(() =>
  Array.from({ length: 10 }, (_, i) => ({
    course: `Course ${i + 1}`,
    map: `Map ${i + 1}`,
    time: Math.floor(Math.random() * 1000),
    runs: Math.floor(Math.random() * 100),
  })),
)
</script>

<template>
  <UCard :ui="{ body: { padding: '' } }">
    <UTable
      :columns="columns"
      :rows="rows"
      :ui="{
        th: { size: 'text-base', padding: 'py-2' },
        td: { size: 'text-base', padding: 'py-2' },
        tr: { base: 'hover:bg-gray-800 transition ease-in' },
      }"
    />
  </UCard>
</template>
