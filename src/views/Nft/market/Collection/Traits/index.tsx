import { useRouter } from 'next/router'
import Container from 'components/Layout/Container'
import PancakeBunniesTraits from './PancakeBunniesTraits'
import CollectionTraits from './CollectionTraits'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getPancakeBunniesAddress } from 'utils/addressHelpers'

const Traits = () => {
  const collectionAddress = useRouter().query.collectionAddress as string
  const { chainId } = useActiveWeb3React()

  return (
    <>
      <Container py="40px">
        {collectionAddress === getPancakeBunniesAddress(chainId) ? (
          <PancakeBunniesTraits collectionAddress={collectionAddress} />
        ) : (
          <CollectionTraits collectionAddress={collectionAddress} />
        )}
      </Container>
    </>
  )
}

export default Traits
