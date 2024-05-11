import type { Tier, CourseExt, MapData, CourseQuery } from "~/types/map"
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
    fields: ["name", "map"],
    storeFields: fields,
  })

  const query = reactive<CourseQuery>({
    name: "",
    mode: "classic",
    teleports: "standard",
    tier: "all",
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
      () => query.tier,
      () => query.name,
      () => query.sort_by,
      () => query.sort_order,

      () => query.limit,
      () => query.offset,
    ],
    async ([tier, name, sort_by, sort_order, limit, offset]) => {
      if (allCourses.value !== null && allCourses.value.length > 0) {
        const searched = search(allCourses.value, name)
        const tiered = matchTier(searched, tier)
        const sorted = sort(tiered, sort_order, sort_by)
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

  function matchTier(data: CourseExt[], tier: Tier | "all") {
    if (tier === "all") {
      return data
    } else {
      return data.filter((course) => course.tier === tier)
    }
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
          map.courses.map((course, index) => {
            const fltr = course.filters.find(
              (filter) =>
                filter.mode === query.mode && filter.teleports === teleports,
            )!!

            return {
              id: course.id,
              name: course.name,
              stage: index,
              map: map.name,
              tier: fltr.tier,
              ranked_status: fltr.ranked_status,
              mappers: course.mappers,
              created_on: map.created_on,
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
