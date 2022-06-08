import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABIV1 from 'config/abi/masterchefV1.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefV1Address } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'
import { ChainId } from '@orbitalswap/sdk'

export const fetchFarmUserAllowances = async (account: string, chainId: ChainId, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefV1Address(chainId)

  const calls = farmsToFetch.filter(farm => farm.chainId === chainId).map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses, farm.chainId)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall<BigNumber[]>(erc20ABI, chainId, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, chainId: ChainId, farmsToFetch: SerializedFarmConfig[]) => {
  const calls = farmsToFetch.filter(farm => farm.chainId === chainId).map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses, farm.chainId)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, chainId, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, chainId: ChainId, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefV1Address(chainId)

  const calls = farmsToFetch.filter(farm => farm.chainId === chainId).map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.v1pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABIV1, chainId, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, chainId: ChainId, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefV1Address(chainId)

  const calls = farmsToFetch.filter(farm => farm.chainId === chainId).map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingCake',
      params: [farm.v1pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABIV1, chainId, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
