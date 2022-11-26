import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import Layout from "../../components/Layout";
import Score from "../../components/Score";
import Timer from "../../components/Timer";
import { TimerContext } from "../_app";
import { useInputModal } from "../../components/InputModal";

function Dino() {
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
        url="https://offline-dino-game.firebaseapp.com/"
      />
    </Layout>
  );
}

export default Dino;
