<script setup lang="ts">
import type { Map, Course, Style } from "~/types"

const route = useRoute()

const { $api } = useNuxtApp()

const player = usePlayer()

const courseQuery = useCourseQuery()

const activeCourseName = ref<string>()

const { records, loading: loadingRecords, query } = useRecords()

const { records: playerRecords, query: playerQuery, total } = useRecords()

const map = ref<Map | null>(null)

const course = ref<Course | null>(null)

const styles = ref<Style[]>([])

const loading = ref(false)

watch(query, (newBaseQuery) => {
  if (player.value) {
    Object.assign(playerQuery, newBaseQuery)
    playerQuery.player = player.value.id
  }
})

watch(activeCourseName, (name) => {
  if (map.value) {
    course.value = map.value.courses.find((course) => course.name === name)!
    query.course = course.value.name
  }
})

const courseNames = computed(() => (map.value ? map.value.courses.map((course) => course.name) : []))

const worldRecord = computed(() => (records.value.length > 0 ? records.value[0] : null))
const playerRecord = computed(() => {
  if (player.value) {
    return playerRecords.value.length > 0 ? playerRecords.value[0] : null
  } else {
    return null
  }
})

const showWrProgression = ref(false)

getMap()

async function getMap() {
  try {
    loading.value = true
    const data: Map = await $api(`/maps/${route.params.mapname}`)
    map.value = data

    if (courseQuery.value.course === "") {
      course.value = map.value.courses[0]!
      activeCourseName.value = course.value.name
    } else {
      activeCourseName.value = courseQuery.value.course
      course.value = map.value.courses.find((course) => course.name === activeCourseName.value)!
    }

    query.sort_by = "time"
    query.sort_order = "ascending"
    query.limit = 100

    query.map = map.value.name
    query.course = course.value.name
    query.mode = courseQuery.value.mode
    query.has_teleports = courseQuery.value.has_teleports
  } catch (error) {
    console.error(error)
    map.value = null
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Main>
    <div class="max-w-4xl mx-auto">
      <div v-if="loading">
        <IconLoading />
      </div>

      <div v-else-if="map && course">
        <CourseInfoHeader
          v-model:active-course-name="activeCourseName"
          v-model:mode="query.mode"
          v-model:has-teleports="query.has_teleports"
          :name="map.name"
          :courses="courseNames"
          :state="map.state" />

        <div class="border border-gray-700 rounded-md mt-2">
          <CourseInfoImg :course="course" :mode="query.mode" :has-teleports="query.has_teleports" />
        </div>

        <div class="mt-6">
          <div class="flex gap-4 items-center">
            <p class="text-3xl text-gray-200">{{ $t("map.courseRanking") }}</p>
            <USelectMenu
              v-model="styles"
              :options="[{ name: $t('common.style.autoBhop'), value: 'auto_bhop' }]"
              multiple
              :placeholder="$t('records.query.styles')"
              value-attribute="value"
              option-attribute="name" />
          </div>
          <div v-if="loadingRecords">
            <IconLoading />
          </div>
          <div v-else class="mt-2">
            <RankHighlighted
              v-if="worldRecord"
              :record="worldRecord"
              wr
              @toggle="showWrProgression = !showWrProgression" />
            <ProgressionTable v-if="showWrProgression" :query="query" class="mt-2" />
            <RankHighlighted
              v-if="playerRecord && playerRecord.player.id !== worldRecord?.player.id"
              :record="playerRecord"
              class="mt-2" />
            <CourseInfoRanking
              v-model:limit="query.limit"
              :total="total"
              :records="records"
              :loading="loadingRecords" />
          </div>
        </div>
      </div>

      <div v-else>{{ $t("common.noData") }}</div>
    </div>
  </Main>
</template>
