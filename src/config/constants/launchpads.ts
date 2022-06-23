import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 1,
    address: {
      338: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
      25: '0x672D3ECE20a7AFDe9BC1653141B4a30330028354',
    },
    isActive: true,
    isTomFork: true,
    isPrivatesale: true,
    name: 'Tytan',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://tytan.finance/',
    releaseAt: 1652986800,
    currency: serializedTokens.usdc,
    token: serializedTokens.vvs,
  },
]

export default launchpads
