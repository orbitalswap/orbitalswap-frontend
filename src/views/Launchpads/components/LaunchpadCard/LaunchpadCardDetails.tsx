import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
import { Text, LinkExternal, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { PublicLaunchpadData } from 'views/Launchpads/types'
import { ChainId } from '@orbitalswap/sdk'
import { LaunchpadStatus } from 'config/constants/types'

export interface LaunchpadCardDetailsProps {
  ifo: PublicLaunchpadData,
  status: LaunchpadStatus
  secondsUntilStart: number,
  secondsUntilEnd: number,
}

const StyledLaunchpadCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadCardDetails: React.FC<LaunchpadCardDetailsProps> = ({ ifo, status, secondsUntilStart, secondsUntilEnd }) => {
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

  const countdownToUse = status === 'upcoming' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  
  const buyTokenSymbol = 'BNB'

  return (
    <>
      <StyledLaunchpadCardDetails>
        <Item>
          <Display>
            <Text>Sale Ends in:</Text>
            <Text>{timeUntil.days.toString().padStart(2, '0')}:{timeUntil.hours.toString().padStart(2, '0')}:{timeUntil.minutes.toString().padStart(2, '0')}:{timeUntil.seconds.toString().padStart(2, '0')}</Text>
          </Display>
          <div>
          <Link href={`/launchpads/${ifo?.address[ChainId.MAINNET]}`} passHref>
            <Button as="a" variant="primary">
              {t('View Pool')}
            </Button>
          </Link>
          </div>
      </Item>
      </StyledLaunchpadCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default LaunchpadCardDetails
