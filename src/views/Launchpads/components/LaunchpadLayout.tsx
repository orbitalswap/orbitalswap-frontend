import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

const LaunchpadLayout = styled(Box)`
  > div:not(.sticky-header) {
    margin-bottom: 32px;
  }
`

export const LaunchpadLayoutWrapper = styled(Flex)`
  gap: 22px;
  align-items: flex-start;
  & > div:first-child {
    flex: 2;
    gap: 20px;
  }
  & > div:last-child {
    flex: 1;
  }
`

export const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.cardBorder};
`

export default LaunchpadLayout
