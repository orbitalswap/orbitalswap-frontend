import merge from 'lodash/merge'
import BigNumber from 'bignumber.js'
import { ChainId } from '@orbitalswap/sdk'

import launchpadAbi from 'config/abi/launchpad.json'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import launchpadList from 'config/constants/launchpads'
import { PublicLaunchpadData } from 'state/launchpads/types'
import multicall from 'utils/multicall'

/**
 * Fetch collection data by combining data from the API (static metadata) and the Subgraph (dynamic market data)
 */
export const getLaunchpad = async (launchpadAddress: string): Promise<PublicLaunchpadData> => {
  try {
    const ifoCalls = [
      'startTime',
      'endTime',
      'HARD_CAP',
      'SOFT_CAP',
      'TOKEN_PRICE',
      'CONTRIBUTION_MIN',
      'CONTRIBUTION_MAX',
      'totalSold',
    ].map((method) => ({
      address: launchpadAddress,
      name: method,
    }))
    const [startDate, endDate, hardcap, softcap, presalePrice, minPerTx, maxPerUser, totalSold] = await multicall(
      launchpadAbi,
      ifoCalls,
    )

    const startDateNum = parseInt(startDate, 10)
    const endDateNum = parseInt(endDate, 10)

    const staticLaunchpadInfo = launchpadList.find(
      (staticLaunchpad) => staticLaunchpad.address[ChainId.BSC_MAINNET] === launchpadAddress,
    )

    return merge({}, staticLaunchpadInfo, {
      isLoading: false,
      softcap: getBalanceNumber(new BigNumber(softcap)),
      hardcap: getBalanceNumber(new BigNumber(hardcap)),
      presalePrice: getBalanceNumber(new BigNumber(presalePrice)),
      minPerTx: getBalanceNumber(new BigNumber(minPerTx)),
      maxPerUser: getBalanceNumber(new BigNumber(maxPerUser)),
      totalSold: getBalanceNumber(new BigNumber(totalSold)),
      endDateNum,
      startDateNum,
    })
  } catch (error) {
    console.error('Unable to fetch data:', error)
    return null
  }
}

export const getLaunchpads = () => {
  return launchpadList
}
