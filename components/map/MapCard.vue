<script setup lang="ts">
import type { MapCard, MapQuery } from "~/types"

const courseQuery = useCourseQuery()

const props = defineProps<{
  query: MapQuery
  map: MapCard
}>()

function goToCourse(name: string) {
  courseQuery.value.course = name
  courseQuery.value.mode = props.query.mode
  courseQuery.value.leaderboardType = props.query.leaderboardType
  navigateTo(`/maps/${props.map.name}`)
}
</script>

<template>
  <div class="card-container relative w-max rounded-md ring ring-blue-600/20 hover:ring-blue-600 hover:ring-4">
    <div class="flex items-center">
      <TheImage
        class="hidden lg:block w-64 h-36"
        :src="`https://github.com/kzglobalteam/cs2kz-images/raw/public/webp/medium/${map.name}/1.webp`"
      />
      <div
        :style="{
          backgroundImage: `url(https://github.com/kzglobalteam/cs2kz-images/raw/public/webp/medium/${map.name}/1.webp)`,
        }"
        class="info"
      >
        <div>
          <div class="flex gap-2 items-center mb-1">
            <p class="text-gray-100 text-lg font-medium">{{ map.name }}</p>

            <div
              :class="map.state === 'approved' ? 'text-green-400 bg-green-300/20' : 'text-gray-300'"
              class="px-1 text-xs border rounded-sm"
            >
              {{ $t(`map.state.${map.state}`) }}
            </div>
          </div>

          <div class="flex items-center gap-1 mb-1">
            <IconDate />
            <span class="text-xs text-gray-200 leading-[14px]">
              {{ toLocal(map.approved_at).slice(0, 10) }}
            </span>
          </div>

          <div class="flex flex-wrap items-center text-sm">
            <span class="text-gray-400 mr-1">{{ $t("map.madeBy") }}:</span>
            <div v-for="(mapper, index) in map.mappers" :key="mapper.id">
              <NuxtLink :to="`/profile/${mapper.id}`" class="text-cyan-600 hover:text-cyan-400">
                {{ mapper.name }}
              </NuxtLink>
              <span v-if="index < map.mappers.length - 1" class="text-gray-400 mr-1">,</span>
            </div>
          </div>
        </div>

        <div class="flex gap-1">
          <div v-for="course in map.courses" :key="course.name">
            <div
              :style="{
                color: course.tierColor,
                borderColor: course.tierColor,
              }"
              :class="`w-4 flex justify-center items-center text-sm rounded-[0.2rem] border bg-gray-700/50`"
            >
              {{ course.tierNo }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="expandable-area hidden absolute top-full left-0 w-full overflow-hidden z-10 rounded-bl-md rounded-br-md bg-gray-800"
    >
      <div class="p-1">
        <div
          v-for="course in map.courses"
          :key="course.name"
          class="flex items-center gap-2 p-1 hover:bg-gray-700 rounded-md cursor-pointer"
          @click="goToCourse(course.name)"
        >
          <div
            :class="course.state === 'ranked' ? 'text-green-400 bg-green-300/20' : 'text-gray-300'"
            class="px-1 text-xs border rounded-sm"
          >
            {{ course.state.toUpperCase() }}
          </div>
          <div
            :style="{
              color: course.tierColor,
              borderColor: course.tierColor,
            }"
            :class="`w-4 flex justify-center items-center text-xs rounded-[0.2rem] border bg-gray-700/50`"
          >
            {{ course.tierNo }}
          </div>
          <span class="text-gray-300">
            {{ course.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  width: 300px;
  height: 144px;
  padding: 0.2rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  position: relative;
  background-size: 200% 200%;
  background-position: center;
}

.info::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background: linear-gradient(to right, rgba(46, 46, 46), rgba(46, 46, 46, 0.6));
  z-index: 0;
  transition: background ease-in;
}

.info > * {
  position: relative;
  z-index: 1;
}

.expandable-area {
  transition: max-height 0.2s ease-in;
}

.card-container:hover {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.card-container:hover .info {
  border-bottom-right-radius: 0;
}

.card-container:hover .info::before {
  border-bottom-right-radius: 0;
}

.card-container:hover .expandable-area {
  display: block;
  border-top: 1px solid #4b5563;
  box-shadow:
    4px 4px 0 0 rgba(37, 99, 235, 0.7),
    /* 右下阴影 */ -4px 4px 0 0 rgba(37, 99, 235, 0.7),
    /* 左下阴影 */ 4px 0 0 0 rgba(37, 99, 235, 0.7),
    /* 右边阴影 */ -4px 0 0 0 rgba(37, 99, 235, 0.7),
    /* 左边阴影 */ 0 4px 0 0 rgba(37, 99, 235, 0.7); /* 底部阴影 */
}
</style>
