import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { getLaunchpad } from 'state/launchpads/helpers'
// eslint-disable-next-line camelcase
import { SWRConfig, unstable_serialize } from 'swr'
import LaunchpadPageRouter from 'views/Launchpads/LaunchpadPageRouter'

// import { getLaunchpad }

const LaunchpadPage = ({ fallback = {} }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <LaunchpadPageRouter />
    </SWRConfig>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { launchpadAddress, chainId } = params

  if (typeof launchpadAddress !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const launchpadData = await getLaunchpad(launchpadAddress, +chainId)
    if (launchpadData) {
      return {
        props: {
          fallback: {
            [unstable_serialize(['launchpads', launchpadAddress.toLocaleLowerCase()])]: { ...launchpadData },
          },
        },
        revalidate: 60 * 60 * 6, // 6 hours
      }
    }

    return {
      notFound: true,
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

}

export default LaunchpadPage

