import { Children, useEffect, useState } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  Flex,
  LogoutIcon,
  RefreshIcon,
  useModal,
  ChainMenu as UIKitChainMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
  Box,
} from '@pancakeswap/uikit'
import Trans from 'components/Trans'
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router'
import { usePendingTransactions } from 'state/transactions/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus } from 'config/constants/types'
import { NETWORK_LABLES } from 'config/constants/networks'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'


const ChainMenu = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { account, error, chainId } = useWeb3React()

  console.log(error, chainId, '56456546546464564645645')
  const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const { balance, fetchStatus } = useGetBnbBalance()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const avatarSrc = ''
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const isWrongNetwork: boolean = error && error instanceof UnsupportedChainIdError

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  const UserMenuItems = () => {
    return (
      <>
        <UserMenuItem as="a" disabled={isWrongNetwork} href="https://orbitalswap.com">
          {t('Binance Smart Chain')}
        </UserMenuItem>
      </>
    )
  }

  if (account) {
    return (
      <UIKitChainMenu account={NETWORK_LABLES[chainId]} avatarSrc={avatarSrc} text={userMenuText} variant={userMenuVariable}>
        <UserMenuItems />
      </UIKitChainMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      // <UIKitChainMenu text={t('Network')} variant="danger">
      //   <UserMenuItems />
      // </UIKitChainMenu>
      <></>
    )
  }
  if (account) {
    return (
      <ConnectWalletButton scale="sm">
        <Box display={['none', , , 'block']}>
          <Trans>Connect Wallet</Trans>
        </Box>
        <Box display={['block', , , 'none']}>
          <Trans>Connect</Trans>
        </Box>
      </ConnectWalletButton>
    )
  }

  return (
    <></>
  )
}

export default ChainMenu
