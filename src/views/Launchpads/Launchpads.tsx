
import { Flex, Grid, Heading, SubMenuItems} from '@pancakeswap/uikit'
import { launchpadsConfig } from 'config/constants'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageMeta } from 'components/Layout/Page'
import { getLaunchpads } from 'state/launchpads/helpers'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import PageHeader from 'components/PageHeader'
import PageSection from 'components/PageSection'
import { FetchStatus } from 'config/constants/types'
import PageLoader from 'components/Loader/PageLoader'
import LaunchpadCard from './components/LaunchpadCard'


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeLaunchpad = launchpadsConfig.find((launchpad) => launchpad.isActive)

const Launchpads = () => {
  
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { data, status} = useSWR('launhcpads', async ()=> getLaunchpads())
  const launchpadList = data? Object.values(data) : []

  const router = useRouter()
  const isExact = router.route === '/launchpads'
  
  return (
    <>
      <PageMeta />
      <SubMenuItems
          items={[
            {
              label: t('All launchpads'),
              href: '/launchpads',
            },
            {
              label: t('My Contributions'),
              href: '/launchpads/history',
            },
          ]}
          activeItem={isExact ? '/launchpads' : '/launchpads/history'}
        />
        <PageHeader>  
          <Heading scale="xl">{t('Current Presale')}</Heading>
        </PageHeader>
        {status !== FetchStatus.Fetched ? (
          <PageLoader />
        ):(
          <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={theme.colors.background}
          index={1}
          concaveDivider
          dividerPosition="top"
        >
          <Grid gridGap="16px" gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} mb="64px">
            {launchpadList.slice(0,6).map((launchpad)=> {
              return (
                <LaunchpadCard ifo={launchpad} />
              )
            })}
          </Grid>
        </PageSection>
        )}
    </>
  )
}
export default Launchpads
