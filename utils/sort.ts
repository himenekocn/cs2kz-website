export function sort<T extends Record<string, unknown>>(
  data: T[],
  order: "ascending" | "descending",
  orderBy: string,
) {
  const ord = order === "ascending" ? 1 : -1
  if (!orderBy) return data

  return data.sort((a, b) => {
    const aValue = a[orderBy] as unknown
    const bValue = b[orderBy] as unknown

    if (typeof aValue === "number" && typeof bValue === "number")
      return (aValue - bValue) * ord

    if (typeof aValue === "string" && typeof bValue === "string")
      return aValue.localeCompare(bValue) * ord

    return 0
  })
}
