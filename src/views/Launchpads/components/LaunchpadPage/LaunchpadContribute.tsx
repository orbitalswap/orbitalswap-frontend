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
  const { address, minPerTx, maxPerUser } = ifoPublicData
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

  const isFinished = status === 'ended'
  const percentOfUserContribution = contributedAmount.div(raisingAmount).times(100)

  return (
    <>
      <LabelButton
        disabled={pendingTx || (isFinished && claimed)}
        buttonLabel={isFinished ? (claimed ? 'Claimed' : 'Claim') : 'Contribute'}
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
