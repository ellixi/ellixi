import React, { useEffect, useState } from "react";
import styled from "styled-components";
function Score() {
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds % 5 == 0) {
        setScore(score + 12 + Math.floor(score / 12));
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds, score]);

  return <Wrap>Score : {score}</Wrap>;
}

export default Score;

const Wrap = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.5;
  top: 25px;

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
