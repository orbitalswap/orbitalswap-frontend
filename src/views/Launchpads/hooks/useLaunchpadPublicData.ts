import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import launchpadAbi from 'config/abi/launchpad.json'
import { Launchpad } from 'config/constants/types'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { PublicLaunchpadData } from '../types'

// Retrieve LAUNCHPAD allowance
const useLaunchpadPublicData = (ifo: Launchpad, dependency?: any): PublicLaunchpadData => {
  const [data, setData] = useState<PublicLaunchpadData>({
    ...ifo,
    isLoading: true,
    startDateNum: 0,
    endDateNum: 0,
    liquidityPercent: BIG_ZERO,
    hardcap: BIG_ZERO,
    softcap: BIG_ZERO,
    presalePrice: BIG_ZERO,
    minPerTx: BIG_ZERO,
    maxPerUser: BIG_ZERO,
    totalSold: BIG_ZERO,
  })

  const ifoAddress = getAddress(ifo.address)

  useEffect(() => {
    const fetchLaunchpadPublicData = async () => {
      const ifoCalls = ['startTime', 'endTime', 'LIQUIDITY_PERCENT', 'HARD_CAP', 'SOFT_CAP', 'TOKEN_PRICE', 'CONTRIBUTION_MIN', 'CONTRIBUTION_MAX', 'totalSold'].map((method) => ({
        address: ifoAddress,
        name: method
      }))
      const [startDate, endDate, liquidityPercent, hardcap, softcap, presalePrice, minPerTx, maxPerUser, totalSold] = await multicall(launchpadAbi, ifoCalls)

      const startDateNum = parseInt(startDate, 10)
      const endDateNum = parseInt(endDate, 10)
      
      setData({
        ...ifo,
        isLoading: false,
        liquidityPercent: getBalanceAmount(new BigNumber(liquidityPercent)),
        softcap: getBalanceAmount(new BigNumber(softcap)),
        hardcap: getBalanceAmount(new BigNumber(hardcap)),
        presalePrice: getBalanceAmount(new BigNumber(presalePrice)),
        minPerTx: getBalanceAmount(new BigNumber(minPerTx)),
        maxPerUser: getBalanceAmount(new BigNumber(maxPerUser)),
        totalSold: getBalanceAmount(new BigNumber(totalSold)),
        endDateNum,
        startDateNum
      })
    }

    fetchLaunchpadPublicData()
  }, [ifo, ifoAddress])

  return data
}

export default useLaunchpadPublicData
