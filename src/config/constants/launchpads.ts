import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 1,
    address: {
      97: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
      56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
    },
    isActive: true,
    name: 'Tytan',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://tytan.finance/',
    releaseAt: 1652986800,
    token: serializedTokens.tytan,
  },
  {
    id: 2,
    address: {
      97: '0x6B45064F128cA5ADdbf79825186F4e3e3c9E7EB5',
      56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
    },
    isActive: true,
    name: 'USdibs',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://tytan.finance/',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.usdibs,
  },
]

export default launchpads
