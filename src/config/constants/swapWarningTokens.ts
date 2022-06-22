import { Token } from '@orbitalswap/sdk'
import tokens from 'config/constants/tokens'

const { bondly} = tokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  bondly,
}

export default SwapWarningTokens
