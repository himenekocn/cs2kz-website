<script setup lang="ts">
const lastDays = ref(7)

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
          v-model="lastDays"
          :options="[
            { name: $t('profile.history.filter.week'), value: 7 },
            { name: $t('profile.history.filter.month'), value: 30 },
            { name: $t('profile.history.filter.year'), value: 365 },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </div>
      <ProfileChartPlayHistory :history="history" />
    </div>
  </div>
</template>
