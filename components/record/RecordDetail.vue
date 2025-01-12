<script setup lang="ts">
import type { Record } from "~/types"

defineProps<{
  record: Record
}>()
</script>

<template>
  <div class="flex gap-8">
    <div class="flex flex-col items-center">
      <img class="border border-slate-400 ring-1" :src="getUrl()" >

      <div>{{ record.map }}</div>
      <div>{{ record.course }}</div>
    </div>

    <div class="grid"/>
  </div>
</template>
