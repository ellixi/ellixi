import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { WebAuthnProvider } from "../lib/webauthn/WebAuthnContext";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <WebAuthnProvider>
        <Component {...pageProps} />
      </WebAuthnProvider>
    </WagmiConfig>
  );
}
