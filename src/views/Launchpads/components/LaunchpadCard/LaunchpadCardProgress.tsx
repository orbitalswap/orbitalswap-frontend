import React from 'react'
import styled from 'styled-components'
import { Progress, Text } from '@pancakeswap/uikit'

interface LaunchpadProgressProps {
  softcap: number,
  hardcap: number,
  raised: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`
const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const ProgressBar = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`
const LaunchpadCardProgress: React.FC<LaunchpadProgressProps> = ({ softcap, hardcap, raised }) => {
  const progress1 = raised / hardcap * 100
  return (
    <StyledProgress>
      <Item>
        <Display>Soft/Hard Cap:</Display>
      </Item>
      <Item>
        <Text color='failure'>{softcap} BNB - {hardcap} BNB</Text>
      </Item>
      <Item>
        <Text>Progress ({progress1.toFixed(2)}%)</Text>
      </Item>
      <ProgressBar>
        <Progress primaryStep={progress1} />
      </ProgressBar>
      <Item>
        <Display>{softcap} BNB</Display>
        <Text fontSize='14px'>{hardcap} BNB</Text>
      </Item>
      <Item>
        <Display>Liquidity %: </Display>
        <Text>51 %</Text>
      </Item>
      <Item>
        <Display>Lockup Time %:</Display>
        <Text>365 days</Text>
      </Item>
    </StyledProgress>
  )
}

export default LaunchpadCardProgress
