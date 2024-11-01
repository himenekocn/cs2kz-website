<script setup lang="ts">
const { courses, loading, query, total, getCourses } = useCourses()

getCourses()
</script>
<template>
  <Main>
    <CourseQuery v-model:query="query" />

    <div
      class="px-4 py-2 mt-8 border border-gray-700 rounded-md lg:mx-auto lg:w-max"
    >
      <PageHelper
        v-if="total > 0"
        v-model:limit="query.limit"
        v-model:offset="query.offset"
        :total="total"
        @refresh="getCourses"
      />
    </div>

    <CourseGrid :loading="loading" :courses="courses" />
  </Main>
</template>
