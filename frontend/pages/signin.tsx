import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import Link from "next/link";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";
import { useLoadingModal } from "../components/LoadingModal";
import { isForOfStatement } from "typescript";

export default function SignIn() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { wAddress, signIn } = useWebAuthn();
  const { LoadingModal, setShowLoadingModal } = useLoadingModal();
  console.log(wAddress);
  useEffect(() => {
    try {
      if (isConnected) {
        router.replace("/");
      } else if (wAddress) {
        setShowLoadingModal(false);
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  }, [isConnected, router, wAddress, setShowLoadingModal]);

  const bioLogin = async () => {
    try {
      setShowLoadingModal(true);
      await signIn();
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Meta />
      <LoadingModal />
      <div
        className="w-full min-h-screen  text-white"
        style={{
          background:
            "linear-gradient(180deg, #0d053d 0%, rgba(13, 5, 61, 0) 51.76%)",
        }}
      >
        <div className="flex w-full mx-auto max-w-7xl">
          <div className="flex flex-col items-center w-full mt-40">
            <div className="text-2xl font-bold">Let&apos;s Plug In!</div>
            <div className="flex flex-col w-full max-w-sm gap-4 mt-12 text-lg">
              <button
                className="bg-[#222] p-4 flex w-full rounded-md"
                onClick={() => connect()}
              >
                Connect Wallet
              </button>
              <button
                className="bg-[#222] p-4 flex w-full rounded-md"
                onClick={bioLogin}
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
