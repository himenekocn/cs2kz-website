<script setup lang="ts">
import type { MapState, Teleports, Mode } from "~/types"

const mode = defineModel<Mode>("mode")
const hasTeleports = defineModel<Teleports>("hasTeleports")

const props = defineProps<{
  name: string
  state: MapState
  courses: string[]
}>()

const courseOptions = props.courses.map((course) => ({ name: course, value: course }))

const activeCourseName = defineModel<string>("activeCourseName")

const stateColorMap = {
  approved: "text-green-400 bg-green-300/50",
  "in-testing": "text-orange-400 bg-orange-300/50",
  invalid: "text-gray-400 bg-gray-400",
}
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div class="flex items-center gap-2">
      <p class="text-4xl text-gray-200 font-medium">{{ name }}</p>
      <div :class="stateColorMap[state]" class="px-2 rounded-sm">
        {{ $t(`map.state.${state}`) }}
      </div>
    </div>

    <div class="flex items-center gap-2 md:ml-6">
      <p class="text-gray-200 text-lg">{{ `${$t("map.filters")}:` }}</p>
      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="activeCourseName"
          :options="courseOptions"
          value-attribute="value"
          option-attribute="name" />
        <USelectMenu
          v-model="mode"
          :options="[
            { name: $t('common.mode.ckz'), value: 'classic' },
            { name: $t('common.mode.vnl'), value: 'vanilla' },
          ]"
          value-attribute="value"
          option-attribute="name" />
        <USelectMenu
          v-model="hasTeleports"
          :options="[
            { name: $t('common.teleports.overall'), value: 'overall' },
            { name: $t('common.teleports.pro'), value: 'pro' },
          ]"
          value-attribute="value"
          option-attribute="name" />
      </div>
    </div>
  </div>
</template>
