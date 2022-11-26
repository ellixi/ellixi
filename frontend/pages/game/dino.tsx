import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import Layout from "../../components/Layout";
import Score from "../../components/Score";

function Dino() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);
  return (
    <Layout>
      <Score />
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
