import React from 'react'
import styled from 'styled-components'
import { Text, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Item } from '../LaunchpadLayout'
import { DeserializedLaunchpad } from 'state/types'

export interface LaunchpadDetailsProps {
  launchpad: DeserializedLaunchpad
}

const StyledLaunchpadDetails = styled.div`
  margin-bottom: 24px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadDetails: React.FC<LaunchpadDetailsProps> = ({ launchpad }) => {
  const { t } = useTranslation()
  const {
    startDate,
    projectSiteUrl,
    presalePrice,
    minPerTx,
    maxPerUser,
    hardcap,
    softcap,
    totalRaised,
    currency,
    token,
  } = launchpad

  const buyTokenSymbol = currency?.symbol ?? 'BNB'
  const presaleTokenSymbol = token.symbol

  return (
    <>
      <StyledLaunchpadDetails>
        <Item>
          <Display>{t('Launch Time')}</Display>
          <Text>
            {`${new Date(startDate * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'America/Toronto',
            })} (EDT)`
            }
          </Text>
        </Item>
        <Item>
          <Display>{t('Hardcap')}</Display>
          <Text>{hardcap.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}</Text>
        </Item>
        {/*<Item>
          <Display>{t('Softcap')}</Display>

          <Text>{softcap.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}</Text>
          </Item>*/}
        <Item>
          <Display>{t('TokenPrice')}</Display>
          <Text>{presalePrice.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} {presaleTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Min Buy')}</Display>
          <Text>{minPerTx.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Max Buy')}</Display>
          <Text>{maxPerUser.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Total raised (% of target)')}</Display>
          <Text>
            {`${totalRaised.toNumber().toLocaleString('en-US', { maximumFractionDigits: 1 })} ${buyTokenSymbol}`}
            {`(${totalRaised.div(hardcap).times(100).toFixed(2)}%)`}
          </Text>
        </Item>

      </StyledLaunchpadDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default LaunchpadDetails
