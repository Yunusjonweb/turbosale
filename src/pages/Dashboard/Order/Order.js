import { Table } from "antd";
import { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";

const Order = () => {
  const [yunus, setYunus] = useState([]);
  const { order, setOrder } = useContext(ProductContext);

  const selectFunc = (value, id) => {
    const itemIndex = order.find((item) => item.id === id);
    if (itemIndex < 0) {
      const newItem = {
        ...order,
        status: value,
      };
      setOrder([...order, newItem]);
    }
  };

  console.log(order);

  return <Table columns={OrderColumnsData(selectFunc)} dataSource={order} />;
};

export default Order;
