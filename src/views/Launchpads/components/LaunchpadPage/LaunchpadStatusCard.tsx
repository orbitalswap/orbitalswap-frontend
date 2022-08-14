import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LaunchpadStatus } from 'config/constants/types'
import { DeserializedLaunchpad } from 'state/types'
import { Item } from '../LaunchpadLayout'

export interface LaunchpadStatusProps {
  launchpad: DeserializedLaunchpad
  status: LaunchpadStatus
}

const StyledLaunchpadStatus = styled.div`
  margin-bottom: 24px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadStatusCard: React.FC<LaunchpadStatusProps> = ({ launchpad, status }) => {
  const { t } = useTranslation()
  const { presalePrice, minPerTx, maxPerUser, fundersCounter, currency, isPrivatesale } = launchpad
  const { contributedAmount, withdrawableAmount, claimedAmount } = launchpad.userData
  const buyTokenSymbol = currency?.symbol ?? 'BNB'


  const purchaseTokenAmount = presalePrice.toNumber() * contributedAmount?.toNumber() || 0
  return (
    <>
      <StyledLaunchpadStatus>
        <Item>
          <Display>{t('Status')}</Display>
          <Text>{status}</Text>
        </Item>
       <Item>
          <Display>{t('Sale type')}</Display>

          <Text>{isPrivatesale ? 'Private' : 'Public'}</Text>
        </Item>

        <Item>
          <Display>{t('Minimum Buy')}</Display>
          <Text>
            {minPerTx.toNumber()} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Maximum Buy')}</Display>
          <Text>
            {maxPerUser.toNumber()} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Total Contributors')}</Display>
          <Text>{fundersCounter}</Text>
        </Item>

        <Item>
          <Display>{t('You Purchased')}</Display>
          <Text>{contributedAmount.toFixed(2) || 0}</Text>
        </Item>
        <Item>
          <Display>{t('Total Tokens Bought')}</Display>
          <Text>{+withdrawableAmount.toFixed(2) || 0}</Text>
        </Item>
        {/*<Item>
          <Display>{t('You Claimed')}</Display>
          <Text>{+claimedAmount || 0}</Text>
  </Item>*/}

      </StyledLaunchpadStatus>
    </>
  )
}

export default LaunchpadStatusCard
