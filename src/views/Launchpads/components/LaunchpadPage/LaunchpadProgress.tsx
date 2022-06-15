import React from 'react'
import styled from 'styled-components'
import { Flex, Progress, Text } from '@pancakeswap/uikit'
import { Token } from '@orbitalswap/sdk'

interface LaunchpadProgressProps {
  softcap: number,
  hardcap: number,
  raised: number
  currency?: Token
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const LaunchpadProgress: React.FC<LaunchpadProgressProps> = ({ softcap, hardcap, raised, currency }) => {
  const progress1 = raised / hardcap * 100
  // const progress2 = softcap / hardcap * 100
  const buyTokenSymbol = currency?.symbol ?? 'BNB'

  return (
    <StyledProgress>
      <Progress primaryStep={progress1} />
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{raised} {buyTokenSymbol}</Text>
        <Text>{hardcap} {buyTokenSymbol}</Text>
      </Flex>
    </StyledProgress>
  )
}

export default LaunchpadProgress
