import { Table } from "antd";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";

const Order = () => {
  const { order, setOrder } = useContext(ProductContext);

  const selectFunc = (label, id) => {
    const newState = order.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: label };
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
