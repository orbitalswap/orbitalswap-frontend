import React from 'react'
import { useLaunchpads } from 'state/launchpads/hooks'

import LaunchpadCard from './components/LaunchpadCard'
import LaunchpadCards from './components/LaunchpadCards'

/**
 * Note: currently there should be only 1 active IFO at a time
 */

const PastLaunchpad = () => {
  const {launchpads} = useLaunchpads()

  return (
    <LaunchpadCards>
      {launchpads?.filter((launchpad) => !launchpad.isActive).map((launchpad) => (
        <LaunchpadCard launchpad={launchpad} />
      ))}
    </LaunchpadCards>
  )
}
export default PastLaunchpad
