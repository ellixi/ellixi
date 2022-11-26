import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import Link from "next/link";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";

export default function SignIn() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { wAddress, signIn } = useWebAuthn();
  console.log(wAddress);
  useEffect(() => {
    if (isConnected) {
      router.replace("/");
    } else if (wAddress) {
      router.replace("/");
    }
  }, [isConnected, router, wAddress]);

  const bidLogin = async () => {
    await signIn();
    router.replace("/");
  };

  return (
    <div>
      <Meta />
      <div className="w-full min-h-screen bg-[#111] text-white">
        <div className="flex w-full mx-auto max-w-7xl">
          <div className="flex flex-col items-center w-full mt-40">
            <div className="text-2xl">Let&apos;s Plug In!</div>
            <div className="flex flex-col w-full max-w-sm gap-4 mt-12 text-lg">
              <button
                className="bg-[#222] p-4 flex w-full rounded-md"
                onClick={() => connect()}
              >
                Connect Wallet
              </button>
              <button
                className="bg-[#222] p-4 flex w-full rounded-md"
                onClick={bidLogin}
              >
                Biometric
              </button>

              <Link href="/recover">
                <div className="p-2 px-4 mx-auto text-sm text-center hover:text-white text-[#888] cursor-pointer rounded-xl">
                  I lost my account
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
