import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import Modal from "../src/ellixi/common/Modal";

export default function dino() {
  return (
    <Wrap>
      <Modal />
    </Wrap>
  );
}

const Wrap = styled.div``;
