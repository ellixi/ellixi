import "../styles/globals.css";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WebAuthnProvider } from "../src/ellixi/webauthn/WebAuthnContext";
import dynamic from "next/dynamic";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({
      apiKey: "365CCKjGyvAOAP-gN7iqtqdgnC4nAp_n",
    }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: "wagmi",
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     qrcode: true,
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
});
const Layout = dynamic(() => import("../src/ellixi/common/Layout"), {
  ssr: false,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      {typeof window !== undefined && (
        <WebAuthnProvider>
          <AppBarWrap>
            <Layout />
          </AppBarWrap>
          <ComponentWrap>
            <Component {...pageProps} />
          </ComponentWrap>
        </WebAuthnProvider>
      )}
    </WagmiConfig>
  );
}

const AppBarWrap = styled.div`
  position: relative;
  z-index: 15;
`;

const ComponentWrap = styled.div`
  position: relative;
  top: -80px;
`;
