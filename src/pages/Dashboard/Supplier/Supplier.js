import { Table } from "antd";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { SupplierColumnsData } from "../../../data/SupplierData";
const Supplier = () => {
  const { order } = useContext(ProductContext);
  return <Table columns={SupplierColumnsData} dataSource={order} />;
};

export default Supplier;
