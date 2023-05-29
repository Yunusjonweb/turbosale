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

  return (
    <ClientsViewContainer>
      <div className="clientsView">
        <div className="clients_profile">
          <div className="clients_info">
            {data.map((item) => (
              <div>
                <p>{item.supplierName}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="clients_product">
          <Table columns={SupplierViewColumnsData} dataSource={order} />
        </div>
      </div>
    </ClientsViewContainer>
  );
}
