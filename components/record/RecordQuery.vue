<script setup lang="ts">
import { debounce } from "radash"
import type { RecordQuery } from "~/types"

const query = defineModel<RecordQuery>("query", { required: true })

const uiTabs = { wrapper: "relative space-y-0" }
const uiReset = {
  padding: { sm: "p-1" },
  variant: { outline: "dark:hover:bg-gray-700" },
}

watch(
  [
    () => query.value.player,
    () => query.value.course,
    () => query.value.server,
  ],
  ([player, course, server]) => {
    updateStringQueries(player, course, server)
  },
)

const updateStringQueries = debounce(
  { delay: 300 },
  (player, course, server) => {
    query.value.player = player
    query.value.course = course
    query.value.server = server
  },
)

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function toggleOrder() {
  const order = query.value.sort_order
  query.value.sort_order = order === "ascending" ? "descending" : "ascending"
}

function resetFilter() {
  query.value.has_teleports = "all"
  query.value.player = ""
  query.value.course = ""
  query.value.server = ""
  query.value.styles = []
  query.value.sort_order = "descending"
  query.value.sort_by = "date"
  query.value.created_before = null
  query.value.created_after = null
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
      <USelectMenu
        v-model="query.has_teleports"
        :options="[
          { name: $t('common.teleports.standard'), value: 'all' },
          { name: $t('common.teleports.pro'), value: false },
          { name: $t('common.teleports.tp'), value: true },
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
        v-model="query.styles"
        :options="[{ name: $t('common.style.auto_bhop'), value: 'auto_bhop' }]"
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
