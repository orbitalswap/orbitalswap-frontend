import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 5,
    address: {
      97: '',
      56: '0x1034ae93d9F3f3dC44A243068e43d86da408597b',
    },
    isActive: false,
    name: 'DualMiner',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      " $DualMiner is a new Multi-Chain token created to general Dual Passive Income for High 12% APR Daily Rewards, 4380% APR – All done for you Automatically by contract ! Simply Buy $DUALMINER tokens in your wallet and earn passive income in $DUALMINER.",
    projectSiteUrl: 'https://dualminer.money/',
    releaseAt: 1652986800,
    // currency: serializedTokens.busd,
    token: serializedTokens.dual,
  },
  {
    id: 4,
    address: {
      97: '',
      56: '0x7d386A0786fC0300d6A5B2F5aB9081AA3CA1f97E',
    },
    isActive: false,
    name: 'AVION FINANCE',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "Avion Finance is the next logical step for the rebase token. With multiple revenue streams, deflationary mechanisms, an improved anti-dump lock and a stable trading range right from launch, your investment will soar the skies with us.",
    projectSiteUrl: 'https://avion.finance/',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.avion,
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
    id: 3,
    address: {
      97: '',
      56: '0x76445a732b0ae2D27DA2D9416138c84C6c54a22D',
    },
    isActive: false,
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
    id: 6,
    address: {
      97: '0x7529957889C4628E4A582Bf0c4219D35350E618E',
      56: '',
    },
    isActive: false,
    name: 'DFC',
    subTitle: 'Auto-Staking & Compounding From the Future',
    description:
      "An innovative DeFi Protocol on Binance Smart Chain",
    projectSiteUrl: 'https://www.riptidefi.com/',
    releaseAt: 1652986800,
    currency: serializedTokens.busd,
    token: serializedTokens.surf,
  },
]

export default launchpads
