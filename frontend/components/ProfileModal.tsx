import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Modal from "./Modal";
import { useAccount, useDisconnect } from "wagmi";
import { useWebAuthn } from "../lib/webauthn/WebAuthnContext";

function ProfileModalHelper({
  showProfileModal,
  setShowProfileModal,
}: {
  showProfileModal: boolean;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { wAddress, signOut } = useWebAuthn();

  const handleLogout = async () => {
    if (isConnected) {
      disconnect();
    } else if (wAddress) {
      signOut();
    }
  };
  return (
    <Modal showModal={showProfileModal} setShowModal={setShowProfileModal}>
      <div className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h3 className="text-lg font-medium">Profile</h3>
        </div>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
          <Link href={"/account/paymaster"}>
            <div className="w-full bg-[#222] p-3 rounded-xl hover:bg-indigo-600">
              Paymaster
            </div>
          </Link>

          <Link href={"/account/session"}>
            <div className="w-full bg-[#222] p-3 rounded-xl hover:bg-indigo-600">
              Session
            </div>
          </Link>

          <Link href={"/account/guardian"}>
            <div className="w-full bg-[#222] p-3 rounded-xl hover:bg-indigo-600">
              Guardian
            </div>
          </Link>

          <div
            className="p-2 px-4 mx-auto text-sm text-center hover:text-white text-[#888] cursor-pointer rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function useProfileModal() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const ProfileModal = useCallback(() => {
    return (
      <ProfileModalHelper
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
      />
    );
  }, [showProfileModal, setShowProfileModal]);

  return useMemo(
    () => ({ setShowProfileModal, ProfileModal }),
    [setShowProfileModal, ProfileModal]
  );
}
