import type {
  ServerWithInfo,
  ServerData,
  ServerInfo,
  ServerQuery,
} from "~/types/server"

export function useServers() {
  const loading = ref(false)
  const error = ref(null)
  const servers = ref<ServerWithInfo[] | null>(null)

  const total = ref(0)

  const query = reactive<ServerQuery>({
    name: "",
    ip_address: "",
    owned_by: "",
    created_after: "",
    created_before: "",
    limit: 30,
    offset: 0,
  })

  watch(query, () => {
    getServers()
  })

  async function getServers() {
    try {
      loading.value = true
      const serverData: ServerData | undefined = await $api("/servers", {
        query: validQuery(query),
      })
      if (serverData) {
        total.value = serverData.total

        const hosts = serverData.results.map((server) => {
          const [ip, port] = server.ip_address.split(":")
          return {
            ip,
            port,
          }
        })
        const infoData = await $fetch<ServerInfo[]>("/ping", {
          method: "POST",
          body: {
            hosts,
          },
        })

        servers.value = serverData.results.map((s, index) => ({
          ...s,
          info: infoData[index],
        }))
      } else {
        servers.value = []
      }
    } catch (err: any) {
      error.value = err.data
      servers.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    servers,
    loading,
    error,
    query,
    total,
    getServers,
  }
}
