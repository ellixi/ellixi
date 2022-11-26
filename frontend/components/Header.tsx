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
import { AiFillCopy } from "@react-icons/all-files/ai/AiFillCopy";
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
        <Profile className="flex items-center p-3 pr-3 font-mono text-lg bg-[#111] rounded-full cursor-pointer">
          <div
            className="relative w-8 h-8 mr-3 overflow-hidden rounded-full"
            onClick={() => {
              setShowProfileModal(true);
            }}
          >
            <Image src={"/static/assets/profile.png"} alt="logo" fill />
          </div>
          {/* {truncateEthAddress(accountAddress)} */}
          <div
            onClick={() => {
              setShowProfileModal(true);
            }}
          >
            0xb2cB•••3395
          </div>
          <AiFillCopy
            className="icon"
            onClick={() =>
              navigator.clipboard.writeText(
                "0xb2cB02de0a16D2901bF3fFe72a0CFc14A21E3395"
              )
            }
          ></AiFillCopy>
        </Profile>
      </div>
    </div>
  );
};
export default Header;

const Profile = styled.div`
  width: 250px;
  .icon {
    margin-left: 15px;
    padding-right: 5px;
    width: 24px;
    height: 24px;
  }
`;
