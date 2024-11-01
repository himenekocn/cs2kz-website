<script setup lang="ts">
import type { GlobalStatus, Mode } from "~/types"

const mode = defineModel<Mode>("mode")
const teleports = defineModel<"overall" | false>("overall")

defineProps<{
  name: string
  globalStatus: GlobalStatus
}>()

const globalStatusColors = {
  global: "text-green-400 bg-green-300/50",
  in_testing: "text-orange-400 bg-orange-300/50",
  not_global: "text-gray-400 bg-gray-400",
}
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div class="flex items-center gap-2">
      <p class="text-4xl text-gray-200 font-medium">{{ name }}</p>
      <div :class="globalStatusColors[globalStatus]" class="px-2 rounded-sm">
        {{ $t(`map.global_status.${globalStatus}`) }}
      </div>
    </div>

    <div class="flex items-center gap-2 md:ml-6">
      <p class="text-gray-200 text-lg">{{ `${$t("map.filters")}:` }}</p>
      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="mode"
          :options="[
            { name: $t('common.mode.ckz'), value: 'classic' },
            { name: $t('common.mode.vnl'), value: 'vanilla' },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
        <USelectMenu
          v-model="teleports"
          :options="[
            { name: $t('common.teleports.overall'), value: 'overall' },
            { name: $t('common.teleports.pro'), value: false },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </div>
    </div>
  </div>
</template>
