import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'

interface LaunchpadHeaderProps {
  launchpadId: number
  name: string
  subTitle: string
}

const StyledLaunchpadHeader = styled(Flex)`
  padding-top: 12px;
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 8px;
  text-align: left;
  margin-left : 1.5rem;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: left;
  margin-left : 1.5rem;
`

const LaunchpadHeader: React.FC<LaunchpadHeaderProps> = ({ launchpadId, name, subTitle }) => {
  const { theme } = useTheme()
  return (
    <StyledLaunchpadHeader mb="24px" alignItems="center">
      <img src={`/images/launchpads/${theme.isDark ? launchpadId : `${launchpadId}-white`}.svg`} alt={`launchpad-${launchpadId}`} width="158px" height="29px" />
      {/* <div>
        <Name>{name}</Name>
        <Description>{subTitle}</Description>
      </div> */}
    </StyledLaunchpadHeader>
  )
}

export default LaunchpadHeader
