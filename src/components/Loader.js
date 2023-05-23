import { Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <div className="Loader">
      <Spin tip="Loading" size="large"></Spin>
    </div>
  );
}
