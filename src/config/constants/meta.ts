import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'OrbitalSwap',
  description:
    'The Future of Defi, The Next Generation In Defi Tools and Trading',
  image: 'https://orbitalswap.com/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/launchpads')) {
    basePath = '/launchpads'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('OrbitalSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('OrbitalSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('OrbitalSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('OrbitalSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('OrbitalSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('OrbitalSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('OrbitalSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('OrbitalSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('OrbitalSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('OrbitalSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('OrbitalSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('OrbitalSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('OrbitalSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('OrbitalSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('OrbitalSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('OrbitalSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('OrbitalSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('OrbitalSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('OrbitalSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('OrbitalSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('OrbitalSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('OrbitalSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('OrbitalSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('OrbitalSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('OrbitalSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('OrbitalSwap')}`,
      }
    case '/launchpads':
      return {
        title: `${t('Presale Launchpad')} | ${t('OrbitalSwap')}`,
      }
    default:
      return null
  }
}
