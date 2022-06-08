import { ChainId } from '@orbitalswap/sdk'

export const GRAPH_API_PROFILE = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_GRAPH_API_PROFILE,
}
export const GRAPH_API_PREDICTION = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_GRAPH_API_PREDICTION,
}
export const GRAPH_API_LOTTERY = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_GRAPH_API_LOTTERY,
}
export const SNAPSHOT_BASE_URL = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL,
}
export const API_PROFILE = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_API_PROFILE,
}
export const API_NFT = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_API_NFT,
}
export const SNAPSHOT_API = {
  [ChainId.BSC_MAINNET]: `${SNAPSHOT_BASE_URL[ChainId.BSC_MAINNET]}/graphql`,
}
export const SNAPSHOT_HUB_API = {
  [ChainId.BSC_MAINNET]: `${SNAPSHOT_BASE_URL[ChainId.BSC_MAINNET]}/api/message`,
}

/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = {
  [ChainId.BSC_MAINNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction',
}

export const INFO_CLIENT = {
  [ChainId.BSC_MAINNET]: 'https://api.thegraph.com/subgraphs/name/orbitalswap/exchange',
}
export const BLOCKS_CLIENT = {
  [ChainId.BSC_MAINNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks',
}
export const GRAPH_API_NFTMARKET = {
  [ChainId.BSC_MAINNET]: process.env.NEXT_PUBLIC_GRAPH_API_NFT_MARKET,
}
export const GRAPH_HEALTH = {
  [ChainId.BSC_MAINNET]: 'https://api.thegraph.com/index-node/graphql',
}

export const TC_MOBOX_SUBGRAPH = {
  [ChainId.BSC_MAINNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v3',
}

export const ASSET_PATH = 'https://raw.githubusercontent.com/orbitalswap/assets/master/blockchains'
