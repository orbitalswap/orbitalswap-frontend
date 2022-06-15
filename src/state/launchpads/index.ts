
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AppState } from 'state'
import { launchpadsConfig } from 'config/constants'
import { SerializedLaunchpad, SerializedLaunchpadsState } from 'state/types'
import { resetUserState } from 'state/global/actions'
import fetchLaunchpads from './fetchLaunchpads'
import {
  fetchLaunchpadUserContributedAmounts,
  fetchLaunchpadUserTokenAllowances,
  fetchLaunchpadUserTokenBalances,
} from './fetchLaunchpadUser'

const noAccountLaunchpadConfig = launchpadsConfig.map((launchpad) => ({
  ...launchpad,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    contributedAmount: '0',
    earnings: '0',
    claimed: false,
  },
}))

const initialState: SerializedLaunchpadsState = {
  data: noAccountLaunchpadConfig,
  userDataLoaded: false,
}

// Async thunks
export const fetchLaunchpadsPublicDataAsync = createAsyncThunk<
  SerializedLaunchpad[],
  number[],
  {
    state: AppState
  }
>('launchpads/fetchLaunchpadsPublicDataAsync', async (pids) => {
  const launchpadsToFetch = launchpadsConfig.filter((launchpadConfig) => pids.includes(launchpadConfig.id))
  const launchpads = await fetchLaunchpads(launchpadsToFetch)
  return launchpads
})

export const fetchLaunchpadUserDataAsync = (account: string, pids) => async (dispatch) => {
  const launchpadsToFetch = launchpadsConfig.filter((launchpadConfig) => pids.includes(launchpadConfig.id))
  const userLaunchpadAllowances = await fetchLaunchpadUserTokenAllowances(account, launchpadsToFetch)
  const userLaunchpadTokenBalances = await fetchLaunchpadUserTokenBalances(account, launchpadsToFetch)
  const userLaunchpadContributedAmounts = await fetchLaunchpadUserContributedAmounts(account, launchpadsToFetch)

  const data = launchpadsConfig.map((launchpadConfig) => ({
    id: launchpadConfig.id,
    userData: {
      allowance: userLaunchpadAllowances[launchpadConfig.id],
      tokenBalance: userLaunchpadTokenBalances[launchpadConfig.id],
      contributedAmount: userLaunchpadContributedAmounts[launchpadConfig.id].amount,
      claimed: userLaunchpadContributedAmounts[launchpadConfig.id].claimed,
    },
  }))

  dispatch(setLaunchpadsUserData(data))
}

export const launchpadsSlice = createSlice({
  name: 'Launchpads',
  initialState,
  reducers: {
    setLaunchpadsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((launchpad) => {
        const userLaunchpadData = userData.find((entry) => entry.id === launchpad.id)
        return { ...launchpad, userData: { ...launchpad.userData, ...userLaunchpadData} }
      })
      state.userDataLoaded = true
    },
    setLaunchpadUserData: (state, action) => {
      const { id } = action.payload

      const launchpadIndex = state.data.findIndex((launchpad) => launchpad.id === id)
      state.data[launchpadIndex].userData = {
        ...state.data[launchpadIndex]?.userData,
        ...action.payload.userData,
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.data = state.data.map((launchpad) => {
        return {
          ...launchpad,
          userData: {
            allowance: '0',
            tokenBalance: '0',
            contributedAmount: '0',
            earnings: '0',
            claimed: false,
          },
        }
      })
      state.userDataLoaded = false
    })
    // Update farms with live data
    builder.addCase(fetchLaunchpadsPublicDataAsync.fulfilled, (state, action) => {
      const launchpadPayload = action.payload
      state.data = state.data.map((launchpad) => {
        const liveLaunchpadData = launchpadPayload.find((launchpadData) => launchpadData.id === launchpad.id)
        return { ...launchpad, ...liveLaunchpadData }
      })
    })
  },
})

export const { setLaunchpadUserData, setLaunchpadsUserData } = launchpadsSlice.actions
export default launchpadsSlice.reducer
