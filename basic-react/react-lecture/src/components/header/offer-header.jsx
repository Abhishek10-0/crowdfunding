import React from "react";
import "./offer-header.css"
import { Col, Row, Statistic } from "antd";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

function Offerheader() {
  const onFinish = () => {
    console.log("finished!");
  };
  return (
    <div className="offerHeaderMain">
      <div className="offerHaderText">Book our romantic Parisian suite for 3 nights at €299/night </div>
      <div className="offeHeaderCount">
        <Countdown value={deadline} onFinish={onFinish} />
      </div>
    </div>
  );
}

export default Offerheader;
