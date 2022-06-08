import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useCakeVault, usePoolsWithVault } from 'state/pools/hooks'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { useAppDispatch } from 'state'
import {
  fetchCakePoolUserDataAsync,
  fetchCakeVaultFees,
  fetchCakeVaultPublicData,
  fetchCakeVaultUserData,
} from 'state/pools'
import PoolsTable from './PoolTable'

const NewPool: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const { pools } = usePoolsWithVault()
  const cakeVault = useCakeVault()

  const stakedOnlyOpenPools = useMemo(
    () => pools.filter((pool) => pool.userData && pool.sousId === 0 && !pool.isFinished && pool.chainId === chainId),
    [pools],
  )

  const userDataReady: boolean = !account || (!!account && !cakeVault.userData?.isLoading)

  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    dispatch(fetchCakeVaultPublicData({chainId}))
    if (account) {
      dispatch(fetchCakeVaultUserData({ account, chainId }))
      dispatch(fetchCakePoolUserDataAsync(account, chainId))
    }
  }, [account, chainId, dispatch])

  useEffect(() => {
    dispatch(fetchCakeVaultFees({chainId}))
  }, [chainId, dispatch])

  return <PoolsTable pools={stakedOnlyOpenPools} account={account} userDataReady={userDataReady} />
}

export default NewPool
