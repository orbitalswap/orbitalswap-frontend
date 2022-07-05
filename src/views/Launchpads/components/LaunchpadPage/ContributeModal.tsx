import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from '@ethersproject/contracts'
import { Modal, Button, Flex, Text } from '@pancakeswap/uikit'
import { Currency, Token } from '@orbitalswap/sdk'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { fetchLaunchpadsPublicDataAsync, fetchLaunchpadUserDataAsync } from 'state/launchpads'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getDecimalAmount } from 'utils/formatBalance'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import useLaunchpadContribute from '../../hooks/useLaunchpadContribute'

interface Props {
  launchpadId: number
  launchpadContract: Contract
  contributeLimit: BigNumber
  minPerTx: BigNumber
  currency?: Token
  onDismiss?: () => void
  toggleStatus: () => void
}

const ContributeModal: React.FC<Props> = ({
  launchpadId,
  launchpadContract,
  contributeLimit,
  minPerTx,
  currency,
  onDismiss,
  toggleStatus,
}) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [isLimit, reachedLimit] = useState(false)
  const [tooSmall, setTooSmall] = useState(false)
  const { account } = useWeb3React()
  const tokenBalance = useCurrencyBalance(account ?? undefined, currency ?? Currency.ETHER)
  const onContribute = useLaunchpadContribute(launchpadContract)

  const buyTokenSymbol = currency?.symbol ?? 'BNB'

  useEffect(() => {
    if (new BigNumber(value).isGreaterThan(contributeLimit)) {
      reachedLimit(true)
    } else {
      reachedLimit(false)
    }
    if (new BigNumber(value).isLessThan(minPerTx)) {
      setTooSmall(true)
    } else {
      setTooSmall(false)
    }
  }, [value, contributeLimit, minPerTx])

  return (
    <Modal title={`Contribute ${buyTokenSymbol}`} onDismiss={onDismiss}>
      <CurrencyInputPanel
        id="ifo-contribute-input"
        onUserInput={(input) => setValue(input)}
        onCurrencySelect={undefined}
        disableCurrencySelect
        showMaxButton
        onMax={() => {
          setValue(Math.max(Number(tokenBalance.toFixed()) - 0.01, 0).toString())
        }}
        value={value}
        currency={currency ?? Currency.ETHER}
      />
      {(isLimit || tooSmall) && (
        <Text color="failure" fontSize="12px" textAlign="right">
          {isLimit
            ? `Max ${contributeLimit
                .toNumber()
                .toLocaleString('en-US', { maximumFractionDigits: 3 })} ${buyTokenSymbol} contributable now.`
            : tooSmall
            ? `Min.Tx ${minPerTx.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} ${buyTokenSymbol}.`
            : ''}
        </Text>
      )}
      <Flex justifyContent="space-between" mt="24px">
        <Button width="100%" variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={pendingTx || new BigNumber(value).isNaN() || new BigNumber(value).isZero() || isLimit}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onContribute(getDecimalAmount(new BigNumber(value), currency?.decimals).toString(), !!currency)

              dispatch(fetchLaunchpadsPublicDataAsync([launchpadId]))
              dispatch(fetchLaunchpadUserDataAsync(account, [launchpadId]))
            } catch (err) {
              console.error(err)
            } finally {
              toggleStatus()
              setPendingTx(false)
              onDismiss()
            }
          }}
        >
          Confirm
        </Button>
      </Flex>
      {/* <LinkExternal
        href="https://exchange.pancakeswap.finance/#/add/ETH/0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal> */}
    </Modal>
  )
}

export default ContributeModal
