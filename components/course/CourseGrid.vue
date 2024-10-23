<script setup lang="ts">
import type { CourseExt } from "~/types"

defineProps<{
  courses: CourseExt[] | null
  loading: boolean
}>()
</script>

<template>
  <div class="overflow-x-auto mt-8 py-4 px-1">
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
      <p class="text-gray-500">
        {{ $t("common.no_data") }}
      </p>
    </div>
  </div>
</template>
