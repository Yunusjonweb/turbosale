import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { firestore } from "../../firebase/firebase";
import { BestsellingContainer } from "../../styles/components/BestsellingProductStyles";

export default function ClientsLot() {
  const { order } = useContext(ProductContext);
  const [clients, setClients] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const colRef = collection(firestore, `${userEmail.email}.clients`);
  const filterSold = order.filter((item) => item.status === "Sotildi");

  const totalPrice = filterSold.reduce((sum, el) => {
    return sum + el.salePrice * el.quanty;
  }, 0);

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

  return (
    <BestsellingContainer>
      <div className="BestsellingProduct">
        <div className="product_title">Ko’p Xarid qilgan xaridorlar</div>
        <div className="BestsellingProduct_cards">
          {clients.map((item) => (
            <div className="BestsellingProduct_card">
              <div className="BestsellingProduct_info">
                <img
                  alt="example"
                  src={
                    item?.img
                      ? item?.img
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                  }
                  className="praducts_img"
                />
                <div className="products_title">{item.name}</div>
                <div className="products_quantity">{item.phone}</div>
                <div className="products_price">
                  {totalPrice ? totalPrice + "$" : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BestsellingContainer>
  );
}
