import React, { useState, useEffect } from 'react'
import { useModal, Button, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { Launchpad, LaunchpadStatus } from 'config/constants/types'
import { useLaunchpadContract } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'
import { PublicLaunchpadData, UserLaunchpadData } from '../../types'
import useLaunchpadClaim from '../../hooks/useLaunchpadClaim'

export interface Props {
  ifoPublicData: PublicLaunchpadData
  ifoUserData: UserLaunchpadData
  status: LaunchpadStatus
  raisingAmount: BigNumber
  toggleStatus: () => void
}

const LaunchpadContribute: React.FC<Props> = ({
  ifoPublicData,
  ifoUserData,
  status,
  raisingAmount,
  toggleStatus
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { address, minPerTx, maxPerUser, presaleStatus, softcap, hardcap, raised } = ifoPublicData
  const { contributedAmount, claimed } = ifoUserData
  const ifoContract = useLaunchpadContract(getAddress(address))
  const onClaim = useLaunchpadClaim(ifoContract)

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      ifoContract={ifoContract}
      contributeLimit={maxPerUser.minus(contributedAmount)}
      minPerTx={minPerTx}
      toggleStatus={toggleStatus}
    />,
  )

  const claim = async () => {
    if (ifoContract) {
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

  const isFinished = status === 'upcoming'
  const percentOfUserContribution = contributedAmount.div(raisingAmount).times(100)

  if (status === 'live') {
    return (
      <>
        <LabelButton
          disabled={claimed}
          buttonLabel='Buy with BNB'
          label="Your contribution (BNB)"
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claimed ? claim : onPresentContributeModal}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished
            ? `You'll get tokens when you claim`
            : `${percentOfUserContribution.toFixed(5)}% of total`}
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
          label="Your contribution (BNB)"
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished
            ? `You'll get tokens when you claim`
            : `${percentOfUserContribution.toFixed(5)}% of total`}
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
          buttonLabel={!noContribute? (claimable ? 'Claim' : 'Claimed') : 'Buy with BNB'}
          label="Your contribution (BNB)"
          value={
            // eslint-disable-next-line no-nested-ternary
            contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished
            ? `You'll get tokens when you claim`
            : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
      </>
    )
  }

  return (
    <>
      <LabelButton
        disabled={isFinished}
        buttonLabel={!isFinished ? (claimed ? 'Claimed' : 'Claim') : 'Buy with BNB'}
        label="Your contribution (BNB)"
        value={
          // eslint-disable-next-line no-nested-ternary
          contributedAmount?.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0'
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished
          ? `You'll get tokens when you claim`
          : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default LaunchpadContribute
