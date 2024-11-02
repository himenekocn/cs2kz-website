<script setup lang="ts">
import type { RecordQuery } from "~/types"

const query = defineModel<RecordQuery>({ required: true })
</script>

<template>
  <div
    class="px-2 py-3 flex items-center flex-wrap gap-2 lg:gap-4 border-b border-gray-800"
  >
    <div class="hidden lg:flex items-center gap-2">
      <p>{{ $t("records.query.pbOnly") }}</p>
      <UToggle v-model="query.top" size="lg" />
    </div>

    <!-- TODO: wr filter -->
    <USelectMenu
      v-model="query.has_teleports"
      :options="[
        { name: $t('common.teleports.overall'), value: 'overall' },
        { name: $t('common.teleports.pro'), value: false },
        { name: $t('common.teleports.tp'), value: true },
      ]"
      value-attribute="value"
      option-attribute="name"
    />

    <USelectMenu
      v-model="query.styles"
      :options="[{ name: $t('common.style.auto_bhop'), value: 'auto_bhop' }]"
      multiple
      :placeholder="$t('records.query.styles')"
      value-attribute="value"
      option-attribute="name"
    />

    <UInput v-model="query.map" :placeholder="$t('records.query.map')">
      <template #trailing>
        <IconMap />
      </template>
    </UInput>

    <UInput v-model="query.course" :placeholder="$t('records.query.course')">
      <template #trailing>
        <IconCourse />
      </template>
    </UInput>

    <UInput
      v-model="query.server"
      :placeholder="$t('records.query.server')"
      class="hidden lg:block"
    >
      <template #trailing>
        <IconServer />
      </template>
    </UInput>

    <!-- TODO: date picker -->
  </div>
</template>
