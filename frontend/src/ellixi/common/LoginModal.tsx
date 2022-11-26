import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Modal from "./Modal";

function LoginModalHelper({
  showLoginModal,
  setShowLoginModal,
}: {
  showLoginModal: boolean;
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal showModal={showLoginModal} setShowModal={setShowLoginModal}>
      <div className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h3 className="text-lg font-medium">Login</h3>
        </div>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
          <Link href={"/account/session"}>
            <div
              className="w-full bg-[#222] p-3 rounded-xl"
              onClick={() => setShowLoginModal(false)}
            >
              WebAuthn
            </div>
          </Link>
          <Link href={"/recover"}>
            <div
              className="w-full bg-[#222] p-3 rounded-xl"
              onClick={() => setShowLoginModal(false)}
            >
              Recover
            </div>
          </Link>
          <div></div>
        </div>
      </div>
    </Modal>
  );
}

export function useLoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const LoginModal = useCallback(() => {
    return (
      <LoginModalHelper
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    );
  }, [showLoginModal, setShowLoginModal]);

  return useMemo(
    () => ({ setShowLoginModal, LoginModal }),
    [setShowLoginModal, LoginModal]
  );
}
