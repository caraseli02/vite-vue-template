import { ref, watch } from 'vue'

import { useGeolocation } from '@vueuse/core'

export const { coords, locatedAt, error } = useGeolocation()

// Here Maps Revers Geocoding API
// eslint-disable-next-line no-undef
const platform = new H.service.Platform({
  apikey: import.meta.env.VITE_HERE_MAPS_API_KEY,
})
const geocoder = platform.getSearchService()

// check is user confirm geolocation
export const confirmed = ref(false)

export const gpsData = ref(null)
export const gpsLoc = ref(null)
export const gettingLocation = ref(false)
export const watchGeolocation = ref(false)
const errorStr = ref(null)

async function getLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const reverseGeocodingParameters = {
      at: `${latitude},${longitude}`,
    }

    geocoder.reverseGeocode(
      reverseGeocodingParameters,
      (res) => {
        resolve(res.items[0].address)
      },
      e => reject(e),
    )
  })
}
async function locateMe(latitude, longitude) {
  gettingLocation.value = true
  try {
    gpsData.value = await getLocation(latitude, longitude)
    gettingLocation.value = false
  }
  catch (e) {
    gettingLocation.value = false
    errorStr.value = e.message
  }
}

watch(
  coords,
  (newValue) => {
    const { latitude, longitude } = newValue
    if (
      latitude !== Infinity
      && longitude !== Infinity
      && !watchGeolocation.value
    ) {
      gpsLoc.value = {
        lat: latitude,
        lng: longitude,
      }
      locateMe(latitude, longitude)
      watchGeolocation.value = true
    }
  },
  { immediate: true },
)
