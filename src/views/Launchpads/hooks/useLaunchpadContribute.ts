import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { UNC_IDO_REF_KEY } from 'config'
import { useWeb3React } from '@web3-react/core'

const useLaunchpadContribute = (ifoContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()

  const onContribute = useCallback(async (amount: string): Promise<ethers.providers.TransactionReceipt> => {
    const tx = await callWithGasPrice(ifoContract, 'contribute', [], {
      value: amount,
    })
    return tx.wait()
  }, [ifoContract, callWithGasPrice])

  return onContribute
}

export default useLaunchpadContribute
