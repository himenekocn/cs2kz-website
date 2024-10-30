<script setup lang="ts">
import { debounce } from "radash"
import type { RecordQuery } from "~/types"

const query = defineModel<RecordQuery>("query", { required: true })

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
</script>

<template>
  <div
    class="p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-8 border border-gray-700 rounded-md text-gray-300"
  >
    <UTabs
      :items="[
        { label: $t('common.mode.ckz') },
        { label: $t('common.mode.vnl') },
      ]"
      :ui="{
        list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
        wrapper: 'relative space-y-0',
      }"
      :default-index="0"
      @change="onModeChange"
    />

    <div
      class="col-span-3 flex items-center flex-wrap lg:justify-end gap-2 lg:gap-4"
    >
      <div class="hidden lg:flex items-center gap-2">
        <p>PB Only</p>
        <UToggle v-model="query.top" size="lg" />
      </div>

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

      <UInput v-model="query.player" :placeholder="$t('records.query.player')">
        <template #trailing>
          <IconPlayer />
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
  </div>
</template>
