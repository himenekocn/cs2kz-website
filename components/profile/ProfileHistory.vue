<script setup lang="ts">
const pastDays = ref(7)

const mostPlayedFilter = ref<"time" | "runs">("time")

const history = reactive({
  // generate 30 numbers
  time: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)),
  runs: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)),
  maps: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)),
})
</script>

<template>
  <div>
    <!-- title & filter -->
    <p class="text-2xl text-gray-300 font-semibold mb-2">History</p>

    <div class="gap-4 p-4 border border-gray-700 rounded-md text-gray-300">
      <!-- play history -->
      <div class="flex items-center gap-2 mb-2">
        <p class="text-xl font-medium">Play History</p>
        <USelectMenu
          v-model="pastDays"
          :options="[
            { name: $t('profile.history.chartFilter.week'), value: 7 },
            { name: $t('profile.history.chartFilter.month'), value: 30 },
            { name: $t('profile.history.chartFilter.year'), value: 365 },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </div>

      <ProfileChartPlayHistory :history="history" />

      <!-- most played maps -->
      <div class="flex items-center gap-2 mt-4 mb-2">
        <p class="text-xl font-medium">Most Played Courses</p>
        <USelectMenu
          v-model="mostPlayedFilter"
          :options="[
            {
              name: $t('profile.history.mostPlayedFilter.time'),
              value: 'time',
            },
            {
              name: $t('profile.history.mostPlayedFilter.runs'),
              value: 'runs',
            },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </div>

      <ProfileChartMostPlayed :sort-by="mostPlayedFilter" />
    </div>
  </div>
</template>
