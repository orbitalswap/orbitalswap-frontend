
import React from 'react'
import { launchpadsConfig } from 'config/constants'
import { Launchpad } from 'config/constants/types'
import LaunchpadCard from './components/LaunchpadCard'
import LaunchpadCards from './components/LaunchpadCards'


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const inactiveLaunchpad: Launchpad[] = launchpadsConfig.filter((launchpad) => !launchpad.isActive)

const PastLaunchpad = () => {
  return (
    <LaunchpadCards>
      {inactiveLaunchpad.map((launchpad) => (
        <LaunchpadCard ifo={launchpad} />
      ))}
    </LaunchpadCards>
  )  
}
export default PastLaunchpad
