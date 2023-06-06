import { Spin } from "antd";
import React from "react";
import { LoaderContainer } from "../styles/components/LoaderStyle";

export default function Loader() {
  return (
    <LoaderContainer>
      <div className="loader">
        <Spin tip="Loading" size="large"></Spin>
      </div>
    </LoaderContainer>
  );
}
