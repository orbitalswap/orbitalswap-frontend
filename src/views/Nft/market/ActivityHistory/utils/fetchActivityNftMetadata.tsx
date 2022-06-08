import { ChainId } from '@orbitalswap/sdk'
import { Activity, NftToken, TokenIdWithCollectionAddress } from 'state/nftMarket/types'
import { getNftsFromCollectionApi, getNftsFromDifferentCollectionsApi } from 'state/nftMarket/helpers'
import uniqBy from 'lodash/uniqBy'
import { getPancakeBunniesAddress } from 'utils/addressHelpers'

export const fetchActivityNftMetadata = async (chainId: ChainId, activities: Activity[]): Promise<NftToken[]> => {
  const pancakeBunniesAddress = getPancakeBunniesAddress(chainId)

  const hasPBCollections = activities.some(
    (activity) => activity.nft.collection.id.toLowerCase() === pancakeBunniesAddress.toLowerCase(),
  )
  let bunniesMetadata
  if (hasPBCollections) {
    bunniesMetadata = await getNftsFromCollectionApi(pancakeBunniesAddress, chainId)
  }

  const pbNfts = bunniesMetadata
    ? activities
        .filter((activity) => activity.nft.collection.id.toLowerCase() === pancakeBunniesAddress.toLowerCase())
        .map((activity) => {
          const { name: collectionName } = bunniesMetadata.data[activity.nft.otherId].collection
          return {
            ...bunniesMetadata.data[activity.nft.otherId],
            tokenId: activity.nft.tokenId,
            chainId: activity.nft.chainId,
            attributes: [{ traitType: 'bunnyId', value: activity.nft.otherId }],
            collectionAddress: activity.nft.collection.id,
            collectionName,
          }
        })
    : []

  const activityNftTokenIds = uniqBy(
    activities
      .filter((activity) => activity.nft.collection.id.toLowerCase() !== pancakeBunniesAddress.toLowerCase())
      .map((activity): TokenIdWithCollectionAddress => {
        return { tokenId: activity.nft.tokenId, collectionAddress: activity.nft.collection.id, chainId: activity.nft.chainId }
      }),
    'tokenId',
  )
  const nfts = await getNftsFromDifferentCollectionsApi(activityNftTokenIds)
  return nfts.concat(pbNfts)
}
