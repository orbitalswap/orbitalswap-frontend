import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '@orbitalswap/sdk'
import getRpcUrl from 'utils/getRpcUrl'

export const simpleRpcProvider = (chainId) => new StaticJsonRpcProvider(getRpcUrl(chainId))

export default null
