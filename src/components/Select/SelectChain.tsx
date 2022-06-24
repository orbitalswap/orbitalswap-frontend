import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Box, BoxProps, Text } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NetworkOptions } from 'config/constants'

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
`

const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  height: 40px;
  min-width: 136px;
  user-select: none;
  z-index: 103;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 16px 16px 0 0;
      }
      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }
    `}
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  position: relative;
  // display: flex;
  // justify-content: center;
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`

export interface SelectChainProps extends BoxProps {
  onOptionChange?: (option: OptionProps) => void
  defaultOptionIndex?: number
}

export interface OptionProps {
  label: string
  value: any
  icon: string
}

const SelectChain: React.FunctionComponent<SelectChainProps> = ({
  onOptionChange,
  defaultOptionIndex = 0,
  ...props
}) => {
  const { chainId } = useActiveWeb3React()

  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex)

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    // setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onOptionChange) {
      onOptionChange(NetworkOptions[selectedIndex])
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const idx = NetworkOptions.findIndex((op) => op.value === chainId)
    if (idx !== -1) {
      setSelectedOptionIndex(idx)
    }
  }, [chainId])

  return (
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <img src={NetworkOptions[selectedOptionIndex].icon} alt='chain logo'/>
        <Text mx="20px">{NetworkOptions[selectedOptionIndex].label}</Text>
        <ArrowDropDownIcon color="text" onClick={toggling} />
      </DropDownHeader>
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {NetworkOptions.map((option, index) => {
            return option.value !== chainId ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <img src={option.icon} alt='chain logo'/>
                <Text ml="23px" textAlign="left">{option.label}</Text>
              </ListItem>
            ) : null
          })}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default SelectChain
