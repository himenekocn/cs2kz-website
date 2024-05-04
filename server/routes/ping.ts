import { Server } from "vlpt"

export default defineEventHandler(async (event) => {
  const { hosts }: { hosts: { ip: string; port: string }[] } =
    await readBody(event)

  const promises = []

  for (let host of hosts) {
    const { ip, port } = host

    const server = new Server({
      ip,
      port,
      timeout: 2000,
    })

    promises.push(server.getInfo())
  }

  const results = await Promise.allSettled(promises)

  console.log(results)

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return {
        name: result.value.name,
        map: result.value.map,
        players: result.value.players,
        ping: result.value.ping,
      }
    } else {
      return null
    }
  })
})
