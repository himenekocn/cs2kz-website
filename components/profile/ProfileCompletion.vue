<script setup lang="ts">
import type { Mode } from "~/types"

const props = defineProps<{
  mode: Mode
}>()

// this query takes overall/pro
const { records: rankPointsRecords, query: rankPointsQuery } = useRecords()
// this query takes tp/pro
const { records: completionRecords, query: completionQuery } = useRecords()
// to calculate total courses
// the query takes tp/pro
const { courses, query: courseQuery, getCourses } = useCourses()

const ranksAndPoints = ref()

watch(
  rankPointsRecords,
  (records) => {
    ranksAndPoints.value = calcRanksAndPointsDist(records, rankPointsQuery.has_teleports)
  },
  { immediate: true },
)

// const ranksAndPoints = computed(() => calcRanksAndPointsDist(rankPointsRecords.value))

const completedCourses = computed(() => calcCompletedCourses(completionRecords.value))

const totalCourses = computed(() => calcTotalCourses(courses.value))

watch(
  () => props.mode,
  (mode) => {
    rankPointsQuery.mode = mode
    completionQuery.mode = mode
    courseQuery.mode = mode
  },
)

watch(
  () => completionQuery.has_teleports,
  (has_teleports) => {
    courseQuery.has_teleports = has_teleports === "tp" ? "overall" : "pro"
  },
)

initQuery()

getCourses()

function initQuery() {
  rankPointsQuery.limit = 100000

  completionQuery.has_teleports = "tp"
  completionQuery.limit = 100000

  courseQuery.limit = 100000
}
</script>

<template>
  <div class="text-gray-300">
    <!-- title -->
    <p class="text-3xl font-semibold mb-2">
      {{ $t("profile.completion.title") }}
    </p>

    <div class="p-4 border border-gray-700 rounded-md">
      <!-- ranks & points distribution -->
      <div class="gap-4 p-4 border border-gray-800 rounded-md mb-4">
        <div class="flex items-center gap-4 mb-4">
          <p class="text-xl font-medium">
            {{ $t("profile.completion.topRecords") }}
          </p>
          <USelectMenu
            v-model="rankPointsQuery.has_teleports"
            :options="[
              { name: $t('common.teleports.overall'), value: 'overall' },
              { name: $t('common.teleports.pro'), value: 'pro' },
            ]"
            value-attribute="value"
            option-attribute="name"
          />
        </div>

        <ProfileTopRecords
          :wrs="ranksAndPoints.wrs"
          :top20="ranksAndPoints.top20"
          :top50="ranksAndPoints.top50"
          :top100="ranksAndPoints.top100"
        />
        <p class="text-xl font-medium">
          {{ $t("profile.completion.pointsDist") }}
        </p>

        <ProfileChartPointsDist :points-dist="ranksAndPoints.pointsDist" />
      </div>

      <!-- completed courses -->
      <div class="gap-4 p-4 border border-gray-800 rounded-md">
        <div class="flex items-center gap-4 mb-2">
          <p class="text-xl font-medium">
            {{ $t("profile.completion.completionByTier") }}
          </p>
          <USelectMenu
            v-model="completionQuery.has_teleports"
            :options="[
              { name: $t('common.teleports.tp'), value: 'tp' },
              { name: $t('common.teleports.pro'), value: 'pro' },
            ]"
            value-attribute="value"
            option-attribute="name"
          />
        </div>

        <ProfileChartCompletionByTier :completed-courses="completedCourses" :total-courses="totalCourses" />
      </div>
    </div>
  </div>
</template>
