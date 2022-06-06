import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { simpleRpcProvider } from 'utils/providers'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { DEFAULT_CHAIN_ID, SUPPORTED_CHAINS } from 'config/constants/networks'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId: connectedChainId, ...web3React } = useWeb3React()
  const refEth = useRef(library)

  const [provider, setProvider] = useState(library || simpleRpcProvider())
  const [chainId, setChainId] = useState(DEFAULT_CHAIN_ID)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider())
      refEth.current = library
    }

    const metamaskChainId = window.ethereum?.chainId
    if (connectedChainId && SUPPORTED_CHAINS.includes(connectedChainId)) {
      setChainId(connectedChainId)
      localStorage.setItem('chainId', connectedChainId.toString())
    }

    if (!connectedChainId && chainId !== +metamaskChainId && SUPPORTED_CHAINS.includes(+metamaskChainId)) {
      localStorage.setItem('chainId', metamaskChainId.toString())
      setChainId(+metamaskChainId)
      setProvider(simpleRpcProvider(+metamaskChainId))
    }
  }, [library])

  return { library: provider, chainId: chainId ?? DEFAULT_CHAIN_ID, ...web3React }
}

export default useActiveWeb3React
