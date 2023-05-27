import { Table } from "antd";
import { SalesColumnsData } from "../../data/SalesColumnsData";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Sales = () => {
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

  const { order } = useContext(ProductContext);

  return <Table columns={SalesColumnsData} dataSource={order} />;
};
export default Sales;
