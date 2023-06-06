import { Table } from "antd";
import { SalesColumnsData } from "../../data/SalesColumnsData";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Loader from "../../components/Loader";

const Sales = () => {
  const { order } = useContext(ProductContext);

  const filterSold = order.filter(
    (item) => item.status === "Sotildi" || item.status === "Kutilmoqda"
  );

  return (
    <div className="sales">
      {order.length ? (
        <Table columns={SalesColumnsData} dataSource={filterSold} />
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Sales;
