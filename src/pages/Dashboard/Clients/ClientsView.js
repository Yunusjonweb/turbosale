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
        <div className="clients_profile">
          {data.map((item) => (
            <div className="clients_info">
              <div className="clients_img">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                  }
                  alt={item.name}
                />
              </div>
              <div className="clients_companyName">{item.name}</div>
              <div className="clients_title">Costumer</div>
              <div className="clients_companyAdress">{item.email}</div>
              <div className="clients_title">Email</div>
              <div className="clients_companyPhone">{item.phone}</div>
              <div className="clients_title">Phone</div>
            </div>
          ))}
        </div>
        <div className="clients_product">
          <Table columns={ClientsViewColumnsData} dataSource={filterSold} />
        </div>
      </div>
    </ClientsViewContainer>
  );
}
