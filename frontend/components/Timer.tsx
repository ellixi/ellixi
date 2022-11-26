import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface Iprops {
  hourValue: string;
  minValue: string;
}

const Timer = ({ hourValue, minValue }: Iprops) => {
  // 아무것도 입력하지 않으면 undefined가 들어오기 때문에 유효성 검사부터..
  const tempHour = parseInt(hourValue);
  const tempMin = parseInt(minValue);
  const tempSec = 0;
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef<any>(tempHour * 60 * 60 + tempMin * 60 + tempSec);
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
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
    }
  }, [sec]);

  return (
    <Wrap>
      {hour} : {min} : {sec}
    </Wrap>
  );
};

export default Timer;

const Wrap = styled.div`
  width: 300px;
`;
