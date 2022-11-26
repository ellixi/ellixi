import React, { useEffect, useState } from "react";
import styled from "styled-components";
function Score() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);
  return <Wrap>Score:{seconds}</Wrap>;
}

export default Score;

const Wrap = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.5;
  top: 10px;

  color: white;
  width: 200px;
  height: 50px;
  display: flex;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
`;
