<script setup lang="ts">
import type { RecordQuery } from "~/types/record"

const query = defineModel<RecordQuery>("query", { required: true })

const uiTabs = { wrapper: "relative space-y-0" }

// const isWr = ref(true)
// watch(isWr, (isWr) => {
//   query.value.points = isWr ? 1000 : undefined
// })

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function onTypeChange(index: number) {
  query.value.teleports = index === 0 ? undefined : false
}
</script>

<template>
  <div
    class="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 border border-gray-700 rounded-md"
  >
    <UTabs
      :items="[
        { label: $t('common.mode.ckz') },
        { label: $t('common.mode.vnl') },
      ]"
      :ui="{
        list: { width: 'w-48', tab: { size: 'text-lg', padding: 'px-0' } },
        ...uiTabs,
      }"
      :default-index="0"
      @change="onModeChange"
    />

    <div class="col-span-3 flex items-center flex-wrap justify-end gap-4">
      <!-- TODO: wr filter -->
      <!-- <UCheckbox v-model="isWr" label="WRs" /> -->

      <UTabs
        :items="[
          { label: $t('common.teleports.standard') },
          { label: $t('common.teleports.pro') },
        ]"
        :ui="uiTabs"
        :default-index="0"
        @change="onTypeChange"
      />

      <UInput v-model="query.course" :placeholder="$t('records.query.course')">
        <template #trailing>
          <IconMap />
        </template>
      </UInput>

      <UInput v-model="query.player" :placeholder="$t('records.query.player')">
        <template #trailing>
          <IconPlayer />
        </template>
      </UInput>

      <UInput v-model="query.server" :placeholder="$t('records.query.server')">
        <template #trailing>
          <IconServer />
        </template>
      </UInput>

      <!-- TODO: style definitions -->
      <USelectMenu
        v-model="query.style"
        :options="[
          { name: $t('common.style.normal'), value: 'normal' },
          { name: $t('common.style.autobhop'), value: 'auto_bhop' },
          { name: $t('common.style.lowgrav'), value: 'low_grav' },
        ]"
        placeholder="Style"
        value-attribute="value"
        option-attribute="name"
      />

      <!-- TODO: date picker -->
    </div>
  </div>
</template>
