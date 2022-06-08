import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from 'utils/providers'
import poolsConfig from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeBunniesAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getMasterChefV1Address,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressV2,
  getTradingCompetitionAddressMobox,
  getBunnySpecialXmasAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeBunniesAbi from 'config/abi/pancakeBunnies.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import launchpadAbi from 'config/abi/launchpad.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import masterChefV1 from 'config/abi/masterchefV1.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import tradingCompetitionV2Abi from 'config/abi/tradingCompetitionV2.json'
import tradingCompetitionMoboxAbi from 'config/abi/tradingCompetitionMobox.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  IfoV1,
  IfoV2,
  Erc20,
  Erc721,
  Cake,
  BunnyFactory,
  PancakeBunnies,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  MasterchefV1,
  SousChef,
  SousChefV2,
  BunnySpecial,
  LpToken,
  ClaimRefund,
  TradingCompetition,
  TradingCompetitionV2,
  EasterNft,
  Multicall,
  BunnySpecialCakeVault,
  BunnySpecialPrediction,
  BunnySpecialLottery,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
  CakeVaultV2,
  TradingCompetitionMobox,
} from 'config/abi/types'
import { ChainId } from '@orbitalswap/sdk'

export const getContract = (abi: any, address: string, chainId: ChainId, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider(chainId)
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, chainId, signer) as Erc20
}
export const getErc721Contract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(erc721Abi, address, chainId, signer) as Erc721
}
export const getLpContract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(lpTokenAbi, address, chainId, signer) as LpToken
}
export const getIfoV1Contract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(ifoV1Abi, address, chainId, signer) as IfoV1
}
export const getIfoV2Contract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(ifoV2Abi, address, chainId, signer) as IfoV2
}
export const getLaunchpadContract = (address: string, chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(launchpadAbi, address, chainId, signer) as IfoV2
}
export const getSouschefContract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress, config.chainId), config.chainId, signer) as SousChef
}
export const getSouschefV2Contract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress, config.chainId), config.chainId, signer) as SousChefV2
}

export const getPointCenterIfoContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(chainId), chainId, signer) as PointCenterIfo
}
export const getCakeContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(cakeAbi, tokens.cake.address, chainId, signer) as Cake
}
export const getProfileContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(chainId), chainId, signer) as PancakeProfile
}
export const getPancakeBunniesContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(pancakeBunniesAbi, getPancakeBunniesAddress(chainId), chainId, signer) as PancakeBunnies
}
export const getBunnyFactoryContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(chainId), chainId, signer) as BunnyFactory
}
export const getBunnySpecialContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(chainId), chainId, signer) as BunnySpecial
}
export const getLotteryV2Contract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(chainId), chainId, signer) as LotteryV2
}
export const getMasterchefContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(masterChef, getMasterChefAddress(chainId), chainId, signer) as Masterchef
}
export const getMasterchefV1Contract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(masterChefV1, getMasterChefV1Address(chainId), chainId, signer) as MasterchefV1
}
export const getClaimRefundContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(chainId), chainId, signer) as ClaimRefund
}
export const getTradingCompetitionContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(chainId), chainId, signer) as TradingCompetition
}

export const getTradingCompetitionContractV2 = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(tradingCompetitionV2Abi, getTradingCompetitionAddressV2(chainId), chainId, signer) as TradingCompetitionV2
}
export const getTradingCompetitionContractMobox = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(tradingCompetitionMoboxAbi, getTradingCompetitionAddressMobox(chainId), chainId, signer) as TradingCompetitionMobox
}

export const getEasterNftContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(chainId), chainId, signer) as EasterNft
}
export const getCakeVaultV2Contract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(cakeVaultV2Abi, getCakeVaultAddress(chainId), chainId, signer) as CakeVaultV2
}

export const getPredictionsContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(chainId), chainId, signer) as unknown as Predictions
}

export const getChainlinkOracleContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(chainId), chainId, signer) as ChainlinkOracle
}
export const getMulticallContract = (chainId: ChainId) => {
  return getContract(MultiCallAbi, getMulticallAddress(chainId), chainId) as Multicall
}
export const getBunnySpecialCakeVaultContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(chainId), chainId, signer) as BunnySpecialCakeVault
}
export const getBunnySpecialPredictionContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(chainId), chainId, signer) as BunnySpecialPrediction
}
export const getBunnySpecialLotteryContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(chainId), chainId, signer) as BunnySpecialLottery
}
export const getBunnySpecialXmasContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(bunnySpecialXmasAbi, getBunnySpecialXmasAddress(chainId), chainId, signer)
}
export const getFarmAuctionContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(chainId), chainId, signer) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(chainId), chainId, signer) as AnniversaryAchievement
}
export const getNftMarketContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(chainId), chainId, signer) as NftMarket
}
export const getNftSaleContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(chainId), chainId, signer) as NftSale
}
export const getPancakeSquadContract = (chainId: ChainId, signer?: Signer | Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(chainId), chainId, signer) as PancakeSquad
}
export const getErc721CollectionContract = (chainId: ChainId, signer?: Signer | Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address, chainId, signer) as Erc721collection
}
