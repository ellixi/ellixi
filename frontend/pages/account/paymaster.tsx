import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../../components/Layout";
import { useWebAuthn } from "../../lib/webauthn/WebAuthnContext";
import { truncateEthAddress } from "../../utils";

const paymasterOptions = [
  {
    name: "Paymaster 1",
    address: "0x2198378B73dD7D7BC08d1B9837d374d895186207",
    balance: 5.23,
    isAvailable: true,
  },
  {
    name: "Paymaster 2",
    address: "0x3198378B73dD7D7BC08d1B9837d374d895186207",
    balance: 5.23,
    isAvailalbe: false,
  },
];

export default function Paymster() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedPaymaster, setSelectedPaymaster] = useState(0);
  const router = useRouter();
  const { wAddress } = useWebAuthn();

  useEffect(() => {
    if (!isConnected && !wAddress) {
      router.replace("/signin");
    }
  }, [isConnected, router, wAddress]);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full mt-16">
        <div className="text-2xl">Paymasters</div>
        <div className="max-w-md mt-2 text-sm text-center text-[#888]">
          Which paymaster will pay for my gas fee?
        </div>
        <div className="w-full max-w-lg ">
          {paymasterOptions.map((m, idx) => (
            <div
              className={`p-4 mt-4 ${
                selectedPaymaster === idx
                  ? "bg-blue-900"
                  : "bg-[#222] hover:bg-[#333] "
              } rounded-lg cursor-pointer`}
              key={idx}
              onClick={() => {
                setSelectedPaymaster(idx);
              }}
            >
              <div className="font-mono text-sm">
                {m.name}
                {selectedPaymaster === idx && (
                  <span className="ml-2 text-sm">(selected)</span>
                )}
              </div>

              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center">
                  {truncateEthAddress(m.address)}

                  <span
                    className={`flex p-1 px-2 ml-4 text-xs rounded-xl ${
                      m.isAvailable ? "bg-green-800" : "bg-red-800"
                    }`}
                  >
                    {m.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="flex flex-col h-full">
                  <div>
                    <span className="text-[#777]">ETH Balance: </span>{" "}
                    {m.balance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
