import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
  Blocto = "blocto",
  WalletLink = "walletlink",
  CDCDefiWallet = "Crypto.com DeFi Wallet",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorNames;
  priority: number;
  mobileOnly?: boolean;
  href?: string;
}
