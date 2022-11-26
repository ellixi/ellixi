import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useProfileModal } from "./ProfileModal";
import { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";
import Timer from "./Timer";
import { FaCopy } from "@react-icons/all-files/fa/FaCopy";
import styled from "styled-components";

export interface HeaderProps {
  account?: string;
  project?: string;
}

const Header = ({ account, project }: HeaderProps) => {
  const router = useRouter();
  const { setShowProfileModal, ProfileModal } = useProfileModal();
  const { address, isConnected } = useAccount();
  const { wAddress } = useWebAuthn();
  const [accountAddress, setAccountAddress] = useState(`0x${String}`);
  const realAddress = isConnected ? address : wAddress;

  useEffect(() => {
    if (address) {
      setAccountAddress(address || "");
    } else if (wAddress) {
      setAccountAddress(wAddress || "");
    }
  }, [address, wAddress]);

  return (
    <div className="flex flex-col w-full bg-[#0D053D]">
      <ProfileModal />
      <div className="flex flex-row items-center justify-between w-full p-3 px-10 mx-auto">
        <div className="flex flex-row items-center cursor-pointer">
          <Link href={"/"} passHref>
            <Image
              src={"/static/assets/logo.svg"}
              alt="logo"
              width="80"
              height="80"
            />
          </Link>
        </div>
        <div className="flex items-center p-5 pr-3 font-mono text-lg bg-[#111] rounded-full cursor-pointer">
          <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full">
            <Image src={"/static/assets/profile.png"} alt="logo" fill />
          </div>
          {/* {truncateEthAddress(accountAddress)} */}
          0xb2cB•••3395
        </div>
      </div>
    </div>
  );
};
export default Header;

const Profile = styled.div`
  width: 260px;
  .icon {
    margin-left: 15px;
    padding-right: 5px;
    width: 22px;
    height: 22px;
  }
`;
