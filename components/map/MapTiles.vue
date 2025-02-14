<script setup lang="ts">
import type { Map, MapQuery } from "~/types"

const props = defineProps<{
  maps: Map[]
  loading: boolean
  query: MapQuery
}>()

const transformedMaps = computed(() =>
  props.maps
    .map((map) => {
      return {
        id: map.id,
        name: map.name,
        state: map.state,
        mappers: map.mappers,
        courses: map.courses
          .map((course) => {
            const tier =
              course.filters[props.query.mode][props.query.leaderboardType === "overall" ? "nub_tier" : "pro_tier"]
            return {
              name: course.name,
              tier,
              tierNo: getNumTier(tier),
              tierColor: getTierColor(tier),
              state: course.filters[props.query.mode].state,
            }
          })
          .filter((course) => (props.query.tier === undefined ? true : course.tier === props.query.tier))
          .sort((a, b) => a.tierNo - b.tierNo),
        approved_at: map.approved_at,
      }
    })
    .filter((map) => map.courses.length > 0),
)
</script>

<template>
  <div class="overflow-x-auto mt-8 py-4 px-1">
    <div v-if="loading" class="flex justify-center">
      <IconLoading class="inline" />
    </div>

    <div
      v-else-if="transformedMaps.length > 0"
      class="mx-auto w-max grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 xl:place-items-center"
    >
      <MapCard v-for="map in transformedMaps" :key="map.id" :query="query" :map="map" />
    </div>

    <div v-else class="flex justify-center">
      <p class="text-gray-500">
        {{ $t("common.noData") }}
      </p>
    </div>
  </div>
</template>
