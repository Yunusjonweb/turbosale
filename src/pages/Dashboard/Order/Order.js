import { Table } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { ProductContext } from "../../../context/ProductContext";
import { OrderColumnsData } from "../../../data/OrderColumnsData";
import { firestore } from "../../../firebase/firebase";

const Order = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { order } = useContext(ProductContext);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const deleteItem = async (userId) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.basket`, userId));
  };

  const addToBasket = async (item) => {
    const selectedProduct = order.filter((prod) => prod.id === item.id);
    navigate("/clients/view", {
      state: {
        data: selectedProduct,
      },
    });
  };

  return (
    <div className="order">
      {order.length ? (
        <Table
          columns={OrderColumnsData(deleteItem, addToBasket, open, setOpen)}
          dataSource={order}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Order;
