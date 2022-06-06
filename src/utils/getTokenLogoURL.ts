import { ChainId } from "@orbitalswap/sdk"
import { NETWORK_KEYS } from "config/constants"
import { ASSET_PATH } from "config/constants/endpoints"

const getTokenLogoURL = (address: string, chainId: ChainId) =>
  `${ASSET_PATH}/${NETWORK_KEYS[chainId]}/assets/${address}/logo.png`

export default getTokenLogoURL
