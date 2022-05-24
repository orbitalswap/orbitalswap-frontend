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
    hardcap,
    softcap,
    totalSold
  } = ifo

  const { contributedAmount, claimed } = ifoUserData
  const buyTokenSymbol = 'BNB'

  return (
    <>
      <StyledLaunchpadStatus>
        <Item>
          <Display>{t('Status')}</Display>
          <Text>incoming</Text>
        </Item>
        <Item>
          <Display>{t('Sale type')}</Display>
          <Text>0.05 USD</Text>
        </Item>
        <Item>
          <Display>{t('Minimum Buy')}</Display>
          <Text>0.1 BNB</Text>
        </Item>
        <Item>
          <Display>{t('Maximum Buy')}</Display>
          <Text>10 BNB</Text>
        </Item>
        <Item>
          <Display>{t('You Purchased')}</Display>
          <Text>{contributedAmount.toNumber()} BNB</Text>
        </Item>
      </StyledLaunchpadStatus>
    </>
  )
}

export default LaunchpadStatusCard
