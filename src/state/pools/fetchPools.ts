import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import chunk from 'lodash/chunk'
import sousChefV2 from '../../config/abi/sousChefV2.json'
import sousChefV3 from '../../config/abi/sousChefV3.json'
import { ChainId } from '@orbitalswap/sdk'

export const fetchPoolsBlockLimits = async (chainId: ChainId) => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0 && p.chainId === chainId)
  const startEndBlockCalls = poolsWithEnd.flatMap((poolConfig) => {
    return [
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'startBlock',
      },
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'bonusEndBlock',
      },
    ]
  })
  const startEndBlockRaw = await multicall(sousChefABI, chainId, startEndBlockCalls)

  const startEndBlockResult = startEndBlockRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2)

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const [[startBlock], [endBlock]] = startEndBlockResult[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: startBlock.toNumber(),
      endBlock: endBlock.toNumber(),
    }
  })
}


export const fetchPoolsTotalStaking = async (chainId: ChainId) => {
  const poolsBalanceOf = poolsConfig.filter(pool => pool.chainId === chainId).map((poolConfig) => {
    return {
      address: poolConfig.stakingToken.address,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress, poolConfig.chainId)],
    }
  })
  const poolsTotalStaked = await multicall(erc20ABI, chainId, poolsBalanceOf)

  return poolsConfig.map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
  }))
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
  chainId: ChainId,
): Promise<{ [key: string]: { stakingLimit: BigNumber; numberBlocksForUserLimit: number } }> => {
  const validPools = poolsConfig
    .filter((p) => !p.stakingToken.isNative && !p.isFinished && p.chainId === chainId)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  const poolStakingCalls = validPools
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['hasUserLimit', 'poolLimitPerUser', 'numberBlocksForUserLimit'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  const poolStakingResultRaw = await multicallv2(sousChefV2, chainId, poolStakingCalls, { requireSuccess: false })
  const chunkSize = poolStakingCalls.length / validPools.length
  const poolStakingChunkedResultRaw = chunk(poolStakingResultRaw.flat(), chunkSize)
  return poolStakingChunkedResultRaw.reduce((accum, stakingLimitRaw, index) => {
    const hasUserLimit = stakingLimitRaw[0]
    const stakingLimit = hasUserLimit && stakingLimitRaw[1] ? new BigNumber(stakingLimitRaw[1].toString()) : BIG_ZERO
    const numberBlocksForUserLimit = stakingLimitRaw[2] ? (stakingLimitRaw[2] as EthersBigNumber).toNumber() : 0
    return {
      ...accum,
      [validPools[index].sousId]: { stakingLimit, numberBlocksForUserLimit },
    }
  }, {})
}


export const fetchPoolsProfileRequirement = async (chainId: ChainId): Promise<{
  [key: string]: {
    required: boolean
    thresholdPoints: BigNumber
  }
}> => {
  const poolsWithV3 = poolsConfig.filter((pool) => pool?.version === 3 && pool?.chainId === chainId)
  const poolProfileRequireCalls = poolsWithV3
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['pancakeProfileIsRequested', 'pancakeProfileThresholdPoints'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  const poolProfileRequireResultRaw = await multicallv2(sousChefV3, chainId, poolProfileRequireCalls, { requireSuccess: false })
  const chunkSize = poolProfileRequireCalls.length / poolsWithV3.length
  const poolStakingChunkedResultRaw = chunk(poolProfileRequireResultRaw.flat(), chunkSize)
  return poolStakingChunkedResultRaw.reduce((accum, poolProfileRequireRaw, index) => {
    const hasProfileRequired = poolProfileRequireRaw[0]
    const profileThresholdPoints = poolProfileRequireRaw[1]
      ? new BigNumber(poolProfileRequireRaw[1].toString())
      : BIG_ZERO
    return {
      ...accum,
      [poolsWithV3[index].sousId]: {
        required: hasProfileRequired,
        thresholdPoints: profileThresholdPoints.toJSON(),
      },
    }
  }, {})
}
