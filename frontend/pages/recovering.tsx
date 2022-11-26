import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Meta from "../components/Meta";
import Link from "next/link";
import { truncateEthAddress } from "../utils/index";
import { BiArrowBack } from "@react-icons/all-files/bi/BiArrowBack";
import styled from "styled-components";
export default function Recover() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  return (
    <div>
      <Meta />
      <div className="w-full min-h-screen bg-[#111] text-white">
        <Back onClick={() => router.replace("/")}>
          <BiArrowBack className="logo" />
        </Back>
        <div className="flex w-full mx-auto max-w-7xl">
          <div className="flex flex-col items-center w-full mt-40">
            <div className="text-2xl font-bold">Recovering your wallet</div>

            <div className="max-w-md mt-2 text-sm text-center text-[#888]">
              Your guradians are notified of the account recovery request.{" "}
              <br />
              The account will be reset once over 50% of your guardians sign the
              request.
            </div>
            <div className="flex flex-col w-full max-w-md gap-4 mt-12">
              {/* <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>Account Address</label>
                <input className='bg-[#333] p-3 text-sm' placeholder='0x2198378B73dD7D7BC08d1B9837d374d895186207' />
              </div>
              <hr className='w-full my-6 border border-[#333]' />
              <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>New Password</label>
                <input className='bg-[#333] p-3 text-sm' type='password' placeholder='*****' />
              </div>
              <div className='flex flex-col'>
                <label className='mb-1 ml-2 text-sm'>Confirm Password</label>
                <input className='bg-[#333] p-3 text-sm' type='password' placeholder='*****' />
              </div> */}
              <div className="flex flex-row justify-between">
                <div>
                  {truncateEthAddress(
                    "0x40B65Bf1114393F567a67e00b07AD947c36f61f5"
                  )}
                </div>
                <div className="text-blue-500">Pending...</div>
              </div>

              <div className="flex flex-row justify-between">
                <div>
                  {truncateEthAddress(
                    "0xa34daFcA8EDcB708bbDb722707b900C93196577D"
                  )}
                </div>
                <div className="text-blue-500">Pending...</div>
              </div>

              <div className="flex flex-row justify-between">
                <div>
                  {truncateEthAddress(
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                  )}
                </div>
                <div className="text-blue-500">Pending...</div>
              </div>

              <button className="flex justify-center w-full p-2 mt-2 text-center rounded-md text-[#444] bg-[#222]">
                Recover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Back = styled.div`
  padding: 20px 20px;
  .logo {
    width: 26px;
    height: 26px;
  }
`;
