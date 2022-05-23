import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { UNC_IDO_REF_KEY } from 'config'
import { useWeb3React } from '@web3-react/core'

const useLaunchpadContribute = (ifoContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account } = useWeb3React()

  const onContribute = useCallback(async (amount: string): Promise<ethers.providers.TransactionReceipt> => {
    let referrer = localStorage.getItem(UNC_IDO_REF_KEY) || ''
    if (!ethers.utils.isAddress(referrer)) {
      console.error('no valid address', referrer)
      referrer = account
    }

    const tx = await callWithGasPrice(ifoContract, 'contribute', [referrer], {
      value: amount,
    })
    return tx.wait()
  }, [ifoContract, callWithGasPrice, account])

  return onContribute
}

export default useLaunchpadContribute
