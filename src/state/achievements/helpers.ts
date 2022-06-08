import { request, gql } from 'graphql-request'
import { campaignMap } from 'config/constants/campaigns'
import { GRAPH_API_PROFILE } from 'config/constants/endpoints'
import { Achievement } from 'state/types'
import { getAchievementTitle, getAchievementDescription } from 'utils/achievements'
import { ChainId } from '@orbitalswap/sdk'

interface UserPointIncreaseEvent {
  campaignId: string
  id: string // wallet address
  points: string
}

/**
 * Gets all user point increase events on the profile filtered by wallet address
 */
export const getUserPointIncreaseEvents = async (
  account: string,
  chainId: ChainId,
): Promise<UserPointIncreaseEvent[]> => {
  if (!GRAPH_API_PROFILE[chainId]) return null

  try {
    const { user } = await request(
      GRAPH_API_PROFILE[chainId],
      gql`
        query getUserPointIncreaseEvents($account: ID!) {
          user(id: $account) {
            points {
              id
              campaignId
              points
            }
          }
        }
      `,
      {
        account: account.toLowerCase(),
      },
    )

    return user.points
  } catch (error) {
    return null
  }
}

/**
 * Gets all user point increase events and adds achievement meta
 */
export const getAchievements = async (account: string, chainId: ChainId): Promise<Achievement[]> => {
  const pointIncreaseEvents = await getUserPointIncreaseEvents(account, chainId)

  if (!pointIncreaseEvents) {
    return []
  }

  return pointIncreaseEvents.reduce((accum, userPoint) => {
    if (!campaignMap.has(userPoint.campaignId)) {
      return accum
    }

    const campaignMeta = campaignMap.get(userPoint.campaignId)

    return [
      ...accum,
      {
        id: userPoint.campaignId,
        type: campaignMeta.type,
        address: userPoint.id,
        title: getAchievementTitle(campaignMeta),
        description: getAchievementDescription(campaignMeta),
        badge: campaignMeta.badge,
        points: Number(userPoint.points),
      },
    ]
  }, [])
}
