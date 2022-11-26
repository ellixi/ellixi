import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useWebAuthn } from "../../src/ellixi/webauthn/WebAuthnContext";

export default function Session() {
  // const { address, isConnected } = useAccount();
  // const { disconnect } = useDisconnect();
  const { address } = useWebAuthn();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.replace("/");
    }
  }, [address, router]);

  return (
    <>
      <div className="flex flex-col items-center w-full mt-40">
        <div className="text-2xl">Session</div>
        {/* <div className='flex flex-col w-full max-w-sm gap-4 mt-12 text-lg'>
        Connected to {address}
      <button onClick={() => disconnect()}>Disconnect</button>


        </div> */}
      </div>
    </>
  );
}
