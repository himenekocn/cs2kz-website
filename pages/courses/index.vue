<script setup lang="ts">
const { courses, loading, error, query, total, getCourses } = useCourses()

getCourses()
</script>
<template>
  <Main>
    <CourseQuery v-model:query="query" />

    <PageHelper
      :total="total"
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      @refresh="getCourses"
    />

    <CourseGrid :loading="loading" :error="error" :courses="courses" />
  </Main>
</template>
