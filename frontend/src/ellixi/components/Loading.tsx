import Image from "next/image";
import React from "react";
import styled, { keyframes } from "styled-components";

interface Iprops {
  text: string;
}

function Loading({ text }: Iprops) {
  return (
    <Wrap>
      <ImageWraper>
        <Image src="/assets/loading.svg" alt="loading" width={64} height={64} />
      </ImageWraper>
      <div>{text}</div>
    </Wrap>
  );
}

export default Loading;

const Wrap = styled.div`
  text-align: center;
  margin: 20px 0px 30px 0px;
  font-size: 20px;
`;

const spin = keyframes`
from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ImageWraper = styled.div`
  animation: ${spin} 2s linear infinite;
  margin-bottom: 25px;
`;
