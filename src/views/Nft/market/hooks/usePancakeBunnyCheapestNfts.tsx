import { useWeb3React } from '@web3-react/core'
import { ChainId } from '@orbitalswap/sdk'
import { NftToken, ApiResponseCollectionTokens } from 'state/nftMarket/types'
import useSWR from 'swr'
import {
  getNftsMarketData,
  getMetadataWithFallback,
  getPancakeBunniesAttributesField,
  combineApiAndSgResponseToNftToken,
} from 'state/nftMarket/helpers'
import { FAST_INTERVAL } from 'config/constants'
import { FetchStatus } from 'config/constants/types'
import { formatBigNumber } from 'utils/formatBalance'
import { getLowestUpdatedToken } from './useGetLowestPrice'
import { getPancakeBunniesAddress } from 'utils/addressHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

type WhereClause = Record<string, string | number | boolean | string[]>

const fetchCheapestBunny = async (
  chainId: ChainId,
  whereClause: WhereClause = {},
  nftMetadata: ApiResponseCollectionTokens,
): Promise<NftToken> => {
  const nftsMarket = await getNftsMarketData(chainId, whereClause, 100, 'currentAskPrice', 'asc')

  if (!nftsMarket.length) return null

  const nftsMarketTokenIds = nftsMarket.map((marketData) => marketData.tokenId)
  const lowestPriceUpdatedBunny = await getLowestUpdatedToken(getPancakeBunniesAddress(chainId).toLowerCase(), chainId, nftsMarketTokenIds)

  const cheapestBunnyOfAccount = nftsMarket
    .filter((marketData) => marketData.tokenId === lowestPriceUpdatedBunny?.tokenId)
    .map((marketData) => {
      const apiMetadata = getMetadataWithFallback(nftMetadata.data, marketData.otherId)
      const attributes = getPancakeBunniesAttributesField(marketData.otherId)
      const bunnyToken = combineApiAndSgResponseToNftToken(apiMetadata, marketData, attributes)
      const updatedPrice = formatBigNumber(lowestPriceUpdatedBunny.currentAskPrice)
      return {
        ...bunnyToken,
        marketData: { ...bunnyToken.marketData, ...lowestPriceUpdatedBunny, currentAskPrice: updatedPrice },
      }
    })
  return cheapestBunnyOfAccount.length > 0 ? cheapestBunnyOfAccount[0] : null
}

export const usePancakeBunnyCheapestNft = (bunnyId: string, nftMetadata: ApiResponseCollectionTokens) => {
  const { chainId } = useActiveWeb3React()
  const { data, status, mutate } = useSWR(
    nftMetadata && bunnyId ? ['cheapestBunny', bunnyId] : null,
    async () => {
      const whereClause = { collection: getPancakeBunniesAddress(chainId).toLowerCase(), otherId: bunnyId, isTradable: true }

      return fetchCheapestBunny(chainId, whereClause, nftMetadata)
    },
    { refreshInterval: FAST_INTERVAL },
  )

  return {
    data,
    isFetched: [FetchStatus.Failed, FetchStatus.Fetched].includes(status),
    refresh: mutate,
  }
}

export const usePBCheapestOtherSellersNft = (bunnyId: string, nftMetadata: ApiResponseCollectionTokens) => {
  const { account, chainId } = useWeb3React()
  const { data, status, mutate } = useSWR(
    account && nftMetadata && bunnyId ? ['cheapestOtherSellersBunny', bunnyId, account] : null,
    async () => {
      const whereClause = {
        collection: getPancakeBunniesAddress(chainId).toLowerCase(),
        currentSeller_not: account.toLowerCase(),
        otherId: bunnyId,
        isTradable: true,
      }

      return fetchCheapestBunny(chainId, whereClause, nftMetadata)
    },
    { refreshInterval: FAST_INTERVAL },
  )

  return {
    data,
    isFetched: [FetchStatus.Failed, FetchStatus.Fetched].includes(status),
    refresh: mutate,
  }
}
