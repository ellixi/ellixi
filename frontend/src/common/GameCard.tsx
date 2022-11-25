import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface IProps {
  link: string;
  name: string;
}

function GameCard({ link, name }: IProps) {
  return (
    <Link href={`/${link}`}>
      <Container>
        <ImgBox />
        <Content>{name}</Content>
      </Container>
    </Link>
  );
}

export default GameCard;

const Wrap = styled.div``;

const Container = styled.div`
  background: black;
  color: white;
  padding: 16px;
  margin: 15px;
  border-radius: 22px;
  width: 400px;
  border: 1px solid white;
`;
const Content = styled.div`
  padding: 20px 20px;
`;

const ImgBox = styled.div`
  height: 170px;
  /* background-color: gray; */
`;
