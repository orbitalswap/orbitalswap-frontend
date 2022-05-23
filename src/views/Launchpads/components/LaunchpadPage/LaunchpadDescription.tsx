import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface LaunchpadDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledLaunchpadDescription = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-weight: 600;
  outline: 0;
  padding: 24px 16px;
  width: 100%;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const LaunchpadDescription: React.FC<LaunchpadDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const {t} = useTranslation()

  return (
    <StyledLaunchpadDescription>
      <Divider />
      <Description>{description}</Description>
      <Divider />
    </StyledLaunchpadDescription>
  )
}

export default LaunchpadDescription
