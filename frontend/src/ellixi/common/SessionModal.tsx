import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Modal from "./Modal";
import { useDisconnect } from "wagmi";

function SessionModalHelper({
  showSessionModal,
  setShowSessionModal,
}: {
  showSessionModal: boolean;
  setShowSessionModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { disconnect } = useDisconnect();

  return (
    <Modal showModal={showSessionModal} setShowModal={setShowSessionModal}>
      <div className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h3 className="text-lg font-medium">Session</h3>
        </div>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
          <Link href={"/account/paymaster"}>
            <div className="w-full bg-[#222] p-3 rounded-xl">Paymaster</div>
          </Link>

          <Link href={"/account/session"}>
            <div className="w-full bg-[#222] p-3 rounded-xl">Session</div>
          </Link>

          <div
            className="p-2 px-4 mx-auto text-sm text-center hover:text-white text-[#888] cursor-pointer rounded-xl"
            onClick={() => disconnect()}
          >
            Logout
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function useSessionModal() {
  const [showSessionModal, setShowSessionModal] = useState(false);

  const SessionModal = useCallback(() => {
    return (
      <SessionModalHelper
        showSessionModal={showSessionModal}
        setShowSessionModal={setShowSessionModal}
      />
    );
  }, [showSessionModal, setShowSessionModal]);

  return useMemo(
    () => ({ setShowSessionModal, SessionModal }),
    [setShowSessionModal, SessionModal]
  );
}
