import { useRouter } from 'next/router'
import PageLoader from 'components/Loader/PageLoader'
import IndividualPancakeBunnyPage from './PancakeBunnyPage'
import IndividualNFTPage from './OneOfAKindNftPage'
import { getPancakeBunniesAddress } from 'utils/addressHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const IndividualNFTPageRouter = () => {
  const router = useRouter()
  const { chainId } = useActiveWeb3React()
  // For PancakeBunnies tokenId in url is really bunnyId
  const { collectionAddress, tokenId } = router.query

  if (router.isFallback) {
    return <PageLoader />
  }

  const isPBCollection = String(collectionAddress).toLowerCase() === getPancakeBunniesAddress(chainId).toLowerCase()
  if (isPBCollection) {
    return <IndividualPancakeBunnyPage bunnyId={String(tokenId)} />
  }

  return <IndividualNFTPage collectionAddress={String(collectionAddress)} tokenId={String(tokenId)} />
}

export default IndividualNFTPageRouter
