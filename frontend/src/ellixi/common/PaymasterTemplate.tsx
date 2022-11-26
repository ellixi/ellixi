import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useBalance, useProvider } from "wagmi";
import { useWebAuthn } from "../webauthn/WebAuthnContext";
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle";
import { MdAccountBalance } from "@react-icons/all-files/md/MdAccountBalance";

function PaymasterTemplate() {
  const router = useRouter();
  const { address, signOut } = useWebAuthn();
  const provider = useProvider();
  const [ethBalance, setETHBalance] = useState(0);

  const getETHBalance = useCallback(async () => {
    if (address) {
      const result = await provider.getBalance(address);
      setETHBalance(result.toNumber());
    }
  }, [address, provider]);

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [router, address]);

  useEffect(() => {
    getETHBalance();
  }, [getETHBalance]);

  return (
    <Wrap>
      <div>
        <div>
          <MdAccountCircle /> :{address}
        </div>
        <div>
          <MdAccountBalance /> : {ethBalance}
        </div>
      </div>
      <Logout onClick={() => signOut()}>Logout</Logout>
    </Wrap>
  );
}

export default PaymasterTemplate;

const Wrap = styled.div`
  height: 800px;
`;

const Logout = styled.div`
  width: 280px;
  height: 50px;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #7a7a7a;
  border-radius: 20px;
`;
