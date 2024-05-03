import type { Server, ServerData, ServerQuery } from "~/types/server"

export function useServers() {
  const servers = ref<Server[]>([])

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
    const data: ServerData | undefined = await $api("/servers", {
      query: validQuery(query),
    })
    if (data) {
      servers.value = data.results
      total.value = data.total
    } else {
      servers.value = []
    }
  }

  return {
    query,
    servers,
    total,
    getServers,
  }
}
