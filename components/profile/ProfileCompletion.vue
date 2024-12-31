<script setup lang="ts">
import type { Mode } from "~/types"

const props = defineProps<{
  mode: Mode
}>()

const hasTeleports = ref<"overall" | boolean>("overall")

watch(
  () => props.mode,
  () => {
    console.log("mode changed")
  },
)
</script>

<template>
  <div>
    <!-- title & filter -->
    <div class="flex items-center gap-4 mb-2">
      <p class="text-3xl text-gray-300 font-semibold">
        {{ $t("profile.completion.title") }}
      </p>
      <USelectMenu
        v-model="hasTeleports"
        :options="[
          { name: $t('common.teleports.overall'), value: 'overall' },
          { name: $t('common.teleports.pro'), value: false },
          { name: $t('common.teleports.tp'), value: true },
        ]"
        value-attribute="value"
        option-attribute="name" />
    </div>

    <div class="gap-4 p-4 border border-gray-700 rounded-md text-gray-300">
      <!-- stats -->
      <div class="flex flex-wrap pb-2 mb-4 border-b border-gray-800 gap-x-8 gap-y-0 lg:gap-y-8">
        <div class="flex">
          <span class="mr-1 text-gray-400">{{ $t("profile.completion.wrs") }}:</span>
          <span class="font-semibold text-yellow-400">18</span>
          <IconMedal class="w-5 h-5" />
        </div>

        <div>
          <span class="mr-1 text-gray-400">{{ $t("profile.completion.top20") }}:</span>
          <span class="font-medium text-red-400">121</span>
        </div>

        <div>
          <span class="mr-1 text-gray-400">{{ $t("profile.completion.top50") }}:</span>
          <span class="font-medium text-purple-400">256</span>
        </div>
      </div>

      <div>
        <!-- maps -->
        <p class="text-xl font-medium mb-2">
          {{ $t("profile.completion.coursesDist") }}
        </p>
        <ProfileChartCourses />

        <!-- points distribution -->
        <p class="text-xl font-medium mt-4 mb-2">
          {{ $t("profile.completion.pointsDist") }}
        </p>
        <ProfileChartPoints />
      </div>
    </div>
  </div>
</template>
