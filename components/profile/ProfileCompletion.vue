<script setup lang="ts">
import type { Mode } from "~/types"

const props = defineProps<{
  mode: Mode
}>()

const { records, query: completionQuery } = useRecords()

// to calculate total courses by tier
const { courses, query: courseQuery, getCourses } = useCourses()

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

initQuery()

getCourses()

function initQuery() {
  completionQuery.limit = 100000
  courseQuery.limit = 100000
}
</script>

<template>
  <div class="text-gray-300">
    <!-- title -->
    <div class="flex items-center gap-2 mb-2">
      <p class="text-3xl font-semibold">
        {{ $t("profile.completion.title") }}
      </p>
      <USelectMenu
        v-model="completionQuery.leaderboardType"
        :options="[
          { name: $t('common.leaderboardType.overall'), value: 'overall' },
          { name: $t('common.leaderboardType.pro'), value: 'pro' },
        ]"
        value-attribute="value"
        option-attribute="name"
      />
    </div>

    <div class="p-4 border border-gray-700 rounded-md">
      <!-- top records -->
      <p class="text-xl font-medium mb-2">
        {{ $t("profile.completion.topRecords") }}
      </p>
      <ProfileTopRecords
        class="mb-4"
        :wrs="ranksAndPoints.wrs"
        :top20="ranksAndPoints.top20"
        :top50="ranksAndPoints.top50"
        :top100="ranksAndPoints.top100"
      />

      <!-- points distribution -->
      <p class="text-xl font-medium mb-2">
        {{ $t("profile.completion.pointsDist") }}
      </p>
      <ProfileChartPointsDist class="mb-4" :points-dist="ranksAndPoints.pointsDist" />

      <!-- completed courses by tier -->
      <p class="text-xl font-medium mb-2">
        {{ $t("profile.completion.completionByTier") }}
      </p>

      <ProfileChartCompletionByTier :completed-courses="completedCourses" :total-courses="totalCourses" />
    </div>
  </div>
</template>
