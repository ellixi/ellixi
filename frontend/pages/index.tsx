import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../components/Layout";
import { truncateEthAddress } from "../utils";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/signin");
    }
  }, [isConnected]);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full mt-16">
        {/* <div className='text-2xl'>
          Available Games
        </div> */}
        {/* <div className='p-4 mt-4 bg-pink-400'>
          Profile
        </div> */}
        <div className="w-full max-w-lg ">
          <div className="p-4 mt-4 bg-[#222] rounded-lg">
            <div className="font-mono text-sm">In-App User Account</div>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-row items-center">
                <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full">
                  <Image src={"/static/assets/profile.png"} alt="logo" fill />
                </div>
                {truncateEthAddress(
                  "0x2198378B73dD7D7BC08d1B9837d374d895186207"
                )}
                <span className="flex p-1 px-2 ml-4 text-xs bg-green-800 rounded-xl">
                  Deployed
                </span>
              </div>
              <div className="flex flex-col h-full">
                {/* <div>
                  Stats: 523
                </div> */}
                <div>
                  <span className="text-[#777]">ETH Balance: </span> 0.04
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

          <Link href="/game/dino">
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
        {/* <div className='flex flex-col w-full max-w-sm gap-4 mt-12 text-lg'>
        Connected to {address}
      <button onClick={() => disconnect()}>Disconnect</button>


        </div> */}
      </div>
    </Layout>
  );
}
