import type {
  Server,
  ServerWithInfo,
  ServerData,
  ServerInfo,
  ServerQuery,
} from "~/types/server"

export function useServers() {
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
      try {
        const infoData = await $fetch<ServerInfo[]>("/ping", {
          method: "POST",
          body: {
            hosts,
          },
        })

        servers.value = serverData.results.map((s, index) => ({
          ...s,
          info: infoData[index] ?? null,
        }))
      } catch (error) {
        console.log(error)
      }
    } else {
      servers.value = null
    }
  }

  return {
    query,
    servers,
    total,
    getServers,
  }
}
