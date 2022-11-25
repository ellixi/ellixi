import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import { useAccount, useBalance } from "wagmi";
import { useWebAuthn } from "../src/webauthn/WebAuthnContext";

const MypageTemplate = dynamic(() => import("../src/common/MypageTemplate"), {
  ssr: false,
});
function Mypage() {
  const { address, isConnected } = useAccount();
  // const { data, isError, isLoading } = useBalance({
  //   address: address,
  // });
  // const { address } = useWebAuthn();
  return (
    <Wrap>
      <MypageTemplate />
    </Wrap>
  );
}

export default Mypage;

const Wrap = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/assets/background.svg");
  background-repeat: no-repeat;
`;
