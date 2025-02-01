<script setup lang="ts">
const { courses, loading, query, total, getCourses } = useCourses()

getCourses()
</script>
<template>
  <Main>
    <CourseQuery v-model:query="query" />

    <div v-if="total > 0" class="px-4 py-2 mt-8 border border-gray-700 rounded-md lg:mx-auto lg:w-max">
      <Pagination v-model:limit="query.limit" v-model:offset="query.offset" :total="total" @refresh="getCourses" />
    </div>

    <CourseList :query="query" :loading="loading" :courses="courses" />
  </Main>
</template>
