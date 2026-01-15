import type { Server, ServerResponse, ServerQuery, RunningServer, GeoData } from '@/types'
import { debounce } from 'radash'
import { ref, reactive, watch, computed } from 'vue'
import { api, sort } from '@/utils'
import axios from 'axios'

export function useServers() {
  const loading = ref(false)
  const error = ref(null)
  const allServers = ref<Server[]>([])

  const runningServers = ref<RunningServer[]>([])

  const availableCountries = ref<{ name: string; code: string; occurences: number }[]>([])

  const query = reactive<ServerQuery>({
    name: '',
    map: '',
    owner: '',
    country_codes: [],
    globalMapOnly: false,
    sortBy: 'name',
    sortOrder: 'ascending',
  })

  // 防抖查询字段
  const debouncedQuery = reactive({
    name: '',
    map: '',
    owner: '',
  })

  // 防抖更新函数
  function updateDebouncedQuery() {
    debouncedQuery.name = query.name
    debouncedQuery.map = query.map
    debouncedQuery.owner = query.owner
  }

  const debouncedUpdate = debounce({ delay: 300 }, updateDebouncedQuery)

  // 监听原始查询字段变化，应用防抖
  watch([() => query.name, () => query.map, () => query.owner], debouncedUpdate)

  const servers = computed(() => {
    const filtered = runningServers.value.filter(
      (server) =>
        server.name.toLowerCase().includes(debouncedQuery.name.toLowerCase()) &&
        server.owner.name.toLowerCase().includes(debouncedQuery.owner.toLowerCase()) &&
        server.current_map.name.toLowerCase().includes(debouncedQuery.map.toLowerCase()) &&
        (query.country_codes.length === 0 ? true : query.country_codes.includes(server.country!.code)) &&
        (query.globalMapOnly ? server.current_map.isGlobal : true),
    )

    const sorted = sort(filtered, query.sortOrder, query.sortBy)

    return sorted
  })

  async function fetchServers() {
    try {
      loading.value = true

      const { data } = await api.get<ServerResponse | undefined>('/servers', {
        params: { limit: 10000, offset: 0 },
      })
      if (data) {
        const reachableServers = data.values.filter((server) => server.a2s_info !== null)

        runningServers.value = reachableServers.map((server) => {
          return {
            id: server.id,
            name: server.name,
            host: server.host,
            port: server.port,
            owner: server.owner,
            country: null,
            approved_at: server.approved_at,
            current_map: {
              name: server.a2s_info!.current_map,
              isGlobal: server.a2s_info!.current_map_info !== null,
            },
            num_players: server.a2s_info!.num_players,
            max_players: server.a2s_info!.max_players,
          }
        })
      } else {
        allServers.value = []
      }
    } catch (err) {
      console.error(err)
      allServers.value = []
    } finally {
      loading.value = false
    }
  }

  async function fillCountries() {
    try {
      const { data } = await axios.post<GeoData[]>(`${import.meta.env.VITE_GOKZ_TOP_API_URL}/misc/ip`, {
        addresses: runningServers.value.map((server) => server.host),
      })

      if (data) {
        runningServers.value.forEach((server, index) => {
          server.country = { name: data[index].country, code: data[index].country_code }
        })
        availableCountries.value = data
          .reduce(
            (acc, item) => {
              const existing = acc.find((i) => i.code === item.country_code)
              if (existing) {
                existing.occurences++
              } else {
                acc.push({ name: item.country, code: item.country_code, occurences: 1 })
              }
              return acc
            },
            [] as { name: string; code: string; occurences: number }[],
          )
          .sort((a, b) => b.occurences - a.occurences)
      } else {
        availableCountries.value = []
      }
    } catch (err) {
      console.error(err)
      availableCountries.value = []
    }
  }

  async function getServers() {
    await fetchServers()
    await fillCountries()
  }

  function resetQuery() {
    query.name = ''
    query.map = ''
    query.owner = ''
    query.country_codes = []
    query.globalMapOnly = false
    query.sortBy = 'name'
    query.sortOrder = 'ascending'
  }

  getServers()

  return {
    resetQuery,
    servers,
    availableCountries,
    loading,
    error,
    query,
  }
}
