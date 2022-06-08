import { useState, useEffect } from 'react'
import { TC_MOBOX_SUBGRAPH } from 'config/constants/endpoints'
import request, { gql } from 'graphql-request'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useGetParticipants = (): string[] => {
  const { chainId } = useActiveWeb3React()
  const [participants, setParticipants] = useState<string[]>([])
  useEffect(() => {
    const getParticipants = async () => {
      if(!TC_MOBOX_SUBGRAPH[chainId]) {
        setParticipants([])
        return
      }
      
      try {
        const response = await request(
          TC_MOBOX_SUBGRAPH[chainId],
          gql`
            query getTradingCompetitionParticipants {
              storm: team(id: "1") {
                userCount
              }
              flippers: team(id: "2") {
                userCount
              }
              cakers: team(id: "3") {
                userCount
              }
            }
          `,
        )
        const storm = parseInt(response.storm.userCount, 10)
        const flippers = parseInt(response.flippers.userCount, 10)
        const cakers = parseInt(response.cakers.userCount, 10)
        const totalParticipants = storm + flippers + cakers
        setParticipants([
          storm.toLocaleString(),
          flippers.toLocaleString(),
          cakers.toLocaleString(),
          totalParticipants.toString(),
        ])
      } catch (error) {
        console.error('Failed to get participants data', error)
      }
    }
    if (participants.length === 0) {
      getParticipants()
    }
  }, [participants])
  return participants
}

export default useGetParticipants
