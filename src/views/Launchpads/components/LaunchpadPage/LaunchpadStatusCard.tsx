import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { PublicLaunchpadData, UserLaunchpadData } from 'views/Launchpads/types'
import { Item } from '../LaunchpadLayout'

export interface LaunchpadStatusProps {
  ifo: PublicLaunchpadData,
  ifoUserData: UserLaunchpadData
}

const StyledLaunchpadStatus = styled.div`
  margin-bottom: 24px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadStatusCard: React.FC<LaunchpadStatusProps> = ({ ifo, ifoUserData }) => {
  const { t } = useTranslation()
  const {
    startDateNum,
    projectSiteUrl,
    presalePrice,
    minPerTx,
    maxPerUser,
    liquidityPercent,
    hardcap,
    softcap,
    totalSold,
    fundersCounter,
    raised
  } = ifo

  const { contributedAmount } = ifoUserData
  const buyTokenSymbol = 'BNB'

  
  const purchaseTokenAmount = (presalePrice.toNumber())*(contributedAmount?.toNumber()) || 0
  return (
    <>
      <StyledLaunchpadStatus>
        <Item>
          <Display>{t('Status')}</Display>
          <Text>incoming</Text>
        </Item>
        <Item>
          <Display>{t('Sale type')}</Display>
          <Text>Public</Text>
        </Item>
        <Item>
          <Display>{t('Minimum Buy')}</Display>
          <Text>{minPerTx.toNumber()} BNB</Text>
        </Item>
        <Item>
          <Display>{t('Maximum Buy')}</Display>
          <Text>{maxPerUser.toNumber()} BNB</Text>
        </Item>
        <Item>
          <Display>{t('Total Contributors')}</Display>
          <Text>{fundersCounter.toNumber()}</Text>
        </Item>
        <Item>
          <Display>{t('You Purchased')}</Display>
          <Text>{purchaseTokenAmount.toFixed(2) || 0}</Text>
        </Item>
      </StyledLaunchpadStatus>
    </>
  )
}

export default LaunchpadStatusCard
