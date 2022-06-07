import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import { NetworkOptions } from 'config/constants'
import SelectChain from './SelectChain'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex mr={1}>
      {/* <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr={mr} id="open-settings-dialog-button">
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton> */}
      <SelectChain />
    </Flex>
  )
}

export default GlobalSettings
