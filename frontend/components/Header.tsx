import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useProfileModal } from "./ProfileModal";
import { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";

export interface HeaderProps {
  account?: string;
  project?: string;
}

const Header = ({ account, project }: HeaderProps) => {
  const router = useRouter();
  const { setShowProfileModal, ProfileModal } = useProfileModal();
  const { address } = useAccount();
  const { wAddress } = useWebAuthn();
  const [accountAddress, setAccountAddress] = useState(`0x${String}`);

  useEffect(() => {
    if (address) {
      setAccountAddress(address || "");
    } else if (wAddress) {
      setAccountAddress(wAddress || "");
    }
  }, [address, wAddress]);

  return (
    <div className="flex flex-col w-full bg-[#222]">
      <ProfileModal />
      <div className="flex flex-row items-center justify-between w-full p-3 px-10 mx-auto">
        <div className="flex flex-row items-center cursor-pointer">
          <Link href={"/"} passHref>
            <Image
              src={"/static/assets/logo.svg"}
              alt="logo"
              width="26"
              height="26"
            />
          </Link>
        </div>

        <div
          className="flex items-center p-2 pr-3 font-mono text-lg bg-[#111] rounded-full cursor-pointer"
          onClick={() => setShowProfileModal(true)}
        >
          <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full">
            <Image src={"/static/assets/profile.png"} alt="logo" fill />
          </div>
          {truncateEthAddress(accountAddress)}
        </div>
      </div>
    </div>
  );
};
export default Header;
