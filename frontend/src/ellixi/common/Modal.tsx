import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import Loading from "../components/Loading";
import TxComplete from "../components/TxComplete";

interface ModalProps {
  handleClose?: () => void;
}

interface StateProps {
  state?: string;
}

function State({ state }: StateProps): JSX.Element {
  if (state == "loading") {
    return <Loading text="로딩중입니다..." />;
  } else if (state == "complete") {
    return <TxComplete />;
  } else {
    return <></>;
  }
}

function Modal({ handleClose }: ModalProps) {
  const [confirm, setConfirm] = useState("");
  const [value, setValue] = useState();
  const [state, setState] = useState("");

  const submitTime = () => {
    setConfirm("confirm");
    setState("loading");
  };
  return (
    <Wrap>
      <Back />
      <Box>
        <Close>
          <AiOutlineClose onClick={handleClose} className="close-button" />
        </Close>
        <Container>
          {confirm ? (
            <State state={state} />
          ) : (
            <Form>
              <div className="text">몇분 동안 세션키를 유지하시겠습니까?</div>
              <input
                type="number"
                onChange={(e: any) => setValue(e.target.value)}
                value={value}
              ></input>
              <div className="button" onClick={submitTime}>
                confirm
              </div>
            </Form>
          )}
        </Container>
      </Box>
    </Wrap>
  );
}

export default Modal;

const Wrap = styled.div`
  height: 100vh;
  position: fixed;
  z-index: 25;
  left: 0;
  right: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: normal;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
`;

const Box = styled.div`
  position: absolute;
  background-color: black;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 384px;
  background-color: black;
  border-radius: 20px;
  border: 1px solid #888888;
  padding: 15px;
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  .close-button {
    width: 24px;
    height: 24px;
    padding: 5px;
  }
`;

const Container = styled.div`
  padding: 10px 0px;
  text-align: center;
`;

const Form = styled.div`
  .text {
    margin: 20px 10px 40px 10px;
    font-size: 20px;
  }
  input {
    border: none;
    width: 299px;
    height: 40px;
    left: 792px;
    top: 604px;
    padding: 10px;

    background: #191919;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  .button {
    width: 300px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #7a7a7a;
    border-radius: 20px;
  }
`;
