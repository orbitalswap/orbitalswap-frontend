import { ChainId, Token } from '@orbitalswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  wbnb: new Token(
    MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cro: new Token(MAINNET, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'CRO', 'CRO', 'https://crypto.org/'),
  wcro: new Token(
    MAINNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://crypto.org/',
  ),
  cake: new Token(
    MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  mmf: new Token(
    MAINNET,
    '0x97749c9B61F878a880DfE312d2594AE07AEd7656',
    18,
    'MMF',
    'Mad Meerkat Finance Token',
    'https://mm.finance/',
  ),
  orb: new Token(
    MAINNET,
    '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
    18,
    'ORB',
    'OrbitalSwap Token',
    'https://orbitalswap.com/',
  ),
  usdt: new Token(
    MAINNET,
    '0x66e428c3f67a68878562e79A0234c1F83c208770',
    6,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  vvs: new Token(MAINNET, '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03', 18, 'VVS', 'VVS', 'https://vvs.finance/'),
  wbtc: new Token(
    MAINNET,
    '0x062E66477Faf219F25D27dCED647BF57C3107d52',
    8,
    'WBTC',
    'Wrapped BTC',
    'https://bitcoin.org/en/',
  ),
  eth: new Token(
    MAINNET,
    '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
    18,
    'ETH',
    'Wrapped Ether',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  mbox: new Token(
    MAINNET,
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  dai: new Token(
    MAINNET,
    '0xF2001B145b43032AAF5Ee2884e456CCd805F677D',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://makerdao.com/',
  ),
  bondly: new Token(
    MAINNET,
    '0x96058f8C3e16576D9BD68766f3836d9A33158f89',
    18,
    'BONDLY',
    'Bondly Token',
    'https://www.bondly.finance/',
  ),
} as const)

export const testnetTokens = defineTokens({
  wbnb: new Token(
    TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  wcro: new Token(
    TESTNET,
    '0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://crypto.org/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  busd: new Token(
    TESTNET,
    '0x8a6d97947BD45F72EE234aab1c95FC9D41744d38',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  usdibs: new Token(
    TESTNET,
    '0xaA98aeD6474621f0302010241a451fA3Df0BdF3e',
    18,
    'USDibs',
    'Dibs USD',
    'https://dibs.money/',
  ),
  syrup: new Token(
    TESTNET,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
} as const)

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
