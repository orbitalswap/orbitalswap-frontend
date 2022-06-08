import { ChainId } from '@orbitalswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { VaultKey } from 'state/types'

export const getAddress = (address: Address, chainId: ChainId): string => {
  return address[chainId] ? address[chainId] : address[ChainId.BSC_MAINNET]
}

export const getMasterChefAddress = (chainId: ChainId) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMasterChefV1Address = (chainId: ChainId) => {
  return getAddress(addresses.masterChefV1, chainId)
}
export const getMulticallAddress = (chainId: ChainId) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getLotteryV2Address = (chainId: ChainId) => {
  return getAddress(addresses.lotteryV2, chainId)
}
export const getPancakeProfileAddress = (chainId: ChainId) => {
  return getAddress(addresses.pancakeProfile, chainId)
}
export const getPancakeBunniesAddress = (chainId: ChainId) => {
  return getAddress(addresses.pancakeBunnies, chainId)
}
export const getBunnyFactoryAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnyFactory, chainId)
}
export const getClaimRefundAddress = (chainId: ChainId) => {
  return getAddress(addresses.claimRefund, chainId)
}
export const getPointCenterIfoAddress = (chainId: ChainId) => {
  return getAddress(addresses.pointCenterIfo, chainId)
}
export const getBunnySpecialAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnySpecial, chainId)
}
export const getTradingCompetitionAddress = (chainId: ChainId) => {
  return getAddress(addresses.tradingCompetition, chainId)
}
export const getTradingCompetitionAddressV2 = (chainId: ChainId) => {
  return getAddress(addresses.tradingCompetitionV2, chainId)
}

export const getTradingCompetitionAddressMobox = (chainId: ChainId) => {
  return getAddress(addresses.tradingCompetitionMobox, chainId)
}

export const getEasterNftAddress = (chainId: ChainId) => {
  return getAddress(addresses.easterNft, chainId)
}

export const getVaultPoolAddress = (vaultKey: VaultKey, chainId: ChainId) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey], chainId)
}

export const getCakeVaultAddress = (chainId: ChainId) => {
  return getAddress(addresses.cakeVault, chainId)
}
export const getPredictionsAddress = (chainId: ChainId) => {
  return getAddress(addresses.predictions, chainId)
}
export const getChainlinkOracleAddress = (chainId: ChainId) => {
  return getAddress(addresses.chainlinkOracle, chainId)
}
export const getBunnySpecialCakeVaultAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnySpecialCakeVault, chainId)
}
export const getBunnySpecialPredictionAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnySpecialPrediction, chainId)
}
export const getBunnySpecialLotteryAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnySpecialLottery, chainId)
}
export const getBunnySpecialXmasAddress = (chainId: ChainId) => {
  return getAddress(addresses.bunnySpecialXmas, chainId)
}
export const getFarmAuctionAddress = (chainId: ChainId) => {
  return getAddress(addresses.farmAuction, chainId)
}
export const getAnniversaryAchievement = (chainId: ChainId) => {
  return getAddress(addresses.AnniversaryAchievement, chainId)
}
export const getNftMarketAddress = (chainId: ChainId) => {
  return getAddress(addresses.nftMarket, chainId)
}
export const getNftSaleAddress = (chainId: ChainId) => {
  return getAddress(addresses.nftSale, chainId)
}
export const getPancakeSquadAddress = (chainId: ChainId) => {
  return getAddress(addresses.pancakeSquad, chainId)
}
