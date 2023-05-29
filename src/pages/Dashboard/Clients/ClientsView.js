import { Table } from "antd";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import { ClientsViewColumnsData } from "../../../data/ClientsViewColumnsData";
import { ClientsViewContainer } from "../../../styles/components/ClientsViewStyles";

export default function ClientsView() {
  const location = useLocation();
  const { data } = location.state;

  const { order } = useContext(ProductContext);

  const filterSold = order.filter((item) => item.status === "Sotildi");

  return (
    <ClientsViewContainer>
      <div className="clientsView">
        {/* <div className="clients_profile">
          <div className="clients_info">
            {data.map((item) => (
              <div>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
              </div>
            ))}
          </div>
        </div> */}
        <div className="clients_product">
          <Table columns={ClientsViewColumnsData} dataSource={filterSold} />
        </div>
      </div>
    </ClientsViewContainer>
  );
}
