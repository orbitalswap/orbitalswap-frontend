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
const LogoItem = styled.div<{ isDark: boolean, launchpadId: number }>`
  background-image: ${({ isDark, launchpadId }) => (isDark ? `url(/images/launchpads/${launchpadId}.png)` : `url(/images/launchpads/${launchpadId}-white.png)`)};
  width: 358px;
  height: 75px;
  background-size: contain;
  background-repeat-x: no-repeat;
`

const LaunchpadHeader: React.FC<LaunchpadHeaderProps> = ({ launchpadId, name, subTitle }) => {
  const { theme } = useTheme()
  return (
      
    <StyledLaunchpadHeader mb="24px" alignItems="center">
      <LogoItem isDark={theme.isDark} launchpadId={launchpadId}/>
      <div>

        <Name>{name}</Name>
        <Description>{subTitle}</Description>
      </div> 
    </StyledLaunchpadHeader>
  )

}
export default LaunchpadHeader;
