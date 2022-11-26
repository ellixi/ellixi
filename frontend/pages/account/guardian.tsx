import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Layout from "../../components/Layout";
import { useWebAuthn } from "../../lib/webauthn/WebAuthnContext";
import { truncateEthAddress } from "../../utils";
import { BsFillPlusCircleFill } from "@react-icons/all-files/bs/BsFillPlusCircleFill";
import styled from "styled-components";
import { useGuaudianModal } from "../../components/GuaudianModal";
export type guardianType = {
  name: string;
  address: string;
};
export default function Paymster() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedPaymaster, setSelectedPaymaster] = useState(0);
  const router = useRouter();
  const { wAddress } = useWebAuthn();
  const [guardian, setGuardian] = useState<guardianType[]>([
    {
      name: "Guardian 1",
      address: "0x2198378B73dD7D7BC08d1B9837d374d895186207",
    },
    {
      name: "Guardian 2",
      address: "0x3198378B73dD7D7BC08d1B9837d374d895186207",
    },
  ]);
  const { GuaudianModal, setShowGuaudianModal } = useGuaudianModal({
    setGuardian,
    guardian,
  });

  useEffect(() => {
    if (!isConnected && !wAddress) {
      router.replace("/signin");
    }
  }, [isConnected, wAddress, router]);

  return (
    <Layout>
      <GuaudianModal />
      <div className="flex flex-col items-center w-full mt-16">
        <div className="text-2xl font-bold">Guardians</div>
        <div className="max-w-md mt-2 text-sm text-center text-[#888]">
          Register guardians
        </div>
        <div className="w-full max-w-lg ">
          {guardian.map((m, idx) => (
            <div
              className={`p-4 mt-4  bg-[#222] hover:bg-[#333] 
               rounded-lg cursor-pointer`}
              key={idx}
            >
              <div className="font-mono text-sm">{m.name}</div>

              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center">
                  {truncateEthAddress(m.address)}
                </div>
              </div>
            </div>
          ))}
          <Plus
            className={`p-4 mt-4 bg-[#222] hover:bg-[#333] rounded-lg cursor-pointer`}
            onClick={() => setShowGuaudianModal(true)}
          >
            <BsFillPlusCircleFill className="icon" />
          </Plus>
        </div>
      </div>
    </Layout>
  );
}

const Plus = styled.div`
  display: flex;
  justify-content: center;
  .icon {
    width: 24px;
    height: 24px;
  }
`;
