import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SupplierColumnsData } from "../../../data/SupplierData";
import { firestore } from "../../../firebase/firebase";
import SupplierModal from "../../../modal/SupplierModal";
import { SupplierContainer } from "../../../styles/components/SupplierStyles";

const Supplier = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [filter, setFilter] = useState([]);

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
  }, []);

  useEffect(() => {
    setFilter(supplier);
  }, [supplier]);

  const deleteItem = async (userId) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.supplier`, userId));
  };

  const productSort = async () => {
    const products = collection(firestore, `${userEmail.email}.supplier`);
    const q = await query(products, orderBy("supplierName"), limit(2));
    const docs = await getDocs(q);
    const productSort = docs.docs.map((doc) => doc.data());
    setSupplier(productSort);
  };

  const addToBasket = async (item) => {
    const selectedProduct = supplier.filter((prod) => prod.id === item.id);
    navigate("/supplier/view", {
      state: {
        data: selectedProduct,
      },
    });
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
            <Button onClick={() => productSort()}>
              <FilterOutlined />
            </Button>
            <SupplierModal
              modal2Open={modal2Open}
              setModal2Open={setModal2Open}
            />
          </div>
        </div>
        <Table
          columns={SupplierColumnsData(deleteItem, addToBasket, open, setOpen)}
          dataSource={filter.filter((item) =>
            item.supplierName.toLowerCase().includes(search.toLowerCase())
          )}
        />
      </div>
    </SupplierContainer>
  );
};

export default Supplier;
