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
    name: 'Smoking Gorilla',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "Smoking Gorilla Token is an Auto Rebasing Token with a Auto Decaying APY model which reduces the APY automatically within 6 months and then slowly keeps decaying to find a realistic high APY that is sustainable.",
    projectSiteUrl: 'https://smokingorilla.finance/',
    releaseAt: 1652986800,
    currency: serializedTokens.usdc,
    token: serializedTokens.vvs,
  },
]

export default launchpads
