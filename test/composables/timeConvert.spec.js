import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getRoundedDate,
  getTimeDifference,
  getDayName,
  roundTime
} from '@/composables/timeConvert'

describe('testing time covnvert functions', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('getRoundedDate', () => {
    const date = new Date(2000, 1, 1, 13, 27)
    vi.setSystemTime(date)

    const roundedDate = getRoundedDate(1, date)
    expect(roundedDate).toEqual('2000-02-01T13:27')
  })

  it('getTimeDifference', () => {
    const startDate = new Date(2022, 1, 1, 7, 27)
    let endDate = new Date(2022, 1, 1, 18, 27)

    // test with eatHour = true and min > 540
    let timeDifference = getTimeDifference(startDate, endDate)
    expect(timeDifference).toEqual('10h 0m')

    //test with eatHour = false and min > 540
    timeDifference = getTimeDifference(startDate, endDate, false)
    expect(timeDifference).toEqual('11h 0m')

    // test with eatHour = true and min < 540
    endDate = new Date(2022, 1, 1, 15, 27)
    timeDifference = getTimeDifference(startDate, endDate)
    expect(timeDifference).toEqual('8h 0m')
  })

  it('getDayName', () => {
    const date = '2022-02-13T15:52'
    let dayName = getDayName(date)
    expect(dayName).toEqual('dom')
  })

  it('roundTime', () => {
    const time = '10:26'
    const minutesToRound = 5
    const roundedTime = roundTime(time, minutesToRound)
    expect(roundedTime).toEqual('10:25')
    expect(roundedTime).to.not.equal('10:30')
  })
})
