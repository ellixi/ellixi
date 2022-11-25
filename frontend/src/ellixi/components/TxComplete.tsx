import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function TxComplete() {
  return (
    <Wrap>
      <Image src="/assets/check.svg" alt="check" width={64} height={64} />
      <Text>트랜잭션이 완료되었습니다</Text>
    </Wrap>
  );
}

export default TxComplete;

const Wrap = styled.div`
  text-align: center;
  margin: 20px 0px 30px 0px;
`;

const Text = styled.div`
  margin-top: 25px;
  font-size: 20px;
`;
