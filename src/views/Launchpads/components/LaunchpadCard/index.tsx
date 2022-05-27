import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {Box, Card, CardBody, CardRibbon, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { Launchpad, LaunchpadStatus } from 'config/constants/types'
import { getStatus } from 'views/Launchpads/hooks/helpers'
import LaunchpadCardHeader from './LaunchpadCardHeader'
import LaunchpadCardProgress from './LaunchpadCardProgress'
import LaunchpadCardDetails from './LaunchpadCardDetails'
import useLaunchpadPublicData from '../../hooks/useLaunchpadPublicData'
import useLaunchpadUserData from '../../hooks/useLaunchpadUserData'

export interface LaunchpadCardProps {
  ifo: Launchpad
}

const StyledLaunchpadCard = styled(Card) <{ ifoId: string }>`
  // background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.png')`};
  background-repeat: no-repeat;
  background-size: contain;
  // padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const getRibbonComponent = (status: LaunchpadStatus, TranslateString: (fallback: string) => any) => {
  if (status === 'upcoming') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString('Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString('LIVE NOW!')} />
  }

  return null
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ ifo }) => {
  const [statusChanged, changeStatus] = useState(false)

  const toggleStatus = () => {
    changeStatus(!statusChanged)
  }

  const ifoPublicData = useLaunchpadPublicData(ifo)
  const ifoUserData = useLaunchpadUserData(ifo, statusChanged)

  const { 
    id,
    name,
    description,
    subTitle,
    liquidityPercent,
    softcap, 
    hardcap,
    raised,
    totalSold,
    isLoading, 
    startDateNum, 
    endDateNum, 
    releaseAt,
    presaleStatus
  } = ifoPublicData

  const [state, setState] = useState({
    status: null,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0
  })

  const { account } = useWeb3React()
  
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isLoading) {
        const currentTime = Math.floor(Date.now() / 1000)
        const status = getStatus(currentTime, startDateNum, endDateNum, raised.toNumber(), softcap.toNumber(), hardcap.toNumber(), presaleStatus)
        const totalSeconds = endDateNum - startDateNum
        const secondsRemaining = endDateNum - currentTime
  
        // Calculate the total progress until finished or until start
        const progress =
          currentTime > startDateNum
            ? ((currentTime - startDateNum) / totalSeconds) * 100
            : ((currentTime - releaseAt) / (startDateNum - releaseAt)) * 100
        
            setState({
              status, progress, secondsUntilStart: startDateNum - currentTime, secondsUntilEnd: secondsRemaining
            })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isLoading, startDateNum, endDateNum, releaseAt])

  const { t } = useTranslation()
  
  return (
    <StyledLaunchpadCard ifoId={id}>
      <CardBody>
        <LaunchpadCardHeader ifoId={id} name={name} subTitle={subTitle} status={state.status} />
        <LaunchpadCardProgress softcap={softcap.toNumber()} hardcap={hardcap.toNumber()} raised={raised.toNumber()} liquidityPercent={liquidityPercent.toNumber()}/>
        <LaunchpadCardDetails 
          ifo={ifoPublicData} 
          status={state.status}
          secondsUntilStart={state.secondsUntilStart}
          secondsUntilEnd={state.secondsUntilEnd}
        />
      </CardBody>
    </StyledLaunchpadCard>
  )
}

export default LaunchpadCard
