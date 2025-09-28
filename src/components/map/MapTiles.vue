<script setup lang="ts">
import type { Map, MapQuery } from '@/types'
import { computed } from 'vue'
import { getTierColor, getTierNumber } from '@/utils'

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
              course.filters[props.query.mode][props.query.leaderboardType === 'overall' ? 'nub_tier' : 'pro_tier']
            return {
              name: course.name,
              tier,
              tierNo: getTierNumber(tier),
              tierColor: getTierColor(tier),
              state: course.filters[props.query.mode].state,
            }
          })
          .filter((course) => (props.query.tier === undefined ? true : course.tier === props.query.tier)),
        approved_at: map.approved_at,
      }
    })
    .filter((map) => map.courses.length > 0),
)
</script>

<template>
  <div class="mt-8 p-1 mx-auto w-max">
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-10 lg:place-items-center">
      <MapCard v-for="map in transformedMaps" :key="map.id" :query="query" :map="map" />
    </div>
  </div>
</template>
