import React, { useEffect, useRef, useState } from "react";
import Iframe from "react-iframe";
import Layout from "../../components/Layout";
import Score from "../../components/Score";

function Flappybird() {
  return (
    <Layout>
      <Score />
      <Iframe
        allowFullScreen={true}
        width="1500"
        height="800"
        url="https://flappybird.io/"
      />
    </Layout>
  );
}

export default Flappybird;
