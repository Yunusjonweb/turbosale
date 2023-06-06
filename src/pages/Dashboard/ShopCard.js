import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ShopCardContainer } from "../../styles/components/ShopCardStyles";
import { ProductContext } from "../../context/ProductContext";
import { ShopCardData } from "../../data/ShopCardData";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Loader from "../../components/Loader";

export default function ShopCard() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [loader, setLoader] = useState(false);
  const [basket, setBasket] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const colRef = collection(firestore, `${userEmail.email}.basket`);

  useEffect(() => {
    setLoader(false);
    getDocs(colRef)
      .then((snapshot) => {
        let product = [];
        snapshot.forEach((item) => {
          product.push({ ...item.data(), id: item.id });
        });
        setBasket(product);
      })
      .catch((err) => {
        console.log(err.message);
      });
    onSnapshot(colRef);
  }, [loader]);

  const plusHandle = async (id, idd) => {
    setLoader(true);
    const washingtongRef = doc(firestore, `${userEmail.email}.basket`, id);
    const product = await getDoc(washingtongRef);
    const qty = product.data().quanty;
    const washingtongReff = doc(firestore, `${userEmail.email}.product`, idd);
    const productt = await getDoc(washingtongReff);
    const qtyy = productt.data().quantity;
    if (qtyy != 0) {
      await updateDoc(washingtongRef, {
        quanty: qty + 1,
      });
      await updateDoc(washingtongReff, {
        quanty: qty - 1,
      });
    }
    setLoader(false);
  };

  const minusHandle = async (id, idd) => {
    setLoader(true);
    const washingtongRef = doc(firestore, `${userEmail.email}.basket`, id);
    const product = await getDoc(washingtongRef);
    const qty = product.data().quanty;
    const washingtongReff = doc(firestore, `${userEmail.email}.product`, idd);
    const productt = await getDoc(washingtongReff);
    const qtyy = productt.data().quantity;
    if (qtyy != 0) {
      await updateDoc(washingtongRef, {
        quanty: qty - 1,
      });
      await updateDoc(washingtongReff, {
        quanty: qty + 1,
      });
    }
    setLoader(false);
  };

  const deleteItem = async (userId) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.basket`, userId));
  };

  const totalPrice = basket.reduce((sum, el) => {
    return sum + el.salePrice * el.quanty;
  }, 0);

  return (
    <ShopCardContainer>
      <div className="shopCard_section">
        {loader === true ? (
          <Loader />
        ) : (
          <Table
            columns={ShopCardData(plusHandle, minusHandle, deleteItem)}
            dataSource={basket}
          />
        )}
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
