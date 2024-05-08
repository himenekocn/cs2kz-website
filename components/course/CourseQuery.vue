<script setup lang="ts">
import type { CourseQuery } from "~/types/map"

const query = defineModel<CourseQuery>("query", { required: true })

const uiTabs = { wrapper: "relative space-y-0" }
const uiReset = {
  padding: { sm: "p-1" },
  variant: { outline: "dark:hover:bg-gray-700" },
}

const teleports = ref<"standard" | "pro">("standard")

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function toggleOrder() {
  const order = query.value.sort_order
  query.value.sort_order = order === "ascending" ? "descending" : "ascending"
}

function resetFilter() {
  query.value.mode = "classic"
  teleports.value = "standard"
  query.value.sort_order = "descending"
  query.value.sort_by = "map"
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
      <USelectMenu
        v-model="query.teleports"
        :options="[
          { name: $t('common.teleports.standard'), value: 'standard' },
          { name: $t('common.teleports.pro'), value: 'pro' },
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
            { name: $t('common.sort_by.map'), value: 'map' },
            { name: $t('common.sort_by.tier'), value: 'tier' },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </UButtonGroup>
      <UInput
        v-model="query.name"
        :placeholder="$t('courses.query.courseormap')"
      >
        <template #trailing>
          <IconMap />
        </template>
      </UInput>

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
