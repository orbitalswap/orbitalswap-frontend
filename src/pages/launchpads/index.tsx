import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getLaunchpads } from 'state/launchpads/helpers'
import { SWRConfig } from 'swr'
import { launchpadsById } from 'utils/launchpadsById'
import Launchpads from 'views/Launchpads/Launchpads'
import { LaunchpadPageLayout } from '../../views/Launchpads'
import Launchpad from '../../views/Launchpads/Launchpad'

const LaunchpadsPage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <Launchpads />
    </SWRConfig> 
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchedLaunchpads = await getLaunchpads()
  if (!fetchedLaunchpads) {
    return {
      props: {
        fallback: {
          launchpads: launchpadsById,
        },
      },
      revalidate: 1,
    }
  }

  return {
    props: {
      fallback: {
        launchpads: fetchedLaunchpads,
      },
    },
    revalidate: 60 * 60 * 12, // 12 hours
  }
}

export default LaunchpadsPage
