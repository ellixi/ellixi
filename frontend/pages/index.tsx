import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount, useConnect, useDisconnect, useProvider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../components/Layout";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";
import { truncateEthAddress, truncateEthBalance } from "../utils";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { wAddress } = useWebAuthn();
  const provider = useProvider();
  const [balance, sestBalance] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const getBalance = useCallback(async () => {
    const result = await provider.getBalance(
      String(isConnected ? address : wAddress)
    );
    sestBalance(ethers.utils.formatEther(result));
  }, [address, isConnected, provider, wAddress]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    if (!isConnected && !wAddress) {
      router.replace("/signin");
    }
  }, [isConnected, wAddress, router]);

  return (
    <Layout>
      <Wrap className="flex flex-col items-center w-full pt-16">
        {/* <div className='text-2xl'>
          Available Games
        </div> */}
        {/* <div className='p-4 mt-4 bg-pink-400'>
          Profile
        </div> */}
        {render && (
          <div className="w-full max-w-lg ">
            <div className="p-4 mt-4 bg-[#222] rounded-lg">
              <div className="font-mono text-sm">In-App User Account</div>
              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center">
                  <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full">
                    <Image src={"/static/assets/profile.png"} alt="logo" fill />
                  </div>
                  {truncateEthAddress(String(isConnected ? address : wAddress))}
                  <span className="flex p-1 px-2 ml-4 text-xs bg-green-800 rounded-xl">
                    Deployed
                  </span>
                </div>
                <div className="flex flex-col h-full">
                  {/* <div>
                  Stats: 523
                </div> */}
                  <div>
                    <span className="text-[#777]">ETH Balance: </span>{" "}
                    {truncateEthBalance(balance)}
                  </div>
                </div>
              </div>
            </div>
            <Link href="/game/dino">
              <div className="relative mt-8 overflow-hidden cursor-pointer group">
                <div className="relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-yellow-600">
                  <Image
                    src={"/static/assets/dinogame.jpeg"}
                    fill
                    alt="game1"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-yellow-600 text-md text-mono opacity-80 rounded-tr-xl">
                  Dino Game
                </div>
              </div>
            </Link>

            <Link href="/game/flappybird">
              <div className="relative mt-8 overflow-hidden cursor-pointer group">
                <div className="relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-yellow-600">
                  <Image
                    src={"/static/assets/flappybird.jpeg"}
                    fill
                    alt="game1"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-yellow-600 text-md text-mono opacity-80 rounded-tr-xl">
                  Flappy bird
                </div>
              </div>
            </Link>
          </div>
        )}
        {/* <div className='flex flex-col w-full max-w-sm gap-4 mt-12 text-lg'>
        Connected to {address}
      <button onClick={() => disconnect()}>Disconnect</button>


              </div> */}
      </Wrap>
    </Layout>
  );
}

const Wrap = styled.div``;
