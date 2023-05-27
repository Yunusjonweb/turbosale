import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { SupplierColumnsData } from "../../../data/SupplierData";
import { firestore } from "../../../firebase/firebase";
import ClientsEdit from "../../../modal/ClientsEdit";
import ClientsModal from "../../../modal/ClientsModal";
import { SupplierContainer } from "../../../styles/components/SupplierStyles";

const Clients = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [clients, setClients] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const colRef = collection(firestore, `${userEmail.email}.clients`);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let product = [];
        snapshot.forEach((item) => {
          product.push({ ...item.data(), id: item.id });
        });
        setClients(product);
      })
      .catch((err) => {
        console.log(err.message);
      });
    onSnapshot(colRef);
  }, [clients]);

  const deleteItem = async (userId) => {
    console.log(userId);
    await deleteDoc(doc(firestore, `${userEmail.email}.clients`, userId));
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <SupplierContainer>
      <div className="supplier">
        <div className="supplier_form">
          <div className="supplier_input">
            <Input
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="supplier_btns">
            <ClientsModal
              modal2Open={modal2Open}
              setModal2Open={setModal2Open}
            />
          </div>
        </div>
        <Table
          columns={SupplierColumnsData(deleteItem, showModal)}
          dataSource={clients.filter((item) =>
            item.supplierName.toLowerCase().includes(search.toLowerCase())
          )}
        />
      </div>
      <ClientsEdit open={open} setOpen={setOpen} />
    </SupplierContainer>
  );
};

export default Clients;
