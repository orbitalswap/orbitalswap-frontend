import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import uniq from 'lodash/uniq'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)

export const fetchPoolsAllowance = async (account, chainId) => {
  const calls = nonBnbPools
    .filter((p) => p.chainId === chainId)
    .map((pool) => ({
      address: pool.stakingToken.address,
      name: 'allowance',
      params: [account, getAddress(pool.contractAddress, chainId)],
    }))

  const allowances = await multicall(erc20ABI, chainId, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account, chainId) => {
  // Non BNB pools
  const tokens = uniq(nonBnbPools.filter((p) => p.chainId === chainId).map((pool) => pool.stakingToken.address))
  const calls = tokens.map((token) => ({
    address: token,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, chainId, calls)
  const tokenBalances = tokens.reduce((acc, token, index) => ({ ...acc, [token]: tokenBalancesRaw[index] }), {})
  const poolTokenBalances = nonBnbPools.reduce(
    (acc, pool) => ({
      ...acc,
      ...(tokenBalances[pool.stakingToken.address] && {
        [pool.sousId]: new BigNumber(tokenBalances[pool.stakingToken.address]).toJSON(),
      }),
    }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider(chainId).getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...poolTokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account, chainId) => {
  const calls = nonMasterPools
    .filter((p) => p.chainId === chainId)
    .map((p) => ({
      address: getAddress(p.contractAddress, chainId),
      name: 'userInfo',
      params: [account],
    }))
  const userInfo = await multicall(sousChefABI, chainId, calls)
  return nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )
}

export const fetchUserPendingRewards = async (account, chainId) => {
  const calls = nonMasterPools
    .filter((p) => p.chainId === chainId)
    .map((p) => ({
      address: getAddress(p.contractAddress, chainId),
      name: 'pendingReward',
      params: [account],
    }))
  const res = await multicall(sousChefABI, chainId, calls)
  return nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )
}
