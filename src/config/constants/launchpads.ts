import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 3,
    address: {
      97: '',
      56: '0xB1Da8B059e3e211AB7c1Cd4Cafe161C76bC4ceA1',
    },
    isActive: true,
    name: 'RIPTIDE FINANCE',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "An innovative DeFi Protocol on Binance Smart Chain",
    projectSiteUrl: 'https://www.riptidefi.com/',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.surf,
  },
  {
    id: 2,
    address: {
      97: '0x6B2233381D667F781bc39d95600BCC440816209a',
      56: '0x29877425071322aDD1320BcD72B9ae9EbaA0F918',
    },
    isActive: true,
    isTomFork: true,
    name: 'USdibs',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "USDibs is an algorithmic stablecoin pegged to the price of BUSD",
    projectSiteUrl: 'https://dibs.money/',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.usdibs,
  },
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
]

export default launchpads
