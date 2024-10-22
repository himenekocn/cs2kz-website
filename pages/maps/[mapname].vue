<script setup lang="ts">
import type { Map, Style, Mode, Record, Course, RecordResponse } from "~/types"

const { $api } = useNuxtApp()

const route = useRoute()

const player = usePlayer()

const loading = ref(false)
const loadingRecords = ref(false)

const map = ref<Map | null>(null)
const activeCourseIndex = ref(0)
const course = computed(() => {
  return map.value?.courses[activeCourseIndex.value] as Course
})

const courseNames = computed(() =>
  map.value?.courses.map((course) => course.name),
)

const mode = ref<Mode>("classic")
const has_teleports = ref<"all" | false>("all")
const styles = ref<Style[]>([])

const records = ref<Record[] | null>(null)

const worldRecord = computed(() => (records.value ? records.value[0] : null))
const playerRecord = ref<Record | null>(null)

getMap()

watch([mode, has_teleports, styles], () => {
  getCourseRanking()
})

async function getMap() {
  try {
    loading.value = true
    const data: Map = await $api(`/maps/${route.params.mapname}`)
    map.value = data

    if (map.value.courses.length === 1) {
      activeCourseIndex.value = 0
    } else {
      activeCourseIndex.value = route.query.course
        ? data.courses.findIndex((course) => course.name === route.query.course)
        : 0
    }

    await getCourseRanking()
  } catch (err) {
    map.value = null
  } finally {
    loading.value = false
  }
}

function onCourseChange(index: number) {
  activeCourseIndex.value = index
  getCourseRanking()
}

async function getCourseRanking() {
  try {
    loadingRecords.value = true

    const baseQuery = {
      map: map.value?.name,
      course: course.value?.name,
      mode: mode.value,
      has_teleports: has_teleports.value === "all" ? null : has_teleports.value,
      styles: styles.value.length === 0 ? null : styles.value,
      top: true,
    }

    const data: RecordResponse | undefined = await $api("/records", {
      query: {
        ...baseQuery,
        sort_by: "time",
        limit: 50,
        // TODO: course filter
      },
    })

    if (data) {
      records.value = data.records

      if (player.value) {
        // find player record
        const record = records.value.find(
          (record) => record.player.steam_id === player.value?.steam_id,
        )

        if (record) {
          playerRecord.value = record
        } else {
          // if not found, fetch player record from api
          const data: RecordResponse | undefined = await $api("/records", {
            query: {
              ...baseQuery,
              player: player.value.steam_id,
            },
          })

          playerRecord.value = data?.records[0] || null
        }
      }
    } else {
      records.value = []
    }
  } catch (err) {
    records.value = null
  } finally {
    loadingRecords.value = false
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
          v-model:mode="mode"
          v-model:teleports="has_teleports"
          v-model:styles="styles"
          :name="map.name"
          :global-status="map.global_status"
        />

        <div class="border border-gray-700 rounded-md mt-2">
          <CourseInfoNames
            :names="courseNames!"
            :active-course-index="activeCourseIndex"
            @course-change="onCourseChange"
          />
          <CourseInfoImg
            :course="course"
            :mode="mode"
            :teleports="has_teleports ? true : false"
          />
        </div>

        <div class="mt-6">
          <div class="flex gap-4 items-center">
            <p class="text-3xl text-gray-200">{{ $t("map.course_ranking") }}</p>
            <USelectMenu
              v-model="styles"
              :options="[
                { name: $t('common.style.auto_bhop'), value: 'auto_bhop' },
              ]"
              multiple
              :placeholder="$t('records.query.styles')"
              value-attribute="value"
              option-attribute="name"
            />
          </div>
          <div v-if="loadingRecords">
            <IconLoading />
          </div>
          <div v-else class="mt-2">
            <RankHighlighted v-if="worldRecord" :record="worldRecord" wr />
            <RankHighlighted
              v-if="playerRecord"
              :record="playerRecord"
              class="mt-2"
            />
            <CourseInfoRanking :records="records" :loading="loadingRecords" />
          </div>
        </div>
      </div>

      <div v-else>{{ $t("common.no_data") }}</div>
    </div>
  </Main>
</template>
