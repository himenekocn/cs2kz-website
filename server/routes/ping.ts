import { Server, type ServerInfo } from "vlpt"

export default defineEventHandler(async (event) => {
  const { hosts }: { hosts: { ip: string; port: string }[] } = await readBody(event)

  console.log("read hosts", hosts)

  const promises = []

  for (const host of hosts) {
    const { ip, port } = host

    const server = new Server({
      ip,
      port,
      timeout: 2000,
    })

    promises.push(server.getInfo())
  }

  const results = (await Promise.allSettled(promises)) as PromiseSettledResult<ServerInfo & { ping: number }>[]

  console.log("promise results", results)

  return results.map((result) => {
    if (result.status === "fulfilled") {
      const ping = result.value.ping
      let connection: string
      // keys for color mapping
      if (ping < 75) {
        connection = "good"
      } else if (ping < 175) {
        connection = "mid"
      } else {
        connection = "bad"
      }

      return {
        name: result.value.name,
        map: result.value.map,
        players: result.value.players,
        hasPassword: result.value.hasPassword,
        VAC: result.value.VAC,
        version: result.value.version,
        ping,
        connection,
      }
    } else {
      return null
    }
  })
})
