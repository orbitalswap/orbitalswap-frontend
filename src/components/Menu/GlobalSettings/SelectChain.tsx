import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Box, BoxProps, ChevronDownIcon, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NetworkOptions } from 'config/constants'
import useToast from 'hooks/useToast'
import { ChainId } from '@orbitalswap/sdk'
import { switchChain } from 'utils/wallet'

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 0px 10px;
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
  width: fit-content;
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
  // min-width: 136px;
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
  padding: 8px 10px;
  position: relative;
  display: flex;
  align-items: center;
  // justify-content: center;
  width: max-content;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`
const Image = styled.img`
  width: 20px;
  height: 20px;
`

export interface SelectChainProps extends BoxProps {
  selectedIndex?: number
}

export interface OptionProps {
  label: string
  value: ChainId
  icon: string
}

const SelectChain: React.FunctionComponent<SelectChainProps> = ({ selectedIndex = 0, ...props }) => {
  const { account, chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { toastError } = useToast()

  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(NetworkOptions[selectedIndex])

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
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
    if (idx >= 0) {
      setSelected(NetworkOptions[idx])
    }
  }, [chainId])

  const handleChainSelected = async (option: OptionProps) => {
    try {
      if (!window.ethereum) {
        if (account) {
          toastError(
            'Error',
            `This browser does not provide this feature. In order to use ${option.label}, you must change the blockchain of your wallet directly.`,
          )
          return
        }
        localStorage.setItem('chainId', option.value.toString())
        window.location.reload()
        return
      }

      const message = await switchChain(option.value)
      if (message) {
        toastError('Error', message)
      } else {
        setSelected(option)
      }
    } catch (err: any) {
      toastError(
        'Error',
        err?.message,
        // `Failed to switch networks from the Brewlabs Platform. In order to use ${option.label}, you must change the blockchain of your wallet directly.`,
      )
      // eslint-disable-next-line no-console
      console.log(err?.message)
    }
  }

  return (
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <Image src={selected.icon} alt="chain logo" style={{ marginRight: isMobile ? '10px' : '0' }} />
        {!isMobile && (
          <Text ml="5px" style={{ marginRight: '15px' }}>
            {selected.label}
          </Text>
        )}
        <ChevronDownIcon color="text" width="24px" />
      </DropDownHeader>
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {NetworkOptions.map((option, index) => {
            return option.value !== chainId ? (
              <ListItem onClick={() => handleChainSelected(option)} key={option.label}>
                <Image src={option.icon} alt="chain logo" />
                <Text ml="10px" textAlign="left" style={{ whiteSpace: 'nowrap' }}>
                  {option.label}
                </Text>
              </ListItem>
            ) : null
          })}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default SelectChain
