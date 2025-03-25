<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Mode } from '@/types'
import { useRecords } from '@/composables/records'
import { useCourses } from '@/composables/courses'
import { useRoute } from 'vue-router'
import { calcRanksAndPointsDist, calcCompletedCourses, calcTotalCourses } from '@/utils'

const props = defineProps<{
  mode: Mode
}>()

const route = useRoute()

const { records, query: completionQuery } = useRecords({ player: route.params.steamId as string, limit: 99999 })

const { courses, query: courseQuery } = useCourses({ limit: 99999 })

const ranksAndPoints = ref()
const completedCourses = ref()

watch(
  records,
  (records) => {
    ranksAndPoints.value = calcRanksAndPointsDist(records, completionQuery.leaderboardType)
    completedCourses.value = calcCompletedCourses(records, completionQuery.leaderboardType)
  },
  { immediate: true },
)

const totalCourses = computed(() => calcTotalCourses(courses.value))

watch(
  () => props.mode,
  (mode) => {
    console.log('mode changed', mode)
    completionQuery.mode = mode
    courseQuery.mode = mode
  },
)

watch(
  () => completionQuery.leaderboardType,
  (type) => {
    courseQuery.leaderboardType = type
  },
)
</script>

<template>
  <div class="text-gray-300">
    <!-- title -->
    <div class="flex items-center gap-2 mb-2">
      <p class="text-3xl font-semibold">
        {{ $t('profile.completion.title') }}
      </p>
      <UButtonGroup orientation="horizontal">
        <UButton
          size="sm"
          :variant="completionQuery.leaderboardType === 'overall' ? 'solid' : 'outline'"
          :label="$t('common.leaderboardType.overall')"
          @click="completionQuery.leaderboardType = 'overall'"
        />
        <UButton
          size="sm"
          :variant="completionQuery.leaderboardType === 'pro' ? 'solid' : 'outline'"
          :label="$t('common.leaderboardType.pro')"
          @click="completionQuery.leaderboardType = 'pro'"
        />
      </UButtonGroup>
    </div>

    <div class="p-4 border border-gray-700 rounded-md">
      <!-- top records -->
      <p class="text-xl font-medium mb-2">
        {{ $t('profile.completion.topRecords') }}
      </p>
      <ProfileTopRecords
        class="mb-4"
        :wrs="ranksAndPoints.wrs"
        :top20="ranksAndPoints.top20"
        :top50="ranksAndPoints.top50"
        :top100="ranksAndPoints.top100"
      />

      <div class="flex flex-col lg:flex-row gap-4">
        <!-- completed courses by tier -->
        <div class="flex-1">
          <p class="text-xl font-medium mb-2">
            {{ $t('profile.completion.completionByTier') }}
          </p>
          <ProfileChartCompletionByTier :completed-courses="completedCourses" :total-courses="totalCourses" />
        </div>
        <!-- points distribution -->
        <div class="flex-1">
          <p class="text-xl font-medium mb-2">
            {{ $t('profile.completion.pointsDist') }}
          </p>
          <ProfileChartPointsDist class="mb-4" :points-dist="ranksAndPoints.pointsDist" />
        </div>
      </div>
    </div>
  </div>
</template>
