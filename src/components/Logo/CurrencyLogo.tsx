import { Currency, Token } from '@orbitalswap/sdk'
import { useMemo } from 'react'
import styled from 'styled-components'
import { WrappedTokenInfo } from 'state/types'
import useHttpLocations from '../../hooks/useHttpLocations'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return [getTokenLogoURL(currency.wrapped.address, currency.chainId)]

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address, currency.chainId)]
      }
      return [getTokenLogoURL(currency.address, currency.chainId)]
    }
    return []
  }, [currency, uriLocations])


  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
