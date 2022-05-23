import { launchpadsConfig } from 'config/constants'
import { useRouter } from 'next/router'
import LaunchpadPage from './components/LaunchpadPage'

// import Launchpad from './components/Launchpad'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeLaunchpad = launchpadsConfig.find((launchpad) => launchpad.isActive)

const Launchpad = () => {
  const router = useRouter()
  const launchpadAddress = router.query.launchpadAddress as string
  
  return (
  <LaunchpadPage ifo={activeLaunchpad} />
  )
}

export default Launchpad
