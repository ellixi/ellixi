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
import { useSignMessage } from "wagmi";



function InputModalHelper({
  showInputModal,
  setShowInputModal,
}: {
  showInputModal: boolean;
  setShowInputModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Sign to generate a enw session',
  })
 
  const { time, setTime } = useContext(TimerContext);
  const handleConfirm = async () => {
    signMessage()
  };

  useEffect(()=>{
    if (isSuccess) {
        // @ts-ignore
      setTime(24 * 60 * 60);
      setShowInputModal(false);
    }
  },[isSuccess])

  useEffect(() => {
    if (time == 0) {
      setShowInputModal(true);
    }
  }, [time, setShowInputModal]);
  return (
    <Modal showModal={showInputModal} setShowModal={setShowInputModal}>
      <Wrap className="inline-block w-full overflow-hidden text-white align-middle transition-all transform bg-black shadow-xl sm:max-w-md sm:rounded-2xl">
        <div className="flex flex-col items-center justify-center px-8 py-10 pt-12 sm:px-16">
          <h2 className="text-lg font-medium">Grant permission for one day</h2>
        </div>
        <Time>24 hours</Time>

      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
        <div className="flex flex-col px-6 pb-8 mt-4 space-y-4 text-lg text-left">
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

const Time = styled.div`
  text-align: center;
  opacity: 0.5;
  font-size: 24px;
`;
