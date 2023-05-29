import { Table } from "antd";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import { SupplierViewColumnsData } from "../../../data/SupplierViewColumnsData";
import { ClientsViewContainer } from "../../../styles/components/ClientsViewStyles";

export default function SupplierView() {
  const location = useLocation();
  const { data } = location.state;

  const { order } = useContext(ProductContext);

  const filterSold = order.filter((item) => item.status === "Sotildi");

  return (
    <ClientsViewContainer>
      <div className="clientsView">
        <div className="clients_profile">
          <div className="clients_info">
            {data.map((item) => (
              <div>
                <img src={item.img} alt={item.supplierName} />
                <p>{item.supplierName}</p>
                <p>{item.adress}</p>
                <p>{item.phone}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="clients_product">
          <Table columns={SupplierViewColumnsData} dataSource={filterSold} />
        </div>
      </div>
    </ClientsViewContainer>
  );
}
