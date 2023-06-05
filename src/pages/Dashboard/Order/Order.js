import { Table } from "antd";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";

const Order = () => {
  const { order, setOrder } = useContext(ProductContext);

  const optionValue = [
    {
      id: 1,
      color: "#0466C8",
      status: "Kutilmoqda",
    },
    {
      id: 2,
      color: "#29CF3F",
      status: "Rad Etilgan",
    },
    {
      id: 3,
      color: "#E98026",
      status: "Sotildi",
    },
  ];

  const selectFunc = (status, id) => {
    const newState = order.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: status };
      }
      return obj;
    });
    setOrder(newState);
  };

  // console.log(order);

  return (
    <Table
      columns={OrderColumnsData(selectFunc, optionValue)}
      dataSource={order}
    />
  );
};

export default Order;
