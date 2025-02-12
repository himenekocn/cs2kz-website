<script setup lang="ts">
const { courses, loading, query, getCourses } = useCourses()

getCourses()

function loadCourses() {
  if (courses.value.length > 0) {
    query.limit += 30
  }
}
</script>
<template>
  <Main>
    <CourseQuery v-model:query="query" />

    <CourseList :query="query" :loading="loading" :courses="courses" @infinite="loadCourses" />
  </Main>
</template>
