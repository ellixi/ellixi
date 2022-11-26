import React, { useContext, useEffect, useRef, useState } from "react";
import Iframe from "react-iframe";
import { useInputModal } from "../../components/InputModal";
import Layout from "../../components/Layout";
import Score from "../../components/Score";
import Timer from "../../components/Timer";
import { TimerContext } from "../_app";
function Tetris() {
  const { time, setTime } = useContext(TimerContext);
  const { setShowInputModal, InputModal } = useInputModal();

  useEffect(() => {
    if (time === 0) {
      setShowInputModal(true);
    }
  }, [time, setShowInputModal]);

  return (
    <Layout>
      {time && <Timer type="game" time={time} />}
      <InputModal />
      {time != 0 && <Score />}
      <Iframe
        id="dino"
        allowFullScreen={true}
        width="1500"
        height="800"
        url="https://www.lumpty.com/amusements/Games/Tetris/tetris.html"
      />
    </Layout>
  );
}

export default Tetris;
