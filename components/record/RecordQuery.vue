<script setup lang="ts">
import type { RecordQuery } from "~/types/record"
import type { Style } from "~/types/map"

const query = defineModel<RecordQuery>("query", { required: true })

const uiTabs = { wrapper: "relative space-y-0" }
const uiReset = {
  padding: { sm: "p-1" },
  variant: { outline: "dark:hover:bg-gray-700" },
}

const teleports = ref("standard")
const styles = ref<Style[]>(["normal"])

watch(styles, (styles) => {
  query.value.styles = styles.join(",")
})

watch(teleports, (teleports) => {
  if (teleports === "standard") {
    query.value.teleports = undefined
  }
  if (teleports === "pro") {
    query.value.teleports = false
  }
  if (teleports === "tp") {
    query.value.teleports = true
  }
})
// const isWr = ref(true)
// watch(isWr, (isWr) => {
//   query.value.points = isWr ? 1000 : undefined
// })

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function toggleOrder() {
  const order = query.value.sort_order
  query.value.sort_order = order === "ascending" ? "descending" : "ascending"
}

function resetFilter() {
  query.value.player = ""
  query.value.course = ""
  query.value.server = ""
  styles.value = ["normal"]
  query.value.sort_order = "descending"
  query.value.sort_by = "date"
  query.value.created_before = ""
  query.value.created_after = ""
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
      <USelectMenu
        v-model="teleports"
        :options="[
          { name: $t('common.teleports.standard'), value: 'standard' },
          { name: $t('common.teleports.pro'), value: 'pro' },
          { name: $t('common.teleports.tp'), value: 'tp' },
        ]"
        value-attribute="value"
        option-attribute="name"
      />
      <UButtonGroup>
        <UButton
          :icon="
            query.sort_order === 'ascending'
              ? 'i-heroicons-bars-arrow-down-20-solid'
              : 'i-heroicons-bars-arrow-up-20-solid'
          "
          color="gray"
          variant="solid"
          @click="toggleOrder"
        />
        <USelectMenu
          v-model="query.sort_by"
          :options="[
            { name: $t('common.sort_by.date'), value: 'date' },
            { name: $t('common.sort_by.time'), value: 'time' },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </UButtonGroup>
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
