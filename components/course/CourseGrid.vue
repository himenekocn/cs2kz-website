<script setup lang="ts">
import type { CourseExt } from "~/types/map"

defineProps<{
  courses: CourseExt[] | null
  loading: boolean
  error: any
}>()
</script>

<template>
  <div class="overflow-x-auto mt-8 p-4">
    <div v-if="loading" class="flex justify-center">
      <IconLoading class="inline" />
    </div>
    <div
      v-else-if="courses && courses.length > 0"
      class="mx-auto w-max grid xl:grid-cols-2 gap-10 xl:place-items-center"
    >
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>

    <div v-else class="flex justify-center">
      <p v-if="courses?.length === 0" class="text-gray-500">No Data</p>

      <p v-else class="text-red-500">
        {{ error }}
      </p>
    </div>
  </div>
</template>
