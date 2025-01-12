<script setup lang="ts">
import type { CourseExt } from "~/types"
defineProps<{
  course: CourseExt
}>()
</script>

<template>
  <div
    class="card w-max flex items-center rounded-md ring ring-blue-600/20 hover:ring-blue-600/70 hover:ring-4 transition ease-in cursor-pointer"
    @click="navigateTo(`/maps/${course.map}?course=${course.name}`)">
    <img
      :src="course.img"
      onerror="this.onerror = null; this.src = '/img/cs2kz_medium.jpg'"
      loading="lazy"
      class="animate-fade-in w-64 h-auto rounded-l-md" >

    <div :style="{ backgroundImage: `url(${course.img})` }" class="info">
      <p class="text-gray-100 font-medium text-lg">{{ course.map }}</p>
      <div class="flex gap-1">
        <IconCourse width="1rem" />
        <p class="text-gray-300">{{ course.name }}</p>
      </div>

      <div class="flex items-center text-sm">
        <span class="text-gray-400 mr-1">made by</span>
        <div v-for="(mapper, index) in course.mappers" :key="mapper.id">
          <NuxtLink :to="`/profile/${mapper.id}`" class="text-cyan-600 hover:text-cyan-400">
            {{ mapper.name }}
          </NuxtLink>
          <span v-if="index < course.mappers.length - 1" class="text-gray-400 mr-1"> , </span>
        </div>
      </div>

      <div class="flex items-center gap-1 mt-6">
        <IconDate />
        <span class="text-xs text-gray-200 leading-[14px]">
          {{ toLocal(course.created_on).slice(0, 10) }}
        </span>
      </div>

      <div class="flex items-center gap-2 mt-1">
        <div
          :class="course.state === 'ranked' ? 'text-green-400 bg-green-300/20' : 'text-gray-300'"
          class="px-1 text-xs border rounded-sm">
          {{ course.state.toUpperCase() }}
        </div>

        <p :style="{ color: getTierColor(course.tier as string) }" class="font-semibold">
          {{
            course.tier
              .split("_")
              .map((tier) => tier.at(0)?.toUpperCase() + tier.slice(1))
              .join(" ")
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  width: 300px;
  height: 144px;
  padding: 0.1rem 0.5rem;
  display: flex;
  flex-direction: column;
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
</style>
