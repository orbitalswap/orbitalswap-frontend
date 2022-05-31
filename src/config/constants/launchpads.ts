import tokens from './tokens'
import { Launchpad } from './types'


const launchpads: Launchpad[] = [
  {
    id: 'tytan-public-sale',
    address: {
      97: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
      56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E'
    },
    isActive: true,
    name: 'Tytan',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://tytan.finance/',
    releaseAt: 1652986800,
    idoToken: 'TYTAN',
  },
]

export default launchpads
