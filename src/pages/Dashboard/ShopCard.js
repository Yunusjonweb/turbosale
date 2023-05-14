import React, { useContext } from "react";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { ShopCardContainer } from "../../styles/components/ShopCardStyles";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";

export default function ShopCard() {
  const { order, setOrder } = useContext(ProductContext);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const api = {
    baseurl: "https://islomapi.uz/api/present/",
  };

  async function getResults(query) {
    const res = await fetch(`${api.baseurl}day?region=${query}`);
    const result = await res.json();
    return displayResults(result);
  }

  getResults("Jizzax");

  const date = new Date();
  const newHours = date.getHours();
  const newMinutes = date.getMinutes();

  const time = `${newHours}:${newMinutes}`;
  const currentDate = time.split(":").join("");

  const displayResults = (time) => {
    console.log(time);
    const timesArray = [
      "Tong Saharlik",
      "Bomdod",
      "Peshin",
      "Asr",
      "Shom",
      "Xufton",
    ];
    const times = Object.values(time.times);
    const newArr = [];
    times.forEach((item) => {
      newArr.push(item.split(":").join(""));
    });
    let number = newArr.reverse().find((e) => e <= currentDate);
    console.log(number);
    console.log(newArr);

    newArr.sort((a, b) => {
      return a - b;
    });

    const activeTimes = newArr.indexOf(number);
    if (number) {
      toast.warning(`${timesArray[activeTimes]} ${number} ${time.region}`);
    }
  };

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

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.orginalPrice * el.quanty;
  }, 0);

  const deletItem = (item) => {
    const filteredUsers = order.filter((user) => user.id !== item.id);
    setOrder(filteredUsers);
  };

  let numberingPrice = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <ShopCardContainer>
      <div className="shopCard_section">
        <div className="shopCard_card">
          {order.map((item) => (
            <div className="shopCard_data">
              <img src={item.img} alt={item.name} className="shopCard_img" />
              <p className="shopCard_title">{item.name}</p>
              <p className="shopCard_price">
                {item.orginalPrice ? item.orginalPrice + "usz" : null}
              </p>
              <p className="shopCard_totalPrice">
                {numberingPrice ? numberingPrice + "usz" : null}
              </p>
              <p className="shopCard_quantity">{item.quanty}</p>
              <Button
                className="shopCard_inc"
                onClick={() => minusHandle(item?.id)}
              >
                -
              </Button>
              <Button
                className="shopCard_dec"
                onClick={() => plusHandle(item?.id)}
              >
                +
              </Button>
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deletItem(item)}
              >
                <Button>
                  <DeleteOutlined /> Delete
                </Button>
              </Popconfirm>
            </div>
          ))}
        </div>
      </div>

      <Button type={"ghost"} className="return_btn" onClick={goBack}>
        <ArrowLeftOutlined />
        Qaytish
      </Button>
    </ShopCardContainer>
  );
}
