import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  LaunchpadIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t'], isDark: boolean, languageCode?: string) => ConfigMenuItemsType[] = (
  t,
  isDark,
  languageCode,
) => [
  {
    label: 'Launchpads',
    href: '/launchpads',
    icon: LaunchpadIcon,
    showItemsOnMobile: false,
    items: []
  },
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('Win'),
    href: '/lottery',
    icon: TrophyIcon,
    fillIcon: TrophyFillIcon,
    items: [
      // {
      //   label: t('Trading Competition'),
      //   href: '/competition',
      //   hideSubNav: true,
      // },
      // {
      //   label: t('Prediction'),
      //   href: '/prediction',
      // },
      {
        label: t('Lottery'),
        href: '/lottery',
      },
    ],
  },
  {
    label: '',
    href: '/info',
    icon: MoreIcon,
    hideSubNav: true,
    items: [
      {
        label: t('Info'),
        href: '/info',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      // {
      //   label: t('Blog'),
      //   href: 'https://medium.com/orbitalswap',
      //   type: DropdownMenuItemType.EXTERNAL_LINK,
      // },
      // {
      //   label: t('Voting'),
      //   href: '/voting',
      // },
      {
        label: t('Docs'),
        href: 'https://docs.tytan.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
