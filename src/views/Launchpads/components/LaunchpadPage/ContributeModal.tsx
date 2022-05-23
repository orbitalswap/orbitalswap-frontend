import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from '@ethersproject/contracts'
import { Modal, Button, Flex, Text } from '@pancakeswap/uikit'
import { Currency, CurrencyAmount } from '@orbitalswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getDecimalAmount } from 'utils/formatBalance'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import useIfoContribute from '../../hooks/useLaunchpadContribute'

interface Props {
  ifoContract: Contract
  contributeLimit: BigNumber
  minPerTx: BigNumber
  onDismiss?: () => void
  toggleStatus: () => void
}

const ContributeModal: React.FC<Props> = ({
  ifoContract,
  contributeLimit,
  minPerTx,
  onDismiss,
  toggleStatus
}) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [isLimit, reachedLimit] = useState(false)
  const [tooSmall, setTooSmall] = useState(false)
  const { account } = useActiveWeb3React()
  const etherBalance = useCurrencyBalance(account ?? undefined, Currency.ETHER)
  const onContribute = useIfoContribute(ifoContract)

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
    <Modal title="Contribute BNB" onDismiss={onDismiss}>
      <CurrencyInputPanel
        id="ifo-contribute-input"
        onUserInput={(input) => setValue(input)}
        onCurrencySelect={undefined}
        disableCurrencySelect
        showMaxButton
        onMax={() => { setValue(Math.max((Number(etherBalance.toFixed()) - 0.01), 0).toString()) }}
        value={value}
        currency={Currency.ETHER}
      />
      {
        (isLimit || tooSmall) && <Text color='failure' fontSize='12px' textAlign='right'>
          {isLimit ? `Max ${contributeLimit.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} BNB contributable now.`
            : tooSmall ? `Min.Tx ${minPerTx.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} BNB.`
              : ''}
        </Text>
      }
      <Flex justifyContent="space-between" mt="24px">
        <Button width='100%' variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          width='100%'
          disabled={pendingTx || new BigNumber(value).isNaN() || new BigNumber(value).isZero() || isLimit}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onContribute(getDecimalAmount(new BigNumber(value)).toString())
            } catch (err) {
              console.error(err)
            } finally {
              toggleStatus()
              setPendingTx(false)
            }
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  )
}

export default ContributeModal
