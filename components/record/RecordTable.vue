<script setup lang="ts">
import type { Record } from "~/types/record"

defineProps<{
  records?: Record[]
}>()
</script>

<template>
  <div
    class="mt-8 grid grid-cols-12 text-center p-2 border border-gray-700 rounded-t-md text-gray-300 font-semibold"
  >
    <p class="col-span-1">{{ $t("records.title.map") }}</p>
    <p class="col-span-2">{{ $t("records.title.course") }}</p>
    <p>{{ $t("records.title.tier") }}</p>
    <p class="col-span-2">{{ $t("records.title.player") }}</p>
    <p>{{ $t("records.title.time") }}</p>
    <p class="col-span-2">{{ $t("records.title.server") }}</p>
    <p>{{ $t("records.title.teleports") }}</p>
    <p class="col-span-2">{{ $t("records.title.date") }}</p>
  </div>
  <Record
    v-if="records"
    v-for="record in records"
    :record="record"
    :key="record.id"
  />
  <div
    v-else
    class="py-2 text-center text-lg font-semibold text-gray-300 border-b border-x border-gray-700"
  >
    No Data
  </div>
</template>
