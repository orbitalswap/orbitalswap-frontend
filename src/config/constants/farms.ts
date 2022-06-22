import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'MMF',
    lpAddresses: {
      338: '',
      25: '0xbA452A1c0875D33a440259B1ea4DcA8f5d86D9Ae',
    },
    token: serializedTokens.mmf,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 1,
    lpSymbol: 'MMF-CRO LP',
    lpAddresses: {
      338: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xbA452A1c0875D33a440259B1ea4DcA8f5d86D9Ae',
    },
    token: serializedTokens.mmf,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 4,
    lpSymbol: 'USDC-CRO LP',
    lpAddresses: {
      338: '',
      25: '0xa68466208F1A3Eb21650320D2520ee8eBA5ba623',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wcro,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
