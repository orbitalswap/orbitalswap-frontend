import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import launchpadAbi from 'config/abi/launchpad.json'
import { Launchpad } from 'config/constants/types'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import useRefresh from 'hooks/useRefresh'
import { UserLaunchpadData } from '../types'

// Retrieve IFO allowance
const useLaunchpadUserData = (ifo: Launchpad, dependency?: any): UserLaunchpadData => {
  const ifoAddress = getAddress(ifo.address)
  const { account } = useWeb3React()

  const [contributedAmount, setContributedAmount] = useState<BigNumber>(BIG_ZERO)
  const [claimed, setClaimed] = useState(false)

  const { fastRefresh } = useRefresh()
  
  useEffect(() => {
    const fetchContributedAmount = async () => {
      const ifoCalls = [{
        address: ifoAddress,
        name: 'funders',
        params: [account]
      }]
      const [contributeData] = await multicall(launchpadAbi, ifoCalls)

      setContributedAmount(getBalanceAmount(new BigNumber(contributeData.amount?._hex)))
      setClaimed(contributeData.claimed)
    }

    if (account)
      fetchContributedAmount()
  }, [ifoAddress, account, fastRefresh, dependency])

  return { contributedAmount, claimed }
}

export default useLaunchpadUserData
