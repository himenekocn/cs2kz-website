export function validQuery(query: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== ""),
  )
}
