<script setup lang="ts">
import type { Course, Map, Teleports, Mode } from "~/types"

const props = defineProps<{
  course: Course
  map: Map
  mode: Mode
  hasTeleports: Teleports
}>()

const tier = computed(() =>
  props.hasTeleports === "overall"
    ? props.course.filters[props.mode].nub_tier
    : props.course.filters[props.mode].pro_tier,
)

const tierColor = computed(() => getTierColor(tier.value))

const filterState = computed(() => props.course.filters[props.mode].state)

const stateColorMap = {
  ranked: "text-white bg-green-600",
  unranked: "text-gray-400 bg-gray-400",
  pending: "text-gray-400 bg-gray-400",
}

const backgroundImage = computed(
  () => `url('https://github.com/kzglobalteam/cs2kz-images/raw/public/webp/full/${props.map.name}/1.webp')`,
)

// TODO: tags
// const tags = ["slide", "bhop", "strafe"]
</script>

<template>
  <div
    :style="{
      backgroundImage,
    }"
    class="animate-fade-in info"
  >
    <p class="text-2xl text-gray-100 font-medium">{{ course.name }}</p>

    <div class="flex items-center">
      <span class="text-gray-300 mr-1">{{ $t("map.madeBy") }}</span>
      <div v-for="(mapper, index) in course.mappers" :key="mapper.id">
        <NuxtLink :to="`/profile/${mapper.id}`" class="text-cyan-500 hover:text-cyan-400">
          {{ mapper.name }}
        </NuxtLink>
        <span v-if="index < course.mappers.length - 1" class="text-gray-300 mr-1">,</span>
      </div>
    </div>

    <!-- <div class="flex mt-2">
      <span class="text-gray-200 mr-2">{{ `${$t("map.tags")}:` }}</span>
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
      <span class="text-gray-200 mr-2">{{ `${$t("map.rating")}:` }}</span>
      <span class="text-lg text-gray-100 font-medium">7.62</span>
      <span class="text-gray-200">/</span>
      <span class="text-gray-100">10</span>
    </div> -->

    <div class="flex items-center mt-1">
      <span class="text-gray-200 mr-2">{{ `${$t("map.tier")}:` }}</span>
      <div :style="{ color: tierColor }" class="font-semibold">
        {{ transformTier(tier) }}
      </div>
    </div>

    <div :class="stateColorMap[filterState]" class="w-max px-1 mt-1 text-sm rounded-sm font-medium">
      {{ $t(`map.filterState.${filterState}`) }}
    </div>
  </div>
</template>

<style scoped>
.info {
  position: relative;
  aspect-ratio: 16/9;
  padding: 1rem;
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
