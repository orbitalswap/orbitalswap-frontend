import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'


import { Launchpad, PresaleStatus } from 'config/constants/types'
// PoolCharacteristics retrieved from the contract
export interface PublicLaunchpadData extends Launchpad {
  isLoading: boolean
  startDateNum: number
  endDateNum: number
  liquidityPercent: BigNumber
  hardcap: BigNumber
  softcap: BigNumber
  presalePrice: BigNumber
  minPerTx: BigNumber
  maxPerUser: BigNumber
  totalSold: BigNumber
  presaleStatus: number
}

export interface UserLaunchpadData {
  contributedAmount: BigNumber
  claimed: boolean
}
