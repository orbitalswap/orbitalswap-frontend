import { Token, ChainId } from '@orbitalswap/sdk'
import tokens from './tokens'
import farms from './farms'
import { Ifo } from './types'
import { DEFAULT_CHAIN_ID } from './networks'

export const cakeBnbLpToken =
  DEFAULT_CHAIN_ID === ChainId.BSC_MAINNET
    ? new Token(ChainId.BSC_MAINNET, farms[1].lpAddresses[ChainId.BSC_MAINNET], 18, farms[1].lpSymbol)
    : new Token(ChainId.BSC_MAINNET, farms[0].lpAddresses[ChainId.BSC_MAINNET], 18, farms[0].lpSymbol)

const ifos: Ifo[] = [
  {
    id: 'duet',
    chainId: ChainId.BSC_MAINNET,
    address: '0xDF24BE326af4c1fb888f567f41D9a981A4752cf1',
    isActive: false,
    name: 'DUET',
    poolBasic: {
      saleAmount: '1,200,000 DUET',
      raiseAmount: '$360,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '4,800,000 DUET',
      raiseAmount: '$1,440,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: tokens.cake,
    token: tokens.duet,
    releaseBlockNumber: null,
    campaignId: '511190000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmXwoYYd8rkahVbxiGKsTa4rYRRFWPxhRGAHy3hVwK3Q2z',
    tokenOfferingPrice: 0.3,
    version: 3.1,
    telegramUrl: 'https://t.me/duetprotocol',
    twitterUrl: 'https://twitter.com/duetprotocol',
    description:
      'DUET Protocol is a multi-chain synthetic assets ecosystem, enabling pegged assets from various markets – from individual stocks, to indexes, ETFs, and commodities.',
  },
  {
    id: 'era',
    chainId: ChainId.BSC_MAINNET,
    address: '0x527201a43f8da24ce9b7c21744a0706942f41fa3',
    isActive: false,
    name: 'ERA (Game of Truth)',
    poolBasic: {
      saleAmount: '4,000,000 ERA',
      raiseAmount: '$360,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '16,000,000 ERA',
      raiseAmount: '$1,440,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: tokens.cake,
    token: tokens.era,
    releaseBlockNumber: 15156634,
    campaignId: '511180000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmTfN1SKnFidF6XCDcpga7zAf69mFfhb26Zy9b85dYskxW',
    tokenOfferingPrice: 0.09,
    version: 3.1,
    telegramUrl: 'https://t.me/Era7_Official',
    twitterUrl: 'https://twitter.com/Era7_official',
    description:
      'Drawing from their experience in traditional games such as Awakening of Dragon, Era7: Game of Truth combines elements of DeFi, NFTs, and Trading Cards into a play-to-earn game steeped in mythology and magic.',
  },
]

export default ifos
