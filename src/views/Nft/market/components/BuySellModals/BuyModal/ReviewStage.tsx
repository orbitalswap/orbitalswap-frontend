import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Flex, Text, Button, ButtonMenu, ButtonMenuItem, Message, Link } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { NftToken } from 'state/nftMarket/types'
import { getBscScanLinkForNft } from 'utils'
import { FetchStatus } from 'config/constants/types'
import { Divider, RoundedImage } from '../shared/styles'
import { BorderedBox, BnbAmountCell } from './styles'
import { PaymentCurrency } from './types'

interface ReviewStageProps {
  nftToBuy: NftToken
  paymentCurrency: PaymentCurrency
  setPaymentCurrency: (index: number) => void
  nftPrice: number
  walletBalance: number
  walletFetchStatus: FetchStatus
  notEnoughBnbForPurchase: boolean
  continueToNextStage: () => void
}

const ReviewStage: React.FC<ReviewStageProps> = ({
  nftToBuy,
  paymentCurrency,
  setPaymentCurrency,
  nftPrice,
  walletBalance,
  walletFetchStatus,
  notEnoughBnbForPurchase,
  continueToNextStage,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  return (
    <>
      <Flex px="24px" pt="24px" flexDirection="column">
        <Flex>
          <RoundedImage src={nftToBuy.image.thumbnail} height={68} width={68} mr="16px" />
          <Flex flexDirection="column" justifyContent="space-evenly">
            <Text color="textSubtle" fontSize="12px">
              {nftToBuy?.collectionName}
            </Text>
            <Text bold>{nftToBuy.name}</Text>
            <Flex alignItems="center">
              <Text fontSize="12px" color="textSubtle" p="0px" height="16px" mr="4px">
                {t('Token ID:')}
              </Text>
              <Button
                as={Link}
                scale="xs"
                px="0px"
                pt="2px"
                external
                variant="text"
                href={getBscScanLinkForNft(nftToBuy.collectionAddress, nftToBuy.tokenId)}
              >
                {nftToBuy.tokenId}
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <BorderedBox>
          <Text small color="textSubtle">
            {t('Pay with')}
          </Text>
          <ButtonMenu
            activeIndex={paymentCurrency}
            onItemClick={(index) => setPaymentCurrency(index)}
            scale="sm"
            variant="subtle"
          >
            <ButtonMenuItem>CRO</ButtonMenuItem>
            <ButtonMenuItem>WCRO</ButtonMenuItem>
          </ButtonMenu>
          <Text small color="textSubtle">
            {t('Total payment')}
          </Text>
          <BnbAmountCell bnbAmount={nftPrice} />
          <Text small color="textSubtle">
            {t('%symbol% in wallet', { symbol: paymentCurrency === PaymentCurrency.CRO ? 'CRO' : 'WCRO' })}
          </Text>
          {!account ? (
            <Flex justifySelf="flex-end">
              <ConnectWalletButton scale="sm" />
            </Flex>
          ) : (
            <BnbAmountCell
              bnbAmount={walletBalance}
              isLoading={walletFetchStatus !== FetchStatus.Fetched}
              isInsufficient={walletFetchStatus === FetchStatus.Fetched && notEnoughBnbForPurchase}
            />
          )}
        </BorderedBox>
        {walletFetchStatus === FetchStatus.Fetched && notEnoughBnbForPurchase && (
          <Message p="8px" variant="danger">
            <Text>
              {t('Not enough %symbol% to purchase this NFT', {
                symbol: paymentCurrency === PaymentCurrency.CRO ? 'CRO' : 'WCRO',
              })}
            </Text>
          </Message>
        )}
        <Flex alignItems="center">
          <Text my="16px" mr="4px">
            {t('Convert between CRO and WCRO for free')}:
          </Text>
          <Button
            as={Link}
            p="0px"
            height="16px"
            external
            variant="text"
            href="/swap?inputCurrency=CRO&outputCurrency=0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"
          >
            {t('Convert')}
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex px="24px" pb="24px" flexDirection="column">
        <Button
          onClick={continueToNextStage}
          disabled={walletFetchStatus !== FetchStatus.Fetched || notEnoughBnbForPurchase}
          mb="8px"
        >
          {t('Checkout')}
        </Button>
        <Button as={Link} external style={{ width: '100%' }} href="/swap?outputCurrency=CRO" variant="secondary">
          {t('Get %symbol1% or %symbol2%', { symbol1: 'CRO', symbol2: 'WCRO' })}
        </Button>
      </Flex>
    </>
  )
}

export default ReviewStage
