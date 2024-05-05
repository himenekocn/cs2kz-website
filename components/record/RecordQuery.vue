<script setup lang="ts">
import type { RecordQuery } from "~/types/record"

const query = defineModel<RecordQuery>("query", { required: true })

const uiTabs = { wrapper: "relative space-y-0" }
const uiReset = {
  padding: { sm: "p-1" },
  variant: { outline: "dark:hover:bg-gray-700" },
}

const styles = ref(["normal"])

watch(styles, (styles) => {
  query.value.styles = styles.join(",")
})
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

function resetFilter() {
  query.value.mode = "classic"
  query.value.player = ""
  query.value.course = ""
  query.value.server = ""
  query.value.styles = "normal"
  query.value.before = ""
  query.value.after = ""
  query.value.limit = 30
  query.value.offset = 0
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
        list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
        ...uiTabs,
      }"
      :default-index="0"
      @change="onModeChange"
    />
    <div class="col-span-3 flex items-center flex-wrap lg:justify-end gap-4">
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

      <UButton
        variant="outline"
        color="gray"
        :ui="uiReset"
        @click="resetFilter"
      >
        <IconReset />
      </UButton>

      <!-- TODO: date picker -->
    </div>
  </div>
</template>
