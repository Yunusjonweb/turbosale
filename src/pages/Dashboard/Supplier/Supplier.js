import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { SupplierColumnsData } from "../../../data/SupplierData";
import { firestore } from "../../../firebase/firebase";
import SupplierModal from "../../../modal/SupplierModal";
import { SupplierContainer } from "../../../styles/components/SupplierStyles";

const Supplier = () => {
  const { order } = useContext(ProductContext);
  const [modal2Open, setModal2Open] = useState(false);
  const [supplier, setSupplier] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const colRef = collection(firestore, `${userEmail.email}.supplier`);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let product = [];
        snapshot.forEach((item) => {
          product.push({ ...item.data(), id: item.id });
        });
        setSupplier(product);
      })
      .catch((err) => {
        console.log(err.message);
      });
    onSnapshot(colRef);
  }, [supplier]);

  return (
    <SupplierContainer>
      <div className="supplier">
        <div className="supplier_form">
          <div className="supplier_input">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </div>
          <div className="supplier_btns">
            <Button>
              <FilterOutlined />
            </Button>
            <SupplierModal
              modal2Open={modal2Open}
              setModal2Open={setModal2Open}
            />
          </div>
        </div>
        <Table columns={SupplierColumnsData} dataSource={supplier} />
      </div>
    </SupplierContainer>
  );
};

export default Supplier;
