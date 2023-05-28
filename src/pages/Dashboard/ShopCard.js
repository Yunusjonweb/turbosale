import React, { useContext } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ShopCardContainer } from "../../styles/components/ShopCardStyles";
import { ProductContext } from "../../context/ProductContext";
import { ShopCardData } from "../../data/ShopCardData";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function ShopCard() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { order, setOrder } = useContext(ProductContext);

  const plusHandle = (id) => {
    const userDatas = order.map((user) => {
      if (user.id === id) {
        const newQuanty = user.quanty + 1;
        return {
          ...user,
          quanty: newQuanty,
        };
      } else {
        return user;
      }
    });
    setOrder(userDatas);
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

  const deleteItem = async (userId) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.basket`, userId));
  };

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.orginalPrice * el.quanty;
  }, 0);

  return (
    <ShopCardContainer>
      <div className="shopCard_section">
        <Table
          columns={ShopCardData(plusHandle, minusHandle, deleteItem)}
          dataSource={order}
        />
        <h2 className="totalPrice_title">
          {totalPrice ? "Total price:" + totalPrice : null}
        </h2>
        <Button type={"ghost"} className="return_btn" onClick={goBack}>
          <ArrowLeftOutlined />
          Qaytish
        </Button>
      </div>
    </ShopCardContainer>
  );
}
