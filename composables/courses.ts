import type { CourseExt, MapData, CourseQuery } from "~/types/map"
import MiniSearch, { type SearchResult } from "minisearch"

export function useCourses() {
  const loading = ref(false)
  const error = ref(null)

  const allCourses = ref<CourseExt[] | null>(null)
  const courses = ref<CourseExt[] | null>(null)

  const total = ref(0)

  const fields = [
    "id",
    "name",
    "tier",
    "map",
    "ranked_status",
    "mappers",
    "img",
  ]
  const miniSearch = new MiniSearch({
    idField: "id",
    fields: ["name", "map", "mappers"],
    storeFields: fields,
    searchOptions: {
      fuzzy: 0.2,
    },
  })

  const query = reactive<CourseQuery>({
    name: "",
    mode: "classic",
    teleports: "standard",
    sort_by: "map",
    sort_order: "ascending",
    created_after: "",
    created_before: "",
    limit: 30,
    offset: 0,
  })

  watch([() => query.mode, () => query.teleports], () => {
    getCourses()
  })

  watch(
    [
      () => query.name,
      () => query.sort_by,
      () => query.sort_order,
      () => query.created_after,
      () => query.created_before,
      () => query.limit,
      () => query.offset,
    ],
    async ([
      name,
      sort_by,
      sort_order,
      created_after,
      created_before,
      limit,
      offset,
    ]) => {
      if (allCourses.value !== null && allCourses.value.length > 0) {
        const searched = search(allCourses.value, name)
        const sorted = sort(searched, sort_order, sort_by)
        // TODO: date filter
        const paginated = sorted.slice(offset, limit)
        courses.value = paginated as (CourseExt & SearchResult)[]
      }
    },
  )

  function search(data: CourseExt[], name: string) {
    if (name === "") {
      return data as (CourseExt & SearchResult)[]
    }

    return miniSearch.search(name) as (CourseExt & SearchResult)[]
  }

  async function getCourses() {
    try {
      loading.value = true

      // fetch all maps at once and do pagination on the frontend
      const data: MapData | undefined = await $api("/maps")

      if (data) {
        miniSearch.removeAll()

        const teleports = query.teleports === "standard" ? false : true

        const res = data.results.flatMap((map) =>
          map.courses.map((course) => {
            const fltr = course.filters.find(
              (filter) =>
                filter.mode === query.mode && filter.teleports === teleports,
            )!!

            return {
              id: course.id,
              name: course.name,
              map: map.name,
              tier: fltr.tier,
              ranked_status: fltr.ranked_status,
              mappers: map.mappers,
              // TODO: map images
              img: getUrl(),
            }
          }),
        )

        allCourses.value = res
        courses.value = res

        total.value = res.length

        miniSearch.addAll(res)
      } else {
        allCourses.value = []
        courses.value = []
      }
    } catch (err: any) {
      error.value = err.data
      allCourses.value = null
      courses.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    courses,
    loading,
    error,
    query,
    total,
    getCourses,
  }
}
