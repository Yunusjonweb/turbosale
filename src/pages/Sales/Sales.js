import { Table } from "antd";
import { SalesColumnsData } from "../../data/SalesColumnsData";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Sales = () => {
  const { order } = useContext(ProductContext);
  return <Table columns={SalesColumnsData} dataSource={order} />;
};
export default Sales;
