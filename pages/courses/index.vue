<script setup lang="ts">
const { courses, loading, query, total, getCourses } = useCourses()

getCourses()
</script>
<template>
  <Main>
    <CourseQuery v-model:query="query" />

    <PageHelper
      v-if="total > 0"
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      :total="total"
      @refresh="getCourses"
    />

    <CourseGrid :loading="loading" :courses="courses" />
  </Main>
</template>
