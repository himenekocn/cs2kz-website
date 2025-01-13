<script setup lang="ts">
import type { Record } from "~/types"

defineProps<{
  record: Record
}>()
</script>

<template>
  <div class="flex items-center gap-3 text-lg text-gray-300">
    <img
      :src="getUrl()"
      onerror="this.onerror = null; this.src = '/img/cs2kz_medium.jpg'"
      loading="lazy"
      class="ring-slate-400 rounded-md ring-1 animate-fade-in w-64 h-auto rounded-l-md" >

    <div class="grid grid-cols-[1fr_2fr_2fr_2fr] gap-3">
      <div class="grid-item">
        <p class="item-key">Map:</p>
        <NuxtLink :to="`/maps/${record.map.name}`" class="text-slate-300 font-semibold text-lg hover:text-slate-200">
          {{ record.map.name }}
        </NuxtLink>
      </div>

      <div class="grid-item">
        <p class="item-key">Course:</p>
        <NuxtLink :to="`/maps/${record.map.name}?course=${record.course.name}`" class="text-lg hover:text-slate-300">
          {{ record.course.name }}
        </NuxtLink>
      </div>

      <div class="grid-item col-span-2">
        <p class="item-key">Tier:</p>
        <p class="font-medium" :style="{ color: getTierColor(record.course.tier) }">
          {{ getNumTier(record.course.tier) }}
        </p>
      </div>

      <div class="grid-item">
        <p class="item-key">Player:</p>
        <NuxtLink :to="`/profile/${record.player.id}`" class="text-cyan-600 whitespace-nowrap hover:text-cyan-400">
          {{ record.player.name }}
        </NuxtLink>
      </div>

      <div class="grid-item">
        <p class="item-key">Time:</p>
        <p class="text-slate-300">{{ formatTime(record.time) }}</p>
      </div>

      <div class="grid-item col-span-2">
        <p class="item-key whitespace-nowrap">Submitted At:</p>
        <p class="whitespace-nowrap">{{ toLocal(record.submitted_at) }}</p>
      </div>

      <div class="grid-item">
        <p class="item-key">Teleports:</p>
        <p>{{ record.teleports }}</p>
      </div>

      <div class="grid-item col-span-3">
        <p class="item-key">Server:</p>
        <p class="italic">{{ record.server.name }}</p>
      </div>

      <div class="grid-item">
        <p class="item-key">Overall Rank:</p>
        <p>{{ record.nub_rank || "-" }}</p>
      </div>

      <div class="grid-item">
        <p class="item-key">Overall Points:</p>
        <p>{{ record.nub_points ? Math.floor(record.nub_points) : "-" }}</p>
      </div>

      <div class="grid-item">
        <p class="item-key">Pro Rank:</p>
        <p>{{ record.pro_rank || "-" }}</p>
      </div>

      <div class="grid-item">
        <p class="item-key">Pro Points:</p>
        <p>{{ record.pro_points ? Math.floor(record.pro_points) : "-" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.item-key {
  color: rgb(78, 85, 95);
}
</style>
