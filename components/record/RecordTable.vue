<script setup lang="ts">
import type { Record } from "~/types/record"

defineProps<{
  records?: Record[]
  teleports?: boolean
}>()
</script>

<template>
  <div
    class="mt-10 grid grid-cols-12 text-center p-2 border border-gray-700 rounded-t-md text-gray-300 font-semibold"
  >
    <p class="col-span-1">Map</p>
    <p class="col-span-2">Course</p>
    <p>Tier</p>
    <p class="col-span-2">Player</p>
    <p>Time</p>
    <p class="col-span-2">Server</p>
    <p>Teleports</p>
    <p class="col-span-2">Date</p>
  </div>
  <Record
    v-if="records"
    v-for="record in records"
    :record="record"
    :key="record.id"
    :teleports="teleports"
  />
  <div
    v-else
    class="py-2 text-center text-lg font-semibold text-gray-300 border-b border-x border-gray-700"
  >
    No Data
  </div>
</template>
