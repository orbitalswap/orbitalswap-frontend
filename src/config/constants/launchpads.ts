import tokens from './tokens'
import { Launchpad } from './types'


const launchpads: Launchpad[] = [
  {
    id: 'tytan-public-sale',
    address: {
      97: '0xB0fc94dF758E87a36b04fE313ACf26E5BEAC5453',
      56: '0xB0fc94dF758E87a36b04fE313ACf26E5BEAC5453'
    },
    isActive: true,
    name: 'Tytan',
    subTitle: 'First Come First Served',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediately utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://tytan.finance/',
    releaseAt: 1652986800,
    idoToken: 'TYTAN',
  },
]

export default launchpads
