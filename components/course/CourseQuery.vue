<script setup lang="ts">
import type { CourseQuery } from "~/types"

const query = defineModel<CourseQuery>("query", { required: true })

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function toggleOrder() {
  const order = query.value.sort_order
  query.value.sort_order = order === "ascending" ? "descending" : "ascending"
}
</script>

<template>
  <div class="p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-8 border border-gray-700 rounded-md">
    <UTabs
      :items="[{ label: $t('common.mode.ckz') }, { label: $t('common.mode.vnl') }]"
      :ui="{
        list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
        wrapper: 'relative space-y-0',
      }"
      :default-index="0"
      @change="onModeChange"
    />
    <div class="col-span-3 flex items-center flex-wrap lg:justify-end gap-2 lg:gap-4">
      <USelectMenu
        v-model="query.leaderboardType"
        :options="[
          { name: $t('common.leaderboardType.overall'), value: 'overall' },
          { name: $t('common.leaderboardType.pro'), value: 'pro' },
        ]"
        value-attribute="value"
        option-attribute="name"
      />
      <USelectMenu
        v-model="query.tier"
        :options="[
          { name: $t('common.tier.all'), value: undefined },
          { name: $t('common.tier.veryEasy'), value: 'very-easy' },
          { name: $t('common.tier.easy'), value: 'easy' },
          { name: $t('common.tier.medium'), value: 'medium' },
          { name: $t('common.tier.advanced'), value: 'advanced' },
          { name: $t('common.tier.hard'), value: 'hard' },
          { name: $t('common.tier.veryHard'), value: 'very-hard' },
          { name: $t('common.tier.extreme'), value: 'extreme' },
          { name: $t('common.tier.death'), value: 'death' },
          { name: $t('common.tier.unfeasible'), value: 'unfeasible' },
          { name: $t('common.tier.impossible'), value: 'impossible' },
        ]"
        value-attribute="value"
        option-attribute="name"
        :placeholder="$t('courses.query.selectTier')"
        :leading="true"
      >
        <!-- <template #label>
          <span v-if="query.tier !== 'all'">
            {{ $t(`common.tier.${query.tier}`) }}
          </span>
          <span v-else>Select Tier</span>
        </template> -->
      </USelectMenu>
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
            { name: $t('common.sortBy.map'), value: 'map' },
            { name: $t('common.sortBy.tier'), value: 'tier' },
            { name: $t('common.sortBy.createdOn'), value: 'created_on' },
          ]"
          value-attribute="value"
          option-attribute="name"
        />
      </UButtonGroup>
      <UInput v-model="query.name" :placeholder="$t('courses.query.searchby')">
        <template #trailing>
          <IconMap />
        </template>
      </UInput>
    </div>
  </div>
</template>
