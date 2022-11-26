import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import styled from "styled-components";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../../components/Layout";
import Timer from "../../components/Timer";
import Toggle from "../../components/Toggle";
import { useWebAuthn } from "../../lib/webauthn/WebAuthnContext";
import { truncateEthAddress } from "../../utils";
import { TimerContext } from "../_app";

const paymasterOptions = [
  {
    name: "Dino",
    address: "0x2198378B73dD7D7BC08d1B9837d374d895186207",
    function: "UpdateScore",
    balance: 5.23,
    isAvailable: true,
  },
  {
    name: "Flappy bird",
    address: "0x3198378B73dD7D7BC08d1B9837d374d895186207",
    function: "UpdateScore2",
    balance: 5.23,
    isAvailalbe: false,
  },
];

export default function Session() {
  const { address, isConnected } = useAccount();
  const { time } = useContext(TimerContext);
  const router = useRouter();
  const { wAddress } = useWebAuthn();

  useEffect(() => {
    if (!isConnected && !wAddress) {
      router.replace("/signin");
    }
  }, [isConnected, wAddress, router]);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full mt-16">
        <div className="text-2xl">Sessions</div>
        <div className="max-w-md mt-2 text-sm text-center text-[#888]">
          Which paymaster will pay for my gas fee?
        </div>
        <div className="w-full max-w-xl mt-8">
          {paymasterOptions.map((m, idx) => (
            <div className={`mt-4 bg-[#222] rounded-lg`} key={idx}>
              <div className="font-mono text-sm bg-[#333] px-4 p-3 flex justify-between flex-row">
                <div>{m.name}</div>

                <div>
                  <Toggle />
                </div>
              </div>
              {time && m.name === "Dino" && <Timer type="mypage" time={time} />}
              <div className="p-4 bg-[#111]">
                <div className="text-[#666]">
                  You have authorized the app to make the following actions on
                  your behalf:
                </div>

                <div className="flex flex-col items-start justify-between mt-4">
                  <div className="flex flex-row items-center">
                    <span className="text-[#777] mr-2">Contract: </span>
                    <span>{truncateEthAddress(m.address)}</span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="text-[#777] mr-2">Function: </span>
                    <span>{m.function}</span>
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
const LeftTime = styled.div`
  padding: 10px;
`;
