import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WebAuthnProvider } from "../lib/webauthn/WebAuthnContext";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Timer from "../components/Timer";
import styled from "styled-components";
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
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

interface ITimerContext {
  time?: number;
  setTime?: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<ITimerContext>({});

export default function App({ Component, pageProps }: AppProps) {
  const [time, setTime] = useState<number>(0);
  const value: ITimerContext = {
    time,
    setTime,
  };
  return (
    <WagmiConfig client={client}>
      <WebAuthnProvider>
        <TimerContext.Provider value={value}>
          <Component {...pageProps} />
        </TimerContext.Provider>
      </WebAuthnProvider>
    </WagmiConfig>
  );
}
