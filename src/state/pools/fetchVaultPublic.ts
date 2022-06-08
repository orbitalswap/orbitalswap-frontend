import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVaultV2.json'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getCakeContract } from 'utils/contractHelpers'

export const fetchPublicVaultData = async (chainId, cakeVaultAddress = undefined) => {
  const cakeVaultV2 = getCakeVaultAddress(chainId)
  if (!cakeVaultAddress) {
    cakeVaultAddress = cakeVaultV2
  }

  const cakeContract = getCakeContract(chainId)
  try {
    const calls = ['getPricePerFullShare', 'totalShares', 'totalLockedAmount'].map((method) => ({
      address: cakeVaultAddress,
      name: method,
    }))

    const [[sharePrice], [shares], totalLockedAmount] = await multicallv2(cakeVaultAbi, chainId, calls, {
      requireSuccess: false,
    })

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const totalLockedAmountAsBigNumber = totalLockedAmount ? new BigNumber(totalLockedAmount[0].toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalCakeInVault = await cakeContract.balanceOf(cakeVaultV2)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: new BigNumber(totalCakeInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalCakeInVault: null,
    }
  }
}

export const fetchVaultFees = async (chainId, cakeVaultAddress = undefined) => {
  if (!cakeVaultAddress) {
    cakeVaultAddress = getCakeVaultAddress(chainId)
  }

  try {
    const calls = ['performanceFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: cakeVaultAddress,
      name: method,
    }))

    const [[performanceFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(cakeVaultAbi, chainId, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
