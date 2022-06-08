import { useEffect, useState } from 'react'
import { useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { getBunnySpecialXmasContract } from 'utils/contractHelpers'
import { simpleRpcProvider } from 'utils/providers'
import ClaimNftModal from 'components/ClaimNftModal/ClaimNftModal'
import noop from 'lodash/noop'
import useActiveWeb3React from './useActiveWeb3React'

const useNftClaimStatusCheck = () => {
  const [hasDisplayedModal, setHasDisplayedModal] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  const [onPresentNftClaimModal] = useModal(<ClaimNftModal />)

  useEffect(() => {
    const checkClaimStatus = async () => {
      try {
        const canClaim = await getBunnySpecialXmasContract(chainId).canClaim(account)
        if (canClaim) {
          onPresentNftClaimModal()
          setHasDisplayedModal(true)
        }
      } catch (error) {
        // User not registered throws here
        noop()
      }
    }
    if (account && !hasDisplayedModal) {
      checkClaimStatus()
    }
  }, [account, chainId, hasDisplayedModal, onPresentNftClaimModal])

  // Reset when account changes
  useEffect(() => {
    setHasDisplayedModal(false)
  }, [account])
}

export default useNftClaimStatusCheck
