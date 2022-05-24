import { SubMenuItems } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import { launchpadsConfig } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import LaunchpadPage from './components/LaunchpadPage'


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeLaunchpad = launchpadsConfig.find((launchpad) => launchpad.isActive)

const Launchpad = () => {
  
  const { t } = useTranslation()
  const router = useRouter()
  const isExact = router.route === '/launchpads'
  const launchpadAddress = router.query.launchpadAddress as string
  
  return (
    <>
      <PageMeta />
      {/* <SubMenuItems
          items={[
            {
              label: t('All launchpads'),
              href: '/launchpads',
            },
            {
              label: t('My Contributions'),
              href: `/launchpads/${launchpadAddress}`,
            },
          ]}
          activeItem={isExact ? '/launchpads' : '/launchpads/history'}
        /> */}
      <LaunchpadPage ifo={activeLaunchpad} />
    </>
  )
}
// `${nftsBaseUrl}/collections/${collectionAddress}`,
export default Launchpad
