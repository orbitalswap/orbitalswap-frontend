import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getCakeContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPancakeBunniesContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getMasterchefContract,
  getMasterchefV1Contract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getTradingCompetitionContractV2,
  getTradingCompetitionContractMobox,
  getEasterNftContract,
  getErc721Contract,
  getCakeVaultV2Contract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getLaunchpadContract,
  getLotteryV2Contract,
  getBunnySpecialCakeVaultContract,
  getBunnySpecialPredictionContract,
  getFarmAuctionContract,
  getBunnySpecialLotteryContract,
  getAnniversaryAchievementContract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeSquadContract,
  getErc721CollectionContract,
  getBunnySpecialXmasContract,
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'
import { Erc20, Erc20Bytes32, Multicall, Weth, Cake, Erc721collection, CakeVaultV2 } from 'config/abi/types'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WNATIVE } from '@orbitalswap/sdk'
import IPancakePairABI from '../config/abi/IPancakePair.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract, getProviderOrSigner } from '../utils'

import { IPancakePair } from '../config/abi/types/IPancakePair'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getIfoV1Contract(address, chainId, library.getSigner()), [address, library])
}

export const useIfoV2Contract = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getIfoV2Contract(address, chainId, library.getSigner()), [address, library])
}

export const useLaunchpadContract = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContract(address, chainId, library.getSigner()), [address, library])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getBep20Contract(address, chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [account, address, library, withSignerIfPossible],
  )
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, chainId, library.getSigner()), [address, chainId, library])
}

export const useCake = (): { reader: Cake; signer: Cake } => {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getCakeContract(null),
      signer: getCakeContract(chainId, getProviderOrSigner(library, account)),
    }),
    [account, chainId, library],
  )
}

export const useBunnyFactory = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnyFactoryContract(chainId, library.getSigner()), [chainId, library])
}

export const usePancakeBunnies = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPancakeBunniesContract(chainId, library.getSigner()), [chainId, library])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getProfileContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, account, chainId, library],
  )
}

export const useLotteryV2Contract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getLotteryV2Contract(chainId, library.getSigner()), [chainId, library])
}

export const useMasterchef = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getMasterchefContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [chainId, library, withSignerIfPossible, account],
  )
}

export const useMasterchefV1 = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getMasterchefV1Contract(chainId, library.getSigner()), [chainId, library])
}

export const useSousChef = (id) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSouschefContract(id, library.getSigner()), [id, library])
}

export const usePointCenterIfoContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPointCenterIfoContract(chainId, library.getSigner()), [chainId, library])
}

export const useBunnySpecialContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialContract(chainId, library.getSigner()), [chainId, library])
}

export const useClaimRefundContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getClaimRefundContract(chainId, library.getSigner()), [chainId, library])
}

export const useTradingCompetitionContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getTradingCompetitionContract(chainId, library.getSigner()), [chainId, library])
}

export const useTradingCompetitionContractV2 = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getTradingCompetitionContractV2(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [chainId, library, withSignerIfPossible, account],
  )
}

export const useTradingCompetitionContractMobox = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getTradingCompetitionContractMobox(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [chainId, library, withSignerIfPossible, account],
  )
}

export const useEasterNftContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getEasterNftContract(chainId, library.getSigner()), [chainId, library])
}

export const useVaultPoolContract = (): CakeVaultV2 => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getCakeVaultV2Contract(chainId, library.getSigner()), [chainId, library])
}

export const useCakeVaultContract = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getCakeVaultV2Contract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, chainId, library, account],
  )
}

export const usePredictionsContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPredictionsContract(chainId, library.getSigner()), [chainId, library])
}

export const useChainlinkOracleContract = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getChainlinkOracleContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [account, chainId, library, withSignerIfPossible],
  )
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialCakeVaultContract(chainId, library.getSigner()), [chainId, library])
}

export const useSpecialBunnyPredictionContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialPredictionContract(chainId, library.getSigner()), [chainId, library])
}

export const useBunnySpecialLotteryContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialLotteryContract(chainId, library.getSigner()), [chainId, library])
}

export const useBunnySpecialXmasContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialXmasContract(chainId, library.getSigner()), [chainId, library])
}

export const useAnniversaryAchievementContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getAnniversaryAchievementContract(chainId, library.getSigner()), [chainId, library])
}

export const useNftSaleContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getNftSaleContract(chainId, library.getSigner()), [chainId, library])
}

export const usePancakeSquadContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPancakeSquadContract(chainId, library.getSigner()), [chainId, library])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const { account, chainId, library } = useActiveWeb3React()
  return useMemo(
    () => getFarmAuctionContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [chainId, library, account, withSignerIfPossible],
  )
}

export const useNftMarketContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getNftMarketContract(chainId, library.getSigner()), [chainId, library])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const {chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(chainId, null, collectionAddress),
      signer: getErc721CollectionContract(chainId, getProviderOrSigner(library, account), collectionAddress),
    }),
    [account, chainId, library, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { chainId, library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, chainId, ABI, withSignerIfPossible ? getProviderOrSigner(library, account) : null)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, chainId, library, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWBNBContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WNATIVE[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React()
  return useContract<Multicall>(getMulticallAddress(chainId), multiCallAbi, false)
}
