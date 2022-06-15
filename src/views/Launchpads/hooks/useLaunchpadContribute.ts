import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useLaunchpadContribute = (launchpadContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()

  const onContribute = useCallback(async (amount: string): Promise<ethers.providers.TransactionReceipt> => {
    const tx = await callWithGasPrice(launchpadContract, 'contribute', [], {
      value: amount,
    })
    return tx.wait()
  }, [launchpadContract, callWithGasPrice])

  return onContribute
}

export default useLaunchpadContribute
