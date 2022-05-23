import { LaunchpadStatus } from 'config/constants/types'

export const getStatus = (currentBlock: number, startBlock: number, endBlock: number): LaunchpadStatus => {
  // Add an extra check to currentBlock because it takes awhile to fetch so the initial value is 0
  // making the UI change to an inaccurate status
  if (currentBlock === 0) {
    return 'upcoming'
  }

  if (currentBlock < startBlock) {
    return 'upcoming'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock > endBlock) {
    return 'filled'
  }

  return 'upcoming'
}


export default null
