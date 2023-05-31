import { Table } from "antd";
import { SalesColumnsData } from "../../data/SalesColumnsData";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Sales = () => {
  const { order } = useContext(ProductContext);

  const filterSold = order.filter(
    (item) =>
      item.status === "Sotildi" ||
      item.status === "Kutilmoqda" ||
      item.status === "Rad Etilgan"
  );

  return <Table columns={SalesColumnsData} dataSource={filterSold} />;
};
export default Sales;
