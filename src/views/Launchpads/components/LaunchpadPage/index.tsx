import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Box, Card, CardBody, CardRibbon, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { getStatus } from 'views/Launchpads/hooks/helpers'
import { DeserializedLaunchpad } from 'state/types'
import { useLaunchpadsPageFetch } from 'state/launchpads/hooks'
import LaunchpadLayout, { LaunchpadLayoutWrapper } from '../LaunchpadLayout'
import LaunchpadHeader from './LaunchpadHeader'
import LaunchpadProgress from './LaunchpadProgress'
import LaunchpadDescription from './LaunchpadDescription'
import LaunchpadDetails from './LaunchpadDetails'
import LaunchpadTime from './LaunchpadTime'
import LaunchpadContribute from './LaunchpadContribute'
import LaunchpadStatusCard from './LaunchpadStatusCard'

export interface LaunchpadProps {
  launchpad: DeserializedLaunchpad
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
  margin-top: 24px;
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

const LaunchpadPage: React.FC<LaunchpadProps> = ({ launchpad }) => {
  const [statusChanged, changeStatus] = useState(false)

  const toggleStatus = () => {
    changeStatus(!statusChanged)
  }

  useLaunchpadsPageFetch()

  const {
    id,
    name,
    description,
    subTitle,
    softcap,
    hardcap,
    totalSold,
    totalRaised,
    startDate,
    endDate,
    releaseAt,
    presaleStatus,
  } = launchpad

  const [state, setState] = useState({
    status: null,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
  })

  const { account } = useWeb3React()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (softcap.gt(0)) {
        const currentTime = Math.floor(Date.now() / 1000)
        const status = getStatus(
          currentTime,
          startDate,
          endDate,
          totalRaised.toNumber(),
          softcap.toNumber(),
          hardcap.toNumber(),
          presaleStatus,
        )
        const totalSeconds = endDate - startDate
        const secondsRemaining = endDate - currentTime

        // Calculate the total progress until finished or until start
        const progress =
          currentTime > startDate
            ? ((currentTime - startDate) / totalSeconds) * 100
            : ((currentTime - releaseAt) / (startDate - releaseAt)) * 100

        setState({
          status,
          progress,
          secondsUntilStart: startDate - currentTime,
          secondsUntilEnd: secondsRemaining,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate, endDate, totalSold, softcap, hardcap, presaleStatus, totalRaised, releaseAt])

  const { t } = useTranslation()

  const isActive = state.status === 'live' || state.status === 'filled'
  const isFinished = state.status === 'finished'

  return (
    <LaunchpadLayout id="current-launchpad" py={['24px', '24px', '40px']}>
      <Container>
        <LaunchpadLayoutWrapper>
          <Flex flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadHeader launchpadId={id} name={name} subTitle={subTitle} />
                <LaunchpadDescription description={description} />
                <LaunchpadDetails launchpad={launchpad} />
              </CardBody>
            </StyledLaunchpad>
          </Flex>
          <OwnerActivityContainer flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadTime
                  isLoading={softcap.eq(0)}
                  status={state.status}
                  secondsUntilStart={state.secondsUntilStart}
                  secondsUntilEnd={state.secondsUntilEnd}
                  block={isActive || isFinished ? endDate : startDate}
                />
                <LaunchpadProgress
                  softcap={softcap.toNumber()}
                  hardcap={hardcap.toNumber()}
                  raised={totalRaised.toNumber()}
                  currency={launchpad.currency}
                />
                {!account && <ConnectWalletButton width="100%" />}
                {account && (
                  <LaunchpadContribute
                    launchpad={launchpad}
                    status={state.status}
                    toggleStatus={toggleStatus}
                  />
                )}
              </CardBody>
            </StyledLaunchpad>
            <StatusCard>
              <CardBody>
                <LaunchpadStatusCard launchpad={launchpad} status={state.status} />
              </CardBody>
            </StatusCard>
          </OwnerActivityContainer>
        </LaunchpadLayoutWrapper>
      </Container>
    </LaunchpadLayout>
  )
}

export default LaunchpadPage
