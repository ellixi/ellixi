import React from "react";
import styled from "styled-components";
import GameCard from "../src/common/GameCard";

function explore() {
  return (
    <Wrap>
      <GameList>
        <GameCard link="dino" name="dino" />
        <GameCard link="dino" name="dino" />
        <GameCard link="dino" name="dino" />
        <GameCard link="dino" name="dino" />
      </GameList>
    </Wrap>
  );
}

export default explore;

const Wrap = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/assets/background.svg");
  background-repeat: no-repeat;
`;

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0px 0px 80px;
`;
