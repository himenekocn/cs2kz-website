<script setup lang="ts">
import type { Record } from "~/types/record"

defineProps<{
  records: Record[] | null
  loading: boolean
  error: any
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full mt-2 bg-gray-900 border border-gray-700 text-center">
      <thead>
        <tr class="text-gray-300">
          <th class="py-1">{{ $t("records.title.rank") }}</th>
          <th class="py-1">{{ $t("records.title.player") }}</th>
          <th class="py-1">{{ $t("records.title.time") }}</th>
          <th class="py-1">{{ $t("records.title.server") }}</th>
          <th class="py-1">{{ $t("records.title.teleports") }}</th>
          <th class="py-1">{{ $t("records.title.date") }}</th>
        </tr>
      </thead>
      <tbody v-if="records && records.length > 0">
        <tr
          v-for="(record, index) in records"
          :record="record"
          :key="record.id"
          class="border border-gray-700 text-gray-400 hover:bg-gray-800 transition ease-in"
        >
          <td>{{ `#${index + 1}` }}</td>
          <td>
            <NuxtLink
              :to="`/profile/${record.player.steam_id}`"
              class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400"
            >
              {{ record.player.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-2 lg:px-0 text-slate-300">
            {{ formatTime(record.time) }}
          </td>
          <td class="py-2 px-2 lg:px-0 italic whitespace-nowrap">
            {{ record.server.name }}
          </td>
          <td class="py-2 px-2 lg:px-0">
            {{ record.teleports }}
          </td>
          <td class="py-2 px-2 lg:px-0 whitespace-nowrap">
            {{ toLocal(record.created_on) }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="border border-gray-700">
          <td v-if="records === null" colspan="8" class="text-red-500">
            {{ error }}
          </td>
          <td v-else colspan="8" class="text-gray-500">No Data</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
