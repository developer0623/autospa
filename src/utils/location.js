import request from 'axios'

export async function coordsFromAddress (address) {
  const { data: { results } } = await request.get(getUrl(address))

  if (!results && results.length < 0) return {}

  const { geometry: { location } } = results[0]
  return { latitude: location.lat, longitude: location.lng }
}

function getUrl (address) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=false`
}
