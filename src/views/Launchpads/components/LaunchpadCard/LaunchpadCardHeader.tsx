import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { LaunchpadStatus } from 'config/constants/types'
import { LaunchpadStateTag } from './tags'

interface LaunchpadCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
  status: LaunchpadStatus
}

const StyledLaunchpadCardHeader = styled(Flex)`
  padding-top: 12px;
  & > div {
    flex: revert;
  }
  justify-content: space-between;
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 8px;
  text-align: center;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: center;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`


const LaunchpadCardHeader: React.FC<LaunchpadCardHeaderProps> = ({ ifoId, name, subTitle, status }) => {
  const theme = useTheme();
  return (
    <StyledLaunchpadCardHeader mb="24px">
      <img src={`/images/launchpads/${theme.isDark ? ifoId : `${ifoId}-white`}.svg`} alt={ifoId} width="158px" height="29px" />
      <Item>
        <LaunchpadStateTag launchpadState={status} />
      </Item>
    </StyledLaunchpadCardHeader>
  )
}

export default LaunchpadCardHeader
