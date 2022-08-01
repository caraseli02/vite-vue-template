export const getRoundedDate = (minutes: number, d = new Date()) => {
  const ms = 1000 * 60 * minutes // convert minutes to ms
  let roundedDate = new Date(Math.round(d.getTime() / ms) * ms)
  roundedDate = new Date(
    roundedDate.getTime() - roundedDate.getTimezoneOffset() * 60000,
  )
  const dateToReturn = roundedDate.toISOString().slice(0, 16)
  return dateToReturn
}

// calculate the time difference between two dates
export const getTimeDifference = (
  startDate: string | Date,
  endDate: string | Date,
  eatHour = true,
) => {
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  let diff = endDate.getTime() - startDate.getTime()
  const workedMin = Math.floor(diff / (1000 * 60))

  let hours = Math.floor(diff / (1000 * 60 * 60))
  diff -= hours * (1000 * 60 * 60)
  const minutes = Math.floor(diff / (1000 * 60))

  if (eatHour && workedMin > 540)
    hours = hours - 1

  return `${hours}h ${minutes}m`
}

export const roundTime = (time: string, minutesToRound: number) => {
  const [hours, minutes] = time.split(':')
  const nHours = parseInt(hours)
  const nMinutes = parseInt(minutes)

  // Convert hours and minutes to time in minutes
  const nTime = nHours * 60 + nMinutes

  const rounded = Math.round(nTime / minutesToRound) * minutesToRound
  const rHr = `${Math.floor(rounded / 60)}`
  const rMin = `${rounded % 60}`

  return `${rHr.padStart(2, '0')}:${rMin.padStart(2, '0')}`
}

export const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

// export function getDayName(dateString: string) {
//   Array.isArray(dateString) ? (dateString = dateString[0]) : null
//   const d = new Date(dateString)
//   const dayName = days[d.getDay()]
//   return dayName
// }
