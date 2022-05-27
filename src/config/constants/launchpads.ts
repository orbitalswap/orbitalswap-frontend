import tokens from './tokens'
import { Launchpad } from './types'


const launchpads: Launchpad[] = [
  {
    id: 'tytan-public-sale',
    address: {
      97: '0x6dC5C1b2Baf81f76E5BCb468E1496c6416841370',
      56: '0x6dC5C1b2Baf81f76E5BCb468E1496c6416841370'
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
