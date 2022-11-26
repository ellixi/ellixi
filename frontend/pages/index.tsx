import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Signer } from "ethers";
import styled from "styled-components";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useProvider,
  useSigner,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../components/Layout";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";
import { truncateEthAddress, truncateEthBalance } from "../utils";
import { SCWProvider } from "@cupcakes-sdk/scw";

export default function Home() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { wAddress } = useWebAuthn();
  const provider = useProvider();
  // const [balance, sestBalance] = useState("");
  const [render, setRender] = useState(false);
  // const [address, setAddress] = useState<string>('')

  // const { data: signer } = useSigner()
  const signer: Signer = new ethers.Wallet(
    "f6898e1d168259732f665c00a19b35ca977f12655edd9e4a7b4744fc2bc770a1"
  );
  const [scwAddress, setScwAddress] = useState<string>("");
  const [scwProvider, setSCWProvider] = useState<SCWProvider | null>(null);
  console.log(scwAddress);
  useEffect(() => {
    console.log(isConnected, signer);
    const getSCWProvider = async () => {
      if (!loaded && signer != null) {
        console.log(isConnected, signer);
        const newScwProvider: SCWProvider = await SCWProvider.getSCWForOwner(
          provider,
          signer
        );
        console.log(newScwProvider.getSigner());
        setSCWProvider(newScwProvider);
        setLoaded(true);
      }
    };
    getSCWProvider();
  }, [signer]);

  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [deployed, setDeployed] = useState<boolean>(true);
  useEffect(() => {
    const getTableDetails = async (): Promise<void> => {
      if (scwProvider) {
        const owner = scwProvider.getSCWOwner();
        const scwSigner = scwProvider.getSigner();
        const scwAddress = await scwSigner.getAddress();
        const address = await owner.getAddress();
        // const greeter = new ethers.Contract(GREETER_ADDR, GreeterArtifact.abi, scwSigner)
        const feedData = await scwProvider.getFeeData();
        const gasPrice = feedData.maxFeePerGas?.mul(2); // take gas price deviations in mind

        setLoading(false);
        // const estimate = await greeter.estimateGas.addGreet()

        // setAddress(address)
        setScwAddress(scwAddress);
        const balance = await scwSigner.getBalance();
        const deployed = await scwProvider.isSCWDeployed();

        setBalance(balance);
        setDeployed(deployed);
        // setMinFundsEstimate(estimate.mul(gasPrice ?? 1).add(ethers.utils.parseEther('0.0001')))

        // setLoading(false)
      }
    };

    if (scwProvider != null) {
      getTableDetails().catch((e: Error) => console.log(e));
    }
  }, [scwProvider]);

  useEffect(() => {
    setRender(true);
  }, []);

  // const getBalance = useCallback(async () => {
  //   const result = await provider.getBalance(
  //     String(isConnected ? address : wAddress)
  //   );
  //   sestBalance(ethers.utils.formatEther(result));
  // }, [address, isConnected, provider, wAddress]);

  // useEffect(() => {
  //   try {
  //     getBalance();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [getBalance]);

  useEffect(() => {
    try {
      if (!isConnected && !wAddress) {
        router.replace("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  }, [isConnected, wAddress, router]);

  return (
    <Layout>
      <Wrap className="flex flex-col items-center w-full pt-16">
        {render && (
          <div className="w-full max-w-lg ">
            <Link href={`https://goerli.etherscan.io/address/${scwAddress}`}>
              <div className="p-6 mt-4 bg-[#222] rounded-lg">
                <div className="font-bold text-m ">In-App User Account</div>
                <div className="flex flex-row items-center justify-between mt-6">
                  <div className="flex flex-row items-center">
                    <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full">
                      <Image
                        src={"/static/assets/profile.png"}
                        alt="logo"
                        fill
                      />
                    </div>
                    {loading ? "loading..." : truncateEthAddress(scwAddress)}
                    {/* {truncateEthAddress(String(isConnected ? address : wAddress))} */}
                    {deployed ? (
                      <span className="flex p-1 px-2 ml-4 text-xs bg-green-800 rounded-xl">
                        Deployed
                      </span>
                    ) : (
                      <span className="flex p-1 px-2 ml-4 text-xs bg-red-800 rounded-xl">
                        Undeployed
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col h-full">
                    {/* <div>
                  Stats: 523
                </div> */}
                    <div>
                      <>
                        <span className="text-[#777]">Balance: </span>{" "}
                        {loading
                          ? "loading..."
                          : `${(+utils.formatEther(balance)).toFixed(4)} ETH`}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/game/dino">
              <div className="relative mt-8 overflow-hidden cursor-pointer group">
                <div className="relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-indigo-600">
                  <Image
                    src={"/static/assets/dinogame.jpeg"}
                    fill
                    alt="game1"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-3 font-bold bg-black rounded-bl-lg group-hover:bg-indigo-600 text-md text-mono opacity-80 rounded-tr-xl">
                  Dino Game
                </div>
              </div>
            </Link>

            <Link href="/game/flappybird">
              <div className="relative mt-8 overflow-hidden cursor-pointer group">
                <div className="relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-indigo-600">
                  <Image
                    src={"/static/assets/flappybird.jpeg"}
                    fill
                    alt="game1"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-indigo-600 text-md text-mono opacity-80 rounded-tr-xl">
                  Flappy bird
                </div>
              </div>
            </Link>
            <Link href="/game/tetris">
              <div className="relative mt-8 overflow-hidden cursor-pointer group">
                <div className="relative w-full h-40 overflow-hidden text-black border border-black rounded-lg group-hover:border-indigo-600">
                  <Image
                    src={"/static/assets/tetris.jpeg"}
                    fill
                    alt="game1"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-3 bg-black rounded-bl-lg group-hover:bg-indigo-600 text-md text-mono opacity-80 rounded-tr-xl">
                  Tetris
                </div>
              </div>
            </Link>
          </div>
        )}
      </Wrap>
    </Layout>
  );
}

const Wrap = styled.div`
  padding-bottom: 50px;
  background: linear-gradient(180deg, #0d053d 0%, rgba(13, 5, 61, 0) 51.76%);
`;
