import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { TimerContext } from "../pages/_app";
import { guardianType } from "../pages/account/guardian";

function GuaudianModalHelper({
  showGuardianModal,
  setShowGuaudianModal,
  setGuardian,
  guardian,
}: {
  guardian: guardianType[];
  showGuardianModal: boolean;
  setShowGuaudianModal: Dispatch<SetStateAction<boolean>>;
  setGuardian: Dispatch<SetStateAction<guardianType[]>>;
}) {
  const [inputValue, setInputValue] = useState(
    "0xE976893Bf88F6CC81ae942cE9531fBebd8530D81"
  );

  const handleConfirm = () => {
    setGuardian((prev: any) => [
      ...prev,
      {
        name: "Guardian " + `${guardian.length + 1}`,
        address: inputValue,
      },
    ]);
    setShowGuaudianModal(false);
  };

  return (
    <Modal showModal={showGuardianModal} setShowModal={setShowGuaudianModal}>
      <Wrap className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h2 className="text-lg font-medium">Input guadian address</h2>
        </div>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
          <input
            onChange={(e: any) => setInputValue(e.target.value)}
            value={inputValue}
          ></input>
          <Confirm
            className="p-2 px-4 mx-auto text-sm text-center hover:text-white text-[#888] cursor-pointer rounded-xl"
            onClick={handleConfirm}
          >
            Confirm
          </Confirm>
        </div>
      </Wrap>
    </Modal>
  );
}

export function useGuaudianModal({
  setGuardian,
  guardian,
}: {
  setGuardian: Dispatch<SetStateAction<guardianType[]>>;
  guardian: guardianType[];
}) {
  const [showGuaudianModal, setShowGuaudianModal] = useState(false);

  const GuaudianModal = useCallback(() => {
    return (
      <GuaudianModalHelper
        setGuardian={setGuardian}
        showGuardianModal={showGuaudianModal}
        setShowGuaudianModal={setShowGuaudianModal}
        guardian={guardian}
      />
    );
  }, [showGuaudianModal, setShowGuaudianModal, setGuardian, guardian]);

  return useMemo(
    () => ({ setShowGuaudianModal, GuaudianModal, setGuardian }),
    [setShowGuaudianModal, GuaudianModal, setGuardian]
  );
}

const Wrap = styled.div`
  h2 {
    font-size: 24px;
  }
  input {
    width: 380px;
    margin: 20px auto 20px auto;
    color: black;
    padding: 8px 13px;
    border-radius: 5px;
    color: #3a3a3a77;
  }
`;

const Confirm = styled.div`
  border: 1px solid;
  margin: 10px 10px;
`;
