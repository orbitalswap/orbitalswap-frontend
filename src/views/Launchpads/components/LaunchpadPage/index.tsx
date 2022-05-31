import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {Box, Card, CardBody, CardRibbon, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { Launchpad} from 'config/constants/types'
import { getStatus } from 'views/Launchpads/hooks/helpers'
import LaunchpadLayout, { LaunchpadLayoutWrapper } from '../LaunchpadLayout'
import LaunchpadHeader from './LaunchpadHeader'
import LaunchpadProgress from './LaunchpadProgress'
import LaunchpadDescription from './LaunchpadDescription'
import LaunchpadDetails from './LaunchpadDetails'
import LaunchpadTime from './LaunchpadTime'
import LaunchpadContribute from './LaunchpadContribute'
import useLaunchpadPublicData from '../../hooks/useLaunchpadPublicData'
import useLaunchpadUserData from '../../hooks/useLaunchpadUserData'
import LaunchpadStatusCard from './LaunchpadStatusCard'

export interface LaunchpadProps {
  ifo: Launchpad
}

const StyledLaunchpad = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  margin-top:24px;

`

const StatusCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  // max-width: 437px;
  width: 100%;
`

const OwnerActivityContainer = styled(Flex)`
  gap: 22px;
`

const LaunchpadPage: React.FC<LaunchpadProps> = ({ ifo }) => {
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
    totalSold,
    raised,
    isLoading, 
    startDateNum, 
    endDateNum, 
    releaseAt,
    fundersCounter,
    presaleStatus,
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
        const status = getStatus(currentTime, startDateNum, endDateNum, totalSold.toNumber(), softcap.toNumber(), hardcap.toNumber(), presaleStatus)
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
  }, [isLoading, startDateNum, endDateNum, totalSold, softcap, hardcap, presaleStatus, releaseAt])

  const { t } = useTranslation()


  const isActive = state.status === 'live' || state.status === 'filled'
  const isFinished = state.status === 'finished'



  //

  const { isMobile } = useMatchBreakpoints()
  
  return (
    <LaunchpadLayout id="current-launchpad" py={['24px', '24px', '40px']}>
      <Container>
        <LaunchpadLayoutWrapper>
          <Flex flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadHeader ifoId={id} name={name} subTitle={subTitle} />
                <LaunchpadDescription description={description} />
                <LaunchpadDetails ifo={ifoPublicData} />
              </CardBody>
            </StyledLaunchpad>
          </Flex>
          <OwnerActivityContainer flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadTime
                  isLoading={isLoading}
                  status={state.status}
                  secondsUntilStart={state.secondsUntilStart}
                  secondsUntilEnd={state.secondsUntilEnd}
                  block={isActive || isFinished ? endDateNum : startDateNum}
                />
                <LaunchpadProgress softcap={softcap.toNumber()} hardcap={hardcap.toNumber()} raised={raised.toNumber()}/>
                {!account && <ConnectWalletButton width="100%" />}
                {account && (
                  <LaunchpadContribute
                    ifoPublicData={ifoPublicData}
                    ifoUserData={ifoUserData}
                    status={state.status}
                    raisingAmount={raised}
                    toggleStatus={toggleStatus}
                  />
                )}
              </CardBody>
            </StyledLaunchpad>
            <StatusCard>
              <CardBody>
                <LaunchpadStatusCard 
                  ifo={ifoPublicData} 
                  ifoUserData={ifoUserData}
                  status={state.status}
                />
              </CardBody>
            </StatusCard>
          </OwnerActivityContainer>
        </LaunchpadLayoutWrapper>
      </Container>

    </LaunchpadLayout>
  )
}

export default LaunchpadPage
