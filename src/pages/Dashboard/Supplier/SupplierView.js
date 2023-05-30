import { Table } from "antd";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import { SupplierViewColumnsData } from "../../../data/SupplierViewColumnsData";
import { SupplierViewContainer } from "../../../styles/components/SupplierViewStyles";

export default function SupplierView() {
  const location = useLocation();
  const { data } = location.state;

  const { order } = useContext(ProductContext);

  const filterSold = order.filter((item) => item.status === "Sotildi");

  return (
    <SupplierViewContainer>
      <div className="supplierView">
        <div className="supplier_profile">
          {data.map((item) => (
            <div className="supplier_info">
              <div className="supplier_img">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                  }
                  alt={item.supplierName}
                />
              </div>
              <div className="supplier_companyName">{item.supplierName}</div>
              <div className="supplier_title">Supplier</div>
              <div className="supplier_companyAdress">{item.adress}</div>
              <div className="supplier_title">Adress</div>
              <div className="supplier_companyPhone">{item.phone}</div>
              <div className="phone_title">Phone</div>
            </div>
          ))}
        </div>
        <div className="supplier_product">
          <Table columns={SupplierViewColumnsData} dataSource={filterSold} />
        </div>
      </div>
    </SupplierViewContainer>
  );
}
