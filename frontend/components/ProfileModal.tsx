import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Modal from "./Modal";
function ProfileModalHelper({
  showProfileModal,
  setShowProfileModal,
}: {
  showProfileModal: boolean;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      showModal={showProfileModal}
      setShowModal={setShowProfileModal}
    >
      <div className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h3 className="text-lg font-medium">Profile</h3>
        </div>
        <div  className="flex flex-col px-6 pb-8 space-y-2 text-lg text-left">
          <Link href={'/account/paymaster'}>
            <div className="w-full bg-[#222] p-3 rounded-xl">
              Paymaster
            </div>
          </Link>
          
          <Link href={'/account/session'}>
            <div className="w-full bg-[#222] p-3 rounded-xl">
              Session
            </div>
          </Link>
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
    [setShowProfileModal, ProfileModal],
  );
}
