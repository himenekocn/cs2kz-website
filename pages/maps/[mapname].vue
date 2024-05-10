<script setup lang="ts">
import type { Map, Course, Mode } from "~/types/map"
import type { Record, RecordData } from "~/types/record"

const route = useRoute()

const player = usePlayer()

const error = ref(null)
const loading = ref(false)
const loadingRecords = ref(false)

const map = ref<Map | null>(null)
const course = ref<Course>()

const courseNames = computed(() =>
  map.value?.courses.map((course) => course.name),
)

const mode = ref<Mode>("classic")
const teleports = ref<"standard" | "pro">("standard")

const records = ref<Record[] | null>(null)

const worldRecord = computed(() => (records.value ? records.value[0] : null))
const playerRecord = ref<Record | null>(null)

const globalStatusColors = {
  global: "text-green-400 bg-green-300/50",
  in_testing: "text-orange-400 bg-orange-300/50",
  not_global: "text-gray-400 bg-gray-400",
}

getMap()

watch([mode, teleports], () => {
  getCourseRanking()
})

async function getMap() {
  try {
    loading.value = true
    const data: Map = await $api(`/maps/${route.params.mapname}`)
    map.value = data
    course.value = data.courses[0]
    await getCourseRanking()
  } catch (err: any) {
    error.value = err.data
    map.value = null
  } finally {
    loading.value = false
  }
}

function goToCourse(index: number) {
  course.value = map.value?.courses[index]
  getCourseRanking()
}

async function getCourseRanking() {
  try {
    loadingRecords.value = true
    const data: RecordData | undefined = await $api("/records", {
      query: {
        map: map.value?.name,
        course: course.value?.name,
        mode: mode.value,
        teleports: teleports.value === "standard" ? undefined : false,
        sort_by: "time",
        limit: 50,
        // TODO: course filter
      },
    })

    if (data) {
      records.value = data.results

      if (player.value) {
        const record = records.value.find(
          (record) => record.player.steam_id === player.value?.steam_id,
        )

        if (record) {
          playerRecord.value = record
        } else {
          const data: RecordData | undefined = await $api("/records", {
            query: {
              map: map.value?.name,
              course: course.value?.name,
              mode: mode.value,
              teleports: teleports.value === "standard" ? undefined : false,
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
        <!-- map & filters -->
        <div class="flex flex-wrap items-center">
          <div class="flex items-center gap-2">
            <p class="text-4xl text-gray-200 font-medium">{{ map.name }}</p>
            <div
              :class="globalStatusColors[map.global_status]"
              class="px-2 rounded-sm"
            >
              {{ map.global_status }}
            </div>
          </div>

          <div class="flex items-center gap-2 md:ml-6">
            <p class="text-gray-200 text-lg">Filters:</p>
            <div class="flex items-center gap-2">
              <USelectMenu
                v-model="mode"
                :options="[
                  { name: $t('common.mode.ckz'), value: 'classic' },
                  { name: $t('common.mode.vnl'), value: 'vanilla' },
                ]"
                value-attribute="value"
                option-attribute="name"
              />
              <USelectMenu
                v-model="teleports"
                :options="[
                  { name: $t('common.teleports.standard'), value: 'standard' },
                  { name: $t('common.teleports.pro'), value: 'pro' },
                ]"
                value-attribute="value"
                option-attribute="name"
              />
            </div>
          </div>
        </div>

        <!-- course names & info -->
        <div class="border border-gray-700 rounded-md mt-2">
          <div
            class="p-2 flex items-center gap-6 border-b border-gray-700 text-xl"
          >
            <div
              v-for="(courseName, index) in courseNames"
              :key="courseName"
              @click="goToCourse(index)"
              class="coursename"
              :class="course.name === courseName ? 'active' : ''"
            >
              {{ courseName }}
            </div>
          </div>
          <CourseInfo :course="course" :mode="mode" :teleports="teleports" />
        </div>

        <div class="mt-6">
          <p class="text-2xl text-gray-200">Course Ranking</p>
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
            <CourseRanking
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

<style scoped>
.coursename {
  position: relative;
  color: rgb(229 231 235);
}

.coursename:hover {
  cursor: pointer;
}

.coursename.active {
  color: rgb(96 165 250);
}

.coursename::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: rgb(96 165 250);
  bottom: 0;
  left: 50%;
  transition:
    ease-in width 0.2s,
    ease-in left 0.2s;
}

.coursename.active::after {
  width: 100%;
  left: 0;
}
</style>
