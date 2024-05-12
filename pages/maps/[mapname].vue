<script setup lang="ts">
import type { Map, Mode } from "~/types/map"
import type { Record, RecordData } from "~/types/record"

const route = useRoute()

const player = usePlayer()

const error = ref(null)
const loading = ref(false)
const loadingRecords = ref(false)

const map = ref<Map | null>(null)
const activeCourseIndex = ref(0)
const course = computed(() => {
  console.log("computed")

  return map.value?.courses[activeCourseIndex.value]
})

const courseNames = computed(() =>
  map.value?.courses.map((course) => course.name),
)

const mode = ref<Mode>("classic")
const teleports = ref<"standard" | "pro">("standard")
const styles = ref(["normal"])

const records = ref<Record[] | null>(null)

const worldRecord = computed(() => (records.value ? records.value[0] : null))
const playerRecord = ref<Record | null>(null)

getMap()

watch([mode, teleports, styles], () => {
  getCourseRanking()
})

async function getMap() {
  try {
    loading.value = true
    const data: Map = await $api(`/maps/${route.params.mapname}`)
    map.value = data
    activeCourseIndex.value = route.query.course
      ? data.courses.findIndex((course) => course.name === route.query.course)
      : 0
    await getCourseRanking()
  } catch (err: any) {
    error.value = err.data
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
      teleports: teleports.value === "standard" ? undefined : false,
      styles: styles.value.join(","),
    }

    const data: RecordData | undefined = await $api("/records", {
      query: {
        ...baseQuery,
        sort_by: "time",
        limit: 50,
        // TODO: course filter
      },
    })

    if (data) {
      records.value = data.results

      if (player.value) {
        // find player record
        const record = records.value.find(
          (record) => record.player.steam_id === player.value?.steam_id,
        )

        if (record) {
          playerRecord.value = record
        } else {
          // if not found, fetch player record from api
          const data: RecordData | undefined = await $api("/records", {
            query: {
              ...baseQuery,
              player: player.value.steam_id,
            },
          })

          playerRecord.value = data?.results[0] || null
        }
      }
    } else {
      records.value = []
    }
  } catch (err: any) {
    error.value = err.data
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
          v-model:teleports="teleports"
          v-model:styles="styles"
          :name="map.name"
          :global-status="map.global_status"
        />

        <div class="border border-gray-700 rounded-md mt-2">
          <CourseInfoNames
            :names="courseNames"
            :active-course-index="activeCourseIndex"
            @course-change="onCourseChange"
          />
          <CourseInfoImg :course="course" :mode="mode" :teleports="teleports" />
        </div>

        <div class="mt-6">
          <p class="text-2xl text-gray-200">{{ $t("map.course_ranking") }}</p>
          <div v-if="loadingRecords">
            <IconLoading />
          </div>
          <div class="mt-2" v-else>
            <RankHighlighted v-if="worldRecord" :record="worldRecord" wr />
            <RankHighlighted
              v-if="playerRecord"
              :record="playerRecord"
              class="mt-2"
            />
            <CourseInfoRanking
              :records="records"
              :error="error"
              :loading="loadingRecords"
            />
          </div>
        </div>
      </div>

      <div v-else>{{ error }}</div>
    </div>
  </Main>
</template>
