import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../pages/_app";
import { RiTimerLine } from "@react-icons/all-files/ri/RiTimerLine";
const Timer = ({ time, type }: any) => {
  const tempHour = Math.floor(Number(time) / 3600);
  const tempMin = Math.floor(Number(time) / 60) % 60;
  const tempSec = Number(time) % 60;
  const { setTime } = useContext(TimerContext);

  const initialTime = useRef<any>(
    Number(tempHour) * 60 * 60 + Number(tempMin) * 60 + tempSec
  );
  const interval = useRef<any>(null);

  const [hour, setHour] = useState(tempHour);
  const [min, setMin] = useState(tempMin);
  const [sec, setSec] = useState(tempSec);

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(Math.floor(initialTime.current % 60));
      setMin(Math.floor(initialTime.current / 60) % 60);
      setHour(Math.floor(initialTime.current / 60 / 60));
      //@ts-ignore
      setTime(initialTime.current);
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [setTime, time]);

  useEffect(() => {
    if (initialTime.current <= 0 || time == 0) {
      clearInterval(interval.current);
      //@ts-ignore
      setTime(0);
    }
  }, [sec, setTime, time]);

  if (time == 0) {
    return <DefaultWrap>00:00:00</DefaultWrap>;
  }
  if (type == "game") {
    return (
      <GameWrap>
        <RiTimerLine className="icon" />
        {hour} : {min} : {sec}
      </GameWrap>
    );
  }
  if ((type = "mypage")) {
    return (
      <MypageWrap>
        <RiTimerLine className="icon" />
        {hour} : {min} : {sec}
      </MypageWrap>
    );
  }
  return <></>;
};

export default Timer;

const GameWrap = styled.div`
  position: absolute;
  left: 50%;
  width: 250px;
  justify-content: center;
  margin-top: 40px;
  display: flex;
  align-items: center;
  font-size: 24px;
  transform: translateX(-50%);
  .icon {
    margin-right: 20px;
  }
`;

const MypageWrap = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  .icon {
    margin: 10px;
  }
`;

const DefaultWrap = styled.div`
  margin: 10px;
`;
