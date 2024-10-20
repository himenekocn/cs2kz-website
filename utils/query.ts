export function validQuery(query: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== "" && value !== null,
    ),
  )
}
