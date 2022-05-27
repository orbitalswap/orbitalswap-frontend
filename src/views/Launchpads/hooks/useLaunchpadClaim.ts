import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useLaunchpadClaim = (ifoContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const onClaim = useCallback(async (): Promise<ethers.providers.TransactionReceipt> => {
    const tx = await callWithGasPrice(ifoContract, 'withdraw', [])
    return tx.wait()
  }, [ifoContract, callWithGasPrice])

  return onClaim
}

export default useLaunchpadClaim
