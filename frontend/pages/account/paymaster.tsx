import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import { useAccount, useBalance } from "wagmi";
import { useWebAuthn } from "../../src/ellixi/webauthn/WebAuthnContext";

const PaymasterTemplate = dynamic(
  () => import("../../src/ellixi/common/PaymasterTemplate"),
  {
    ssr: false,
  }
);
function Paymaster() {
  const { address, isConnected } = useAccount();
  // const { data, isError, isLoading } = useBalance({
  //   address: address,
  // });
  // const { address } = useWebAuthn();
  return (
    <Wrap>
      <PaymasterTemplate />
    </Wrap>
  );
}

export default Paymaster;

const Wrap = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/assets/background.svg");
  background-repeat: no-repeat;
`;
