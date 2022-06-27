import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 1,
    address: {
      338: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
      25: '0x3C60F4D9A1FA6E31ECD655d2e5198229335F9601',
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
    token: serializedTokens.smg,
  },
  {
    id: 2,
    address: {
      338: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
      25: '0x3e4BdABF4a9dAbB4438C00A61558D9AC8a965FbB',
    },
    isActive: true,
    isTomFork: true,
    isPrivatesale: false,
    name: 'Smoking Gorilla',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "Smoking Gorilla Token is an Auto Rebasing Token with a Auto Decaying APY model which reduces the APY automatically within 6 months and then slowly keeps decaying to find a realistic high APY that is sustainable.",
    projectSiteUrl: 'https://smokingorilla.finance/',
    releaseAt: 1652986800,
    currency: serializedTokens.usdc,
    token: serializedTokens.smg,
  },
  {
    id: 3,
    address: {
      338: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
      25: '0xE4C7Ef82824Dc78c3f1Fe542E2eC171C6cf9bC2f',
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
    token: serializedTokens.smg,
  },
]

export default launchpads
