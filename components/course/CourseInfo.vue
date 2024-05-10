<script setup lang="ts">
import type { Map, Course, Mode, Tier } from "~/types/map"
const props = defineProps<{
  course: Course
  mode: Mode
  teleports: "standard" | "pro"
}>()

const currentFilter = computed(
  () =>
    props.course.filters.find(
      (filter) =>
        filter.mode === props.mode &&
        filter.teleports === (props.teleports === "standard" ? false : true),
    )!!,
)

const tier = computed(() => currentFilter.value.tier)

const tierColor = computed(() => getTierColor(tier.value))

const rankedStatus = computed(() => currentFilter.value.ranked_status)

const rankedStatusColors = {
  ranked: "text-white bg-green-600",
  unranked: "text-gray-400 bg-gray-400",
  never: "text-gray-400 bg-gray-400",
}

// TODO: tags
const tags = ["slide", "bhop", "strafe"]
</script>

<template>
  <div :style="{ backgroundImage: `url(${getUrl(true)})` }" class="info">
    <div class="flex flex-col p-4">
      <p class="text-2xl text-gray-100 font-medium">{{ course.name }}</p>

      <div class="flex items-center">
        <span class="text-gray-300 mr-1">made by</span>
        <div v-for="(mapper, index) in course.mappers" :key="mapper.steam_id">
          <NuxtLink
            :to="`/profile/${mapper.steam_id}`"
            class="text-cyan-500 hover:text-cyan-400"
          >
            {{ mapper.name }}
          </NuxtLink>
          <span
            v-if="index < course.mappers.length - 1"
            class="text-gray-300 mr-1"
          >
            ,
          </span>
        </div>
      </div>

      <div class="flex mt-2">
        <span class="text-gray-200 mr-2">Tags:</span>
        <div class="flex gap-2">
          <div
            v-for="tag in tags"
            :key="tag"
            class="w-max px-2 bg-gray-600 text-slate-300 rounded-sm"
          >
            {{ tag }}
          </div>
        </div>
      </div>

      <div class="mt-2">
        <span class="text-gray-200 mr-2">Rating:</span>
        <!-- TODO: course rating -->
        <span class="text-lg text-gray-100 font-medium">7.62</span>
        <span class="text-gray-200">/</span>
        <span class="text-gray-100">10</span>
      </div>

      <div class="flex items-center mt-1">
        <span class="text-gray-200 mr-2">Tier:</span>
        <div :style="{ color: tierColor }" class="font-semibold">
          {{
            tier
              .split("_")
              .map((tier) => tier.at(0)?.toUpperCase() + tier.slice(1))
              .join(" ")
          }}
        </div>
      </div>

      <div
        :class="rankedStatusColors[rankedStatus]"
        class="w-max px-1 mt-1 text-sm rounded-sm font-medium"
      >
        {{ rankedStatus.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-size: cover;
}

.info::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background: rgba(46, 46, 46, 0.6);
  z-index: 0;
}

.info > * {
  position: relative;
  z-index: 1;
}
</style>
