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
import { ClientsColumnsData } from "../../../data/ClientsDataColumns";
import { firestore } from "../../../firebase/firebase";
import ClientsModal from "../../../modal/ClientsModal";
import { SupplierContainer } from "../../../styles/components/SupplierStyles";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [clients, setClients] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const colRef = collection(firestore, `${userEmail.email}.clients`);

  const addToBasket = async (item) => {
    const selectedProduct = clients.filter((prod) => prod.id === item.id);
    navigate("/clients/view", {
      state: {
        data: selectedProduct,
      },
    });
  };

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
    await deleteDoc(doc(firestore, `${userEmail.email}.clients`, userId));
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
          columns={ClientsColumnsData(deleteItem, addToBasket, open, setOpen)}
          dataSource={clients.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
          })}
        />
      </div>
    </SupplierContainer>
  );
};

export default Clients;
