import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import InputModal from "../src/ellixi/common/InputModal";

export default function dino() {
  return (
    <Wrap>
      <InputModal />
    </Wrap>
  );
}

const Wrap = styled.div``;
