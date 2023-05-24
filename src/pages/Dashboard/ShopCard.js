import React, { useContext, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ShopCardContainer } from "../../styles/components/ShopCardStyles";
import { ProductContext } from "../../context/ProductContext";
import { ShopCardData } from "../../data/ShopCardData";

export default function ShopCard() {
  const { order, setOrder } = useContext(ProductContext);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [product, setProduct] = useState([]);

  // const api = {
  //   baseurl: "https://islomapi.uz/api/present/",
  // };

  // async function getResults(query) {
  //   const res = await fetch(`${api.baseurl}day?region=${query}`);
  //   const result = await res.json();
  //   return displayResults(result);
  // }

  // getResults("Jizzax");

  // const date = new Date();
  // const newHours = date.getHours();
  // const newMinutes = date.getMinutes();

  // const time = `${newHours}:${newMinutes}`;
  // const currentDate = time.split(":").join("");

  // const displayResults = (time) => {
  //   const timesArray = [
  //     "Tong Saharlik",
  //     "Bomdod",
  //     "Peshin",
  //     "Asr",
  //     "Shom",
  //     "Xufton",
  //   ];
  //   const times = Object.values(time.times);
  //   const newArr = [];
  //   times.forEach((item) => {
  //     newArr.push(item.split(":").join(""));
  //   });
  //   let number = newArr.reverse().find((e) => e <= currentDate);

  //   newArr.sort((a, b) => {
  //     return a - b;
  //   });

  //   const activeTimes = newArr.indexOf(number);
  //   if (number) {
  //     const toastAlert = setTimeout(() => {
  //       toast.success(`${timesArray[activeTimes]} ${number} ${time.region}`);
  //     }, 1000);
  //     setTimeout(() => {
  //       clearInterval(toastAlert);
  //     }, 10000);
  //   }
  // };

  const ApiUrl = {
    url: "https://nbu.uz/uz/exchange-rates/json",
  };

  // async function getResults() {
  //   const res = await fetch(`${ApiUrl.baseurl}`);
  //   const result = await res.json();
  //   return console.log(result);
  // }

  // getResults();

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

  return (
    <ShopCardContainer>
      <div className="shopCard_section">
        <Table
          columns={ShopCardData(plusHandle, minusHandle)}
          dataSource={order}
        />
        <Button type={"ghost"} className="return_btn" onClick={goBack}>
          <ArrowLeftOutlined />
          Qaytish
        </Button>
      </div>
    </ShopCardContainer>
  );
}
