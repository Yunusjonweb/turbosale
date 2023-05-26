import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";

const Order = () => {
  const { order, setOrder } = useContext(ProductContext);

  const selectFunc = (value, id) => {
    // const findIndex = order.find((item) => item.id === id);
    const newState = order.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: value };
      }
      return obj;
    });
    setOrder(newState);
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  return <Table columns={OrderColumnsData(selectFunc)} dataSource={order} />;
};

export default Order;
