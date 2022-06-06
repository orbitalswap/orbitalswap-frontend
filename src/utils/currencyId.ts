import { Currency, Token } from '@orbitalswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency.isNative) return currency.symbol
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
