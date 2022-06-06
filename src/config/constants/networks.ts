import { ChainId } from "@orbitalswap/sdk"


export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
export const SUPPORTED_CHAINS = [ChainId.BSC_MAINNET, ChainId.BSC_TESTNET]

export const NETWORKS = {
    [ChainId.BSC_MAINNET]: {
      chainId: `0x${Number(ChainId.BSC_MAINNET).toString(16)}`,
      chainName: 'BNB Smart Chain',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed.binance.org',
      ],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    [ChainId.BSC_TESTNET]: {
      chainId: `0x${Number(ChainId.BSC_MAINNET).toString(16)}`,
      chainName: 'BNB Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  }
  
  export const NETWORK_KEYS = {
    [ChainId.BSC_MAINNET]: 'smartchain',
    [ChainId.BSC_TESTNET]: 'smartchain',
  }
  
  export const EXPLORER_NAMES = {
    [ChainId.BSC_MAINNET]: 'BscScan',
    [ChainId.BSC_TESTNET]: 'BscScan',
  }
  
  const NETWORK_LABLES = {
    [ChainId.BSC_MAINNET]: 'BNB Chain',
    [ChainId.BSC_TESTNET]: 'BSC Testnet',
  }
  
  const NETWORK_ICONS = {
    [ChainId.BSC_MAINNET]: '/images/chains/bsc.png',
    [ChainId.BSC_TESTNET]: '/images/chains/bsc.png',
  }
  
  export const NetworkOptions = SUPPORTED_CHAINS.map((chainId) => ({
    label: NETWORK_LABLES[chainId],
    value: chainId,
    icon: NETWORK_ICONS[chainId],
  }))
  