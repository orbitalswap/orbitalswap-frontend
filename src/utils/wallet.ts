// Set of helper functions to facilitate wallet setup

import { ExternalProvider } from '@ethersproject/providers'
import { ChainId } from '@orbitalswap/sdk'
import { BAD_SRCS } from 'components/Logo/Logo'
import { DEFAULT_CHAIN_ID, NETWORKS, SUPPORTED_CHAINS } from 'config/constants'
import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider, chainId?: ChainId) => {
  const provider = externalProvider || window.ethereum
  if (!SUPPORTED_CHAINS.includes(chainId)) {
    console.error('Invalid chain id')
    return false
  }
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return true
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              NETWORKS[chainId ?? DEFAULT_CHAIN_ID],
            ],
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}


export const switchChain = async (chainId: ChainId) => {
  const provider = window.ethereum
  if (provider) {
    try { 
      await provider.request({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            chainId: `0x${chainId.toString(16)}`,
          }
        ]
      })
      return undefined
    } catch (error: any) {
      if(error.code === 4902) {
        const result = await setupNetwork(provider, chainId)
        return result
      }
      
      console.error('Failed to switch the network in Metamask:', error)
      if(error?.message?.indexOf('wallet_switchEthereumChain') > 0) {
        return `Failed to switch networks from the Brewlabs Platform. In order to use ${NETWORKS[chainId ?? DEFAULT_CHAIN_ID].chainName}, you must change the blockchain of your wallet directly.`
      }
      return error?.message
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return `In order to use ${NETWORKS[chainId ?? DEFAULT_CHAIN_ID].chainName}, Please try again after disconnect wallet and switch the blockchain on your connected wallet directly.`;
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenLogo?: string,
) => {
  // better leave this undefined for default image instead of broken image url
  const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined

  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image,
      },
    },
  })

  return tokenAdded
}
