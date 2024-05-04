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
      timeout: 3000,
    })

    promises.push(server.getInfo())
  }

  const info = await Promise.all(promises)

  console.log(info)

  return info.map((i) => ({
    name: i.name,
    map: i.map,
    players: i.players,
    ping: i.ping,
  }))
})
