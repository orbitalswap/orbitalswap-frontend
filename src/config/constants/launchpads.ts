import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  // {
  //   id: 1,
  //   address: {
  //     97: '0x3e70a810a40119abeF47F885CD6739f9C0eF4D3D',
  //     56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
  //   },
  //   isActive: true,
  //   name: 'Tytan',
  //   subTitle: 'Auto-Staking & Compounding From the Future',
  //   description:
  //     "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
  //   projectSiteUrl: 'https://tytan.finance/',
  //   releaseAt: 1652986800,
  //   token: serializedTokens.tytan,
  // },
  // {
  //   id: 2,
  //   address: {
  //     97: '0x6B2233381D667F781bc39d95600BCC440816209a',
  //     56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
  //   },
  //   isActive: true,
  //   isTomFork: true,
  //   name: 'USdibs',
  //   subTitle: 'Auto-Staking & Compounding From the Future',
  //   description: 'USDibs is an algorithmic stablecoin pegged to the price of BUSD',
  //   projectSiteUrl: 'https://dibs.money/',
  //   releaseAt: 1652986800,
  //   currency: serializedTokens.busd,
  //   token: serializedTokens.usdibs,
  // },
  {
    id: 1,
    address: {
      97: '0x573d502E39f5C09012FCB3E65cBDCF1E191C6ab1',
      56: '0xBa809c35E9314E89a82de6d7Ccf9DC3f4C0CA28E',
    },
    isActive: true,
    name: 'Test',
    subTitle: 'Test Presale',
    description:
      "We've travelled the wormholes of the rebase galaxy far & wide. Only to find the future is TYTAN. With immediate utility on launch. Strap in and feel the G-force of rebase at its finest.",
    projectSiteUrl: 'https://github.com/letteldream',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.presaleTemp,
  },
]

export default launchpads
