import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import launchpadAbi from 'config/abi/launchpad.json'
import { Launchpad, PresaleStatus } from 'config/constants/types'
import { formatBigNumber, getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import useRefresh from 'hooks/useRefresh'
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
    raised: BIG_ZERO,
    fundersCounter: BIG_ZERO,
    presaleStatus: 0
  })

  const ifoAddress = getAddress(ifo.address)

  const { slowRefresh, fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchLaunchpadPublicData = async () => {
      const ifoCalls = [
        'startTime',
        'endTime',
        'LIQUIDITY_PERCENT',
        'HARD_CAP',
        'SOFT_CAP',
        'TOKEN_PRICE',
        'CONTRIBUTION_MIN',
        'CONTRIBUTION_MAX',
        'totalSold',
        'status',
        'totalRaised',
        'fundersCounter'
      ].map((method) => ({
        address: ifoAddress,
        name: method
      }))
      const [startDate, endDate, liquidityPercent, hardcap, softcap, presalePrice, minPerTx, maxPerUser, totalSold, status, totalRaised, fundersCounter] = await multicall(launchpadAbi, ifoCalls)

      const startDateNum = parseInt(startDate, 10)
      const endDateNum = parseInt(endDate, 10)


      setData({
        ...ifo,
        isLoading: false,
        liquidityPercent: getBalanceAmount(new BigNumber(liquidityPercent), 0),
        softcap: getBalanceAmount(new BigNumber(softcap)),
        hardcap: getBalanceAmount(new BigNumber(hardcap)),
        presalePrice: getBalanceAmount(new BigNumber(presalePrice), 5),
        minPerTx: getBalanceAmount(new BigNumber(minPerTx)),
        maxPerUser: getBalanceAmount(new BigNumber(maxPerUser)),
        totalSold: getBalanceAmount(new BigNumber(totalSold), 5),
        raised: getBalanceAmount(new BigNumber(totalRaised)),
        fundersCounter: getBalanceAmount(new BigNumber(fundersCounter), 0),
        presaleStatus: status[0],
        endDateNum,
        startDateNum
      })
    }

    fetchLaunchpadPublicData()
  }, [ifo, ifoAddress, fastRefresh])

  return data
}

export default useLaunchpadPublicData
