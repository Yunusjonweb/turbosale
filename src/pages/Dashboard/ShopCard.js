import React, { useContext } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ShopCardContainer } from "../../styles/components/ShopCardStyles";
import { ProductContext } from "../../context/ProductContext";
import { ShopCardData } from "../../data/ShopCardData";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function ShopCard() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { order, setOrder } = useContext(ProductContext);

  const plusHandle = async (id, idd) => {
    console.log(idd, id);
    const washingtongRef = doc(firestore, `${userEmail.email}.basket`, id);
    const product = await getDoc(washingtongRef);
    const qty = product.data().quanty;
    const washingtongReff = doc(firestore, `${userEmail.email}.product`, idd);
    const productt = await getDoc(washingtongReff);
    const qtyy = productt.data().quantity;
    console.log(productt.data());
    if (qtyy != 0) {
      await updateDoc(washingtongRef, {
        quanty: qty + 1,
      });
      await updateDoc(washingtongReff, {
        quanty: qty - 1,
      });
    }
  };

  const minusHandle = (id) => {
    const userDatas = order.map((user) => {
      if (user.id === id) {
        const newQuanty = user.quanty - 1;
        return {
          ...user,
          quanty: newQuanty >= 0 ? newQuanty : 0,
        };
      } else {
        return user;
      }
    });
    setOrder(userDatas);
  };

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const deleteItem = async (userId, idd) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.basket`, userId));
  };

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.salePrice * el.quanty;
  }, 0);

  return (
    <ShopCardContainer>
      <div className="shopCard_section">
        <Table
          columns={ShopCardData(plusHandle, minusHandle, deleteItem)}
          dataSource={order}
        />
        <h2 className="totalPrice_title">
          {totalPrice
            ? "Total price:" +
              totalPrice
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " USD"
            : null}
        </h2>
        <Button type={"ghost"} className="return_btn" onClick={goBack}>
          <ArrowLeftOutlined />
          Qaytish
        </Button>
      </div>
    </ShopCardContainer>
  );
}
