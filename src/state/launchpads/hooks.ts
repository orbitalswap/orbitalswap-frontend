import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'

import { launchpadsConfig } from 'config/constants'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { useAppDispatch } from 'state'
import { DeserializedLaunchpad, DeserializedLaunchpadUserData, SerializedLaunchpad, State } from 'state/types'
import { deserializeToken } from 'state/user/hooks/helpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { fetchLaunchpadsPublicDataAsync, fetchLaunchpadUserDataAsync } from '.'

export const usePollLaunchpadPublicData = () => {
  const dispatch = useAppDispatch()

  useSlowRefreshEffect(() => {
    const pids = launchpadsConfig.filter((launchpad) => launchpad.isActive).map((launchpad) => launchpad.id)

    dispatch(fetchLaunchpadsPublicDataAsync(pids))
  }, [dispatch])
}

export const useFetchUserLaunchpads = (account) => {
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    const pids = launchpadsConfig.filter((launchpad) => launchpad.isActive).map((launchpad) => launchpad.id)

    if (account) {
      dispatch(fetchLaunchpadUserDataAsync(account, pids))
    }
  }, [account, dispatch])
}

export const useLaunchpadsPageFetch = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  usePollLaunchpadPublicData()

  useFastRefreshEffect(() => {
    const pids = launchpadsConfig.filter((launchpad) => launchpad.isActive).map((launchpad) => launchpad.id)
    if (account) {
      dispatch(fetchLaunchpadUserDataAsync(account, pids))
    }
  }, [account, dispatch])
}

const deserializeLaunchpadUserData = (launchpad: SerializedLaunchpad): DeserializedLaunchpadUserData => {
  return {
    allowance: launchpad.userData ? new BigNumber(launchpad.userData.allowance) : BIG_ZERO,
    tokenBalance: launchpad.userData ? new BigNumber(launchpad.userData.tokenBalance) : BIG_ZERO,
    contributedAmount: launchpad.userData ? new BigNumber(launchpad.userData.contributedAmount) : BIG_ZERO,
    earnings: launchpad.userData ? new BigNumber(launchpad.userData.earnings) : BIG_ZERO,
    claimed: launchpad.userData ? launchpad.userData.claimed : false,
  }
}

const deserializeLaunchpad = (launchpad: SerializedLaunchpad): DeserializedLaunchpad => {
  const { id, isActive, address, name, subTitle, description, projectSiteUrl, releaseAt } = launchpad

  return {
    id,
    isActive,
    address,
    name,
    subTitle,
    description,
    projectSiteUrl,
    releaseAt,
    token: deserializeToken(launchpad.token),
    currency: launchpad.currency ? deserializeToken(launchpad.currency) : undefined,
    userData: deserializeLaunchpadUserData(launchpad),
    liquidityPercent: launchpad.liquidityPercent ?? 0,
    softcap: launchpad.softcap ? new BigNumber(launchpad.softcap) : BIG_ZERO,
    hardcap: launchpad.hardcap ? new BigNumber(launchpad.hardcap) : BIG_ZERO,
    presalePrice: launchpad.presalePrice ? new BigNumber(launchpad.presalePrice) : BIG_ZERO,
    minPerTx: launchpad.minPerTx ? new BigNumber(launchpad.minPerTx) : BIG_ZERO,
    maxPerUser: launchpad.maxPerUser ? new BigNumber(launchpad.maxPerUser) : BIG_ZERO,
    totalSold: launchpad.totalSold ? new BigNumber(launchpad.totalSold) : BIG_ZERO,
    totalRaised: launchpad.totalRaised ? new BigNumber(launchpad.totalRaised) : BIG_ZERO,
    fundersCounter: launchpad.fundersCounter ?? 0,
    presaleStatus: launchpad.presaleStatus ?? 0,
    startDate: launchpad.startDate ? launchpad.startDate : 0,
    endDate: launchpad.endDate ? launchpad.endDate : 0,
  }
}

export const useLaunchpads = (): { launchpads: DeserializedLaunchpad[]; userDataLoaded: boolean } => {
  return useSelector((state: State) => ({
    launchpads: state.launchpads.data.map(deserializeLaunchpad),
    userDataLoaded: state.launchpads.userDataLoaded,
  }))
}

export const useLaunchpadFromId = (id: number): DeserializedLaunchpad => {
  const launchpad = useSelector((state: State) => state.launchpads.data.find((f) => f.id === id))
  return deserializeLaunchpad(launchpad)
}
