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

function InputModalHelper({
  showInputModal,
  setShowInputModal,
}: {
  showInputModal: boolean;
  setShowInputModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { time, setTime } = useContext(TimerContext);
  const [inputValue, setInputValue] = useState(0);
  const handleConfirm = async () => {
    // @ts-ignore
    setTime(inputValue);
    setShowInputModal(false);
  };
  useEffect(() => {
    if (time == 0) {
      setShowInputModal(true);
    }
  }, [time, setShowInputModal]);
  return (
    <Modal showModal={showInputModal} setShowModal={setShowInputModal}>
      <Wrap className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-4 py-4 pt-8 sm:px-16">
          <h2 className="text-lg font-medium">Session Time</h2>
        </div>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
          <input
            type="number"
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

export function useInputModal() {
  const [showInputModal, setShowInputModal] = useState(false);

  const InputModal = useCallback(() => {
    return (
      <InputModalHelper
        showInputModal={showInputModal}
        setShowInputModal={setShowInputModal}
      />
    );
  }, [showInputModal, setShowInputModal]);

  return useMemo(
    () => ({ setShowInputModal, InputModal }),
    [setShowInputModal, InputModal]
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
    padding: 7px;
    border-radius: 5px;
  }
`;

const Confirm = styled.div`
  border: 1px solid;
  margin: 10px 10px;
`;
