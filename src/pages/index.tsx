import { ChainId, FACTORY_ADDRESS_MAP } from '@orbitalswap/sdk'
import { getUnixTime, sub } from 'date-fns'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { bitQueryServerClient, infoServerClient } from 'utils/graphql'
import { getBlocksFromTimestamps } from 'views/Info/hooks/useBlocksFromTimestamps'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { getCakeContract } from 'utils/contractHelpers'
import { DEFAULT_CHAIN_ID } from 'config/constants/networks'
import { formatEther } from '@ethersproject/units'

import Home from '../views/Home'

const IndexPage = ({ totalTx30Days, addressCount30Days, tvl }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          totalTx30Days,
          addressCount30Days,
          tvl,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

// Values fetched from TheGraph and BitQuery jan 24, 2022
const txCount = 54780336
const addressCount = 4425459

const tvl = 6082955532.115718

export const getStaticProps: GetStaticProps = async () => {  
  const totalTxQuery = gql`
    query TotalTransactions($id: ID!, $block: Block_height) {
      pancakeFactory(id: $id, block: $block) {
        totalTransactions
      }
    }
  `
  const days30Ago = sub(new Date(), { days: 30 })

  const results = {
    totalTx30Days: txCount,
    addressCount30Days: addressCount,
    tvl,
  }

  if (process.env.SF_HEADER) {
    try {
      if (!infoServerClient(ChainId.BSC_MAINNET)) {
        return {
          props: results,
          revalidate: 60 * 60 * 24 * 30, // 30 days
        }
      }

      const [days30AgoBlock] = await getBlocksFromTimestamps(ChainId.BSC_MAINNET, [getUnixTime(days30Ago)])

      if (!days30AgoBlock) {
        throw new Error('No block found for 30 days ago')
      }

      const totalTx = await infoServerClient(ChainId.BSC_MAINNET).request(totalTxQuery, {
        id: FACTORY_ADDRESS_MAP[DEFAULT_CHAIN_ID],
      })
      const totalTx30DaysAgo = await infoServerClient(ChainId.BSC_MAINNET).request(totalTxQuery, {
        block: {
          number: days30AgoBlock.number,
        },
        id: FACTORY_ADDRESS_MAP[DEFAULT_CHAIN_ID],
      })

      if (
        totalTx?.pancakeFactory?.totalTransactions &&
        totalTx30DaysAgo?.pancakeFactory?.totalTransactions &&
        parseInt(totalTx.pancakeFactory.totalTransactions) > parseInt(totalTx30DaysAgo.pancakeFactory.totalTransactions)
      ) {
        results.totalTx30Days =
          parseInt(totalTx.pancakeFactory.totalTransactions) -
          parseInt(totalTx30DaysAgo.pancakeFactory.totalTransactions)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error when fetching total tx count', error)
      }
    }
  }

  const usersQuery = gql`
    query userCount($since: ISO8601DateTime, $till: ISO8601DateTime) {
      ethereum(network: bsc) {
        dexTrades(exchangeName: { in: ["Pancake", "Pancake v2"] }, date: { since: $since, till: $till }) {
          count(uniq: senders)
        }
      }
    }
  `

  if (process.env.BIT_QUERY_HEADER) {
    try {
      const result = await bitQueryServerClient.request(usersQuery, {
        since: days30Ago.toISOString(),
        till: new Date().toISOString(),
      })
      if (result?.ethereum?.dexTrades?.[0]?.count) {
        results.addressCount30Days = result.ethereum.dexTrades[0].count
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error when fetching address count', error)
      }
    }
  }

  try {
    const result = await infoServerClient(ChainId.BSC_MAINNET).request(gql`
      query tvl {
        pancakeFactories(first: 1) {
          totalLiquidityUSD
        }
        token(id: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82") {
          derivedUSD
        }
      }
    `)
    const { totalLiquidityUSD } = result.pancakeFactories[0]
    const cakeVaultV2 = getCakeVaultAddress(ChainId.BSC_MAINNET)
    const cakeContract = getCakeContract(ChainId.BSC_MAINNET)
    const totalCakeInVault = await cakeContract.balanceOf(cakeVaultV2)
    results.tvl = parseFloat(formatEther(totalCakeInVault)) * result.token.derivedUSD + parseFloat(totalLiquidityUSD)
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Error when fetching tvl stats', error)
    }
  }

  return {
    props: results,
    revalidate: 60 * 60 * 24 * 30, // 30 days
  }
}

export default IndexPage
