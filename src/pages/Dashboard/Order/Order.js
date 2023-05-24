import { Table } from "antd";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";

const Order = () => {
  const { order } = useContext(ProductContext);
  return <Table columns={OrderColumnsData} dataSource={order} />;
};

export default Order;
