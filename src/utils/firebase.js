export const toArray = data => {
  if (!data) return []

  const keys = Object.keys(data)
  return keys.map(key => ({
    id: key,
    ...data[key]
  }))
}
