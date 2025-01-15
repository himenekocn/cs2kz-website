<script setup lang="ts">
import { debounce } from "radash"
import type { RecordQuery } from "~/types"

const query = defineModel<RecordQuery>("query", { required: true })

watch([() => query.value.player, () => query.value.course, () => query.value.server], ([player, course, server]) => {
  updateStringQueries(player, course, server)
})

const updateStringQueries = debounce({ delay: 300 }, (player, course, server) => {
  query.value.player = player
  query.value.course = course
  query.value.server = server
})

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}
</script>

<template>
  <div
    class="p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-8 border border-gray-700 rounded-md text-gray-300">
    <UTabs
      :items="[{ label: $t('common.mode.ckz') }, { label: $t('common.mode.vnl') }]"
      :ui="{
        list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
        wrapper: 'relative space-y-0',
      }"
      :default-index="0"
      @change="onModeChange" />

    <div class="col-span-3 flex items-center flex-wrap lg:justify-end gap-2 lg:gap-4">
      <div class="hidden lg:flex items-center gap-2">
        <p>{{ $t("records.query.pbOnly") }}</p>
        <UToggle v-model="query.top" size="lg" />
      </div>

      <USelectMenu
        v-model="query.has_teleports"
        :options="[
          { name: $t('common.teleports.overall'), value: 'overall' },
          { name: $t('common.teleports.pro'), value: 'pro' },
        ]"
        value-attribute="value"
        option-attribute="name" />

      <USelectMenu
        v-model="query.max_rank"
        :options="[
          { name: $t('records.query.maxRank.all'), value: undefined },
          { name: $t('records.query.maxRank.wr'), value: 1 },
          { name: $t('records.query.maxRank.top10'), value: 10 },
          { name: $t('records.query.maxRank.top20'), value: 20 },
          { name: $t('records.query.maxRank.top50'), value: 50 },
          { name: $t('records.query.maxRank.top100'), value: 100 },
        ]"
        :placeholder="$t('records.query.maxRank.placeholder')"
        value-attribute="value"
        option-attribute="name" />

      <USelectMenu
        v-model="query.styles"
        :options="[{ name: $t('common.style.autoBhop'), value: 'auto_bhop' }]"
        multiple
        :placeholder="$t('records.query.styles')"
        value-attribute="value"
        option-attribute="name" />

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

      <UInput v-model="query.server" :placeholder="$t('records.query.server')" class="hidden lg:block">
        <template #trailing>
          <IconServer />
        </template>
      </UInput>

      <!-- TODO: date picker -->
    </div>
  </div>
</template>
