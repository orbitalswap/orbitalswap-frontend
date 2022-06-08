import { useCallback } from 'react'
import { useModal } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { fetchAddressResult, setSelectedAddress } from 'state/predictions'
import AddressInputSelect from 'components/AddressInputSelect'
import WalletStatsModal from './WalletStatsModal'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const AddressSearch = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()

  const handleBeforeDismiss = () => {
    dispatch(setSelectedAddress(null))
  }

  const [onPresentWalletStatsModal] = useModal(<WalletStatsModal onBeforeDismiss={handleBeforeDismiss} />)
  const handleValidAddress = useCallback(
    async (value: string) => {
      const response: any = await dispatch(fetchAddressResult({account: value, chainId}))
      return response.payload?.data !== undefined
    },
    [dispatch],
  )

  const handleAddressClick = async (value: string) => {
    await dispatch(setSelectedAddress(value))
    onPresentWalletStatsModal()
  }

  return <AddressInputSelect onAddressClick={handleAddressClick} onValidAddress={handleValidAddress} />
}

export default AddressSearch
