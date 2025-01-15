<script setup lang="ts">
import type { CourseExt, CourseQuery } from "~/types"

defineProps<{
  courses: CourseExt[]
  loading: boolean
  query: CourseQuery
}>()
</script>

<template>
  <div class="overflow-x-auto mt-8 py-4 px-1">
    <div v-if="loading" class="flex justify-center">
      <IconLoading class="inline" />
    </div>
    <div
      v-else-if="courses.length > 0"
      class="mx-auto w-max grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 xl:place-items-center">
      <CourseCard v-for="course in courses" :key="course.id" :query="query" :course="course" />
    </div>

    <div v-else class="flex justify-center">
      <p class="text-gray-500">
        {{ $t("common.no_data") }}
      </p>
    </div>
  </div>
</template>
