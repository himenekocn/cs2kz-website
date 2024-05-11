<script setup lang="ts">
import type { GlobalStatus, Mode, Style } from "~/types/map"
const mode = defineModel<Mode>("mode")
const teleports = defineModel<"standard" | "pro">("teleports")
const styles = defineModel<Style[]>("styles")

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
        {{ globalStatus }}
      </div>
    </div>

    <div class="flex items-center gap-2 md:ml-6">
      <p class="text-gray-200 text-lg">Filters:</p>
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
            { name: $t('common.teleports.standard'), value: 'standard' },
            { name: $t('common.teleports.pro'), value: 'pro' },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </div>
    </div>

    <div class="flex items-center gap-2 md:ml-4">
      <p class="text-gray-200 text-lg">Styles:</p>
      <USelectMenu
        v-model="styles"
        :options="[
          { name: $t('common.style.normal'), value: 'normal' },
          { name: $t('common.style.backwards'), value: 'backwards' },
          { name: $t('common.style.sideways'), value: 'sideways' },
          { name: $t('common.style.half_sideways'), value: 'half_sideways' },
          { name: $t('common.style.w_only'), value: 'w_only' },
          { name: $t('common.style.low_gravity'), value: 'low_gravity' },
          { name: $t('common.style.high_gravity'), value: 'high_gravity' },
          { name: $t('common.style.no_prestrafe'), value: 'no_prestrafe' },
          { name: $t('common.style.negev'), value: 'negev' },
          { name: $t('common.style.ice'), value: 'ice' },
        ]"
        multiple
        :placeholder="$t('records.query.styles')"
        value-attribute="value"
        option-attribute="name"
      />
    </div>
  </div>
</template>
