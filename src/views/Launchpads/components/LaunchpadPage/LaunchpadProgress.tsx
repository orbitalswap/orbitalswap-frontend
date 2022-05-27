import React from 'react'
import styled from 'styled-components'
import { Flex, Progress, Text } from '@pancakeswap/uikit'

interface LaunchpadProgressProps {
  softcap: number,
  hardcap: number,
  raised: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const LaunchpadProgress: React.FC<LaunchpadProgressProps> = ({ softcap, hardcap, raised }) => {
  const progress1 = raised / hardcap * 100
  // const progress2 = softcap / hardcap * 100
  return (
    <StyledProgress>
      <Progress primaryStep={progress1} />
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{raised} BNB</Text>
        <Text>{hardcap} BNB</Text>
      </Flex>
    </StyledProgress>
  )
}

export default LaunchpadProgress
