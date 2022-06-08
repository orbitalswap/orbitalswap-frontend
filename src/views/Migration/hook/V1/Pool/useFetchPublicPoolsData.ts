import { useAppDispatch } from 'state'
import farmsConfig from 'config/constants/farms'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { fetchFarmsPublicDataAsync } from 'state/farmsV1/index'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()

  useSlowRefreshEffect(() => {
    const fetchPoolsDataWithFarms = async () => {
      const activeFarms = farmsConfig.filter((farm) => farm.v1pid !== 0 && farm.chainId === chainId)
      await dispatch(fetchFarmsPublicDataAsync({chainId, pids: activeFarms.map((farm) => farm.v1pid)}))
    }

    fetchPoolsDataWithFarms()
  })
}
