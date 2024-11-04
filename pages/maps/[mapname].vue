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
const has_teleports = ref<"overall" | false>("overall")
const styles = ref<Style[]>([])

const records = ref<Record[]>([])

const worldRecord = computed(() =>
  records.value.length > 0 ? records.value[0] : null,
)
const playerRecord = ref<Record | null>(null)

const baseQuery = computed(() => ({
  map: map.value!.name,
  course: course.value.name,
  mode: mode.value,
  has_teleports: has_teleports.value === "overall" ? null : has_teleports.value,
  styles: styles.value.length === 0 ? null : styles.value,
}))

const showWrProgression = ref(false)

const loadingProgression = ref(false)

const history = ref<Record[]>([])

getMap()

watch([mode, has_teleports, styles], () => {
  if (showWrProgression.value) {
    getWrProgression()
  }
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
  } catch (error) {
    console.log(error)
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

    const data: RecordResponse | undefined = await $api("/records", {
      query: {
        ...baseQuery.value,
        sort_by: "date",
        sort_order: "descending",
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
              ...baseQuery.value,
              player: player.value.steam_id,
            },
          })

          playerRecord.value = data?.records[0] || null
        }
      }
    } else {
      records.value = []
      playerRecord.value = null
    }
  } catch (error) {
    console.log(error)
    records.value = []
  } finally {
    loadingRecords.value = false
  }
}

function toggleWrProgression() {
  if (showWrProgression.value) {
    showWrProgression.value = false
  } else {
    showWrProgression.value = true

    getWrProgression()
  }
}

async function getWrProgression() {
  try {
    loadingProgression.value = true

    const data: RecordResponse | undefined = await $api("/records", {
      query: {
        ...baseQuery.value,
        sort_by: "date",
        sort_order: "ascending",
        limit: 100000,
      },
    })

    if (data) {
      history.value = getWrHistory(data.records)
    } else {
      history.value = []
    }
  } catch (error) {
    console.log(error)
    history.value = []
  } finally {
    loadingProgression.value = false
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
            <RankHighlighted
              v-if="worldRecord"
              :record="worldRecord"
              wr
              @toggle="toggleWrProgression"
            />
            <ProgressionTable
              v-if="showWrProgression"
              class="mt-2"
              :history="history"
              :loading="loadingProgression"
            />
            <RankHighlighted
              v-if="
                playerRecord &&
                playerRecord.player.steam_id !== worldRecord?.player.steam_id
              "
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
