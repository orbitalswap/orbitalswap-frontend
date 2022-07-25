import React, { useState } from 'react'
import { useModal, Text } from '@pancakeswap/uikit'
import { LaunchpadStatus } from 'config/constants/types'
import { useLaunchpadContract } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'
import useLaunchpadClaim from '../../hooks/useLaunchpadClaim'
import { DeserializedLaunchpad } from 'state/types'
import useLaunchpadAllowance from 'views/Launchpads/hooks/useLaunchpadAllowance'
import useApproveLaunchpad from 'views/Launchpads/hooks/useApproveLaunchpad'
import unserializedTokens from 'config/constants/tokens'

export interface Props {
  launchpad: DeserializedLaunchpad
  status: LaunchpadStatus
  toggleStatus: () => void
}

const LaunchpadContribute: React.FC<Props> = ({ launchpad, status, toggleStatus }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { address, minPerTx, maxPerUser, totalRaised, currency } = launchpad
  const { contributedAmount, claimed } = launchpad.userData
  const buyTokenSymbol = currency?.symbol ?? 'BNB'

  const launchpadContractAddress = getAddress(address)
  const launchpadContract = useLaunchpadContract(launchpadContractAddress)

  const allowance = useLaunchpadAllowance(launchpadContractAddress, currency)

  const onClaim = useLaunchpadClaim(launchpadContract)
  const onApprove = useApproveLaunchpad(currency ?? unserializedTokens.wbnb, launchpadContractAddress)

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      launchpadId={launchpad.id}
      launchpadContract={launchpadContract}
      contributeLimit={maxPerUser.minus(contributedAmount)}
      minPerTx={minPerTx}
      currency={currency}
      toggleStatus={toggleStatus}
    />,
  )

  const claim = async () => {
    if (launchpadContract) {
      try {
        setPendingTx(true)
        await onClaim()
      } catch (err) {
        console.error(err)
      } finally {
        toggleStatus()
        setPendingTx(false)
      }
    }
  }

  const handleApprove = async () => {
    try {
      setPendingTx(true)
      await onApprove()
    } catch (err) {
      console.error(err)
    } finally {
      setPendingTx(false)
    }
  }

  const isFinished = status === 'upcoming'
  const percentOfUserContribution = +totalRaised === 0 ? 0 : contributedAmount.div(totalRaised).times(100)

  if (allowance.lt(minPerTx)) {
    return (
      <>
        <LabelButton
          disabled={pendingTx}
          buttonLabel={`Approve ${buyTokenSymbol}`}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={handleApprove}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'live') {
    return (
      <>
        <LabelButton
          disabled={claimed}
          buttonLabel={`Buy with ${buyTokenSymbol}`}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claimed ? claim : onPresentContributeModal}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'filled') {
    return (
      <>
        <LabelButton
          disabled
          buttonLabel={claimed ? 'Claimed' : 'Claim'}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'ended') {
    const claimable = contributedAmount.toNumber() > 0 && !claimed
    const noContribute = contributedAmount.toNumber() === 0 && !claimed
    return (
      <>
        <LabelButton
          disabled={!claimable}
          buttonLabel={!noContribute ? (claimable ? 'Claim' : 'Claimed') : `Buy with ${buyTokenSymbol}`}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
      </>
    )
  }

  return (
    <>
      <LabelButton
        disabled={isFinished}
        buttonLabel={!isFinished ? (claimed ? 'Claimed' : 'Claim') : `Buy with ${buyTokenSymbol}`}
        label={`Your contribution (${buyTokenSymbol})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default LaunchpadContribute
