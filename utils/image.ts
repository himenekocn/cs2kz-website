// for testing
const maps = [
  "kz_natureblock_scte",
  "kz_bhop_algetic",
  "kz_tangent",
  "kz_maxine",
  "kz_bigcastle",
  "kz_mz",
]

export function getUrl() {
  const map = maps[Math.floor(Math.random() * maps.length)]

  return `https://kzglobalteam.github.io/map-images/webp/medium/${map}.webp?raw=true`
}
