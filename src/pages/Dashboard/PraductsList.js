import React, { useEffect, useState } from "react";
import PraductsItem from "./PraductsItem";

export default function PraductsList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/praductData")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return <div>{data ? <PraductsItem data={data} /> : null}</div>;
}
