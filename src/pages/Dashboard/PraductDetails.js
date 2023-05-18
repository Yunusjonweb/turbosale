import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DetailsContainer } from "../../styles/components/PraductDetailsStyles";
import { ProductContext } from "../../context/ProductContext";
import EditModal from "../../modal/EditModal";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function PraductDetails() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [modal2Open, setModal2Open] = useState(false);
  const { addToBasket } = useContext(ProductContext);
  const newUsers = JSON.parse(localStorage.getItem("newUsers"));

  const colorArr = ["#FF0000", "#09203f", "#ffdd3c"];

  const deleteItem = async (userId) => {
    await deleteDoc(doc(firestore, "product", userId));
  };

  useEffect(() => {
    deleteItem(newUsers);
  }, []);

  return (
    <DetailsContainer>
      <div className="praductDetails">
        {newUsers.map((item) => (
          <div className="praductDetail">
            <div className="praductDetails_img">
              <img
                src={item.img}
                alt={item.name}
                className="praductDetail_img"
              />
            </div>
            <div className="praductDetails_info">
              <div className="praductDetail_data">
                <div className="praductDetail_title">
                  <h2>{item.name}</h2>
                </div>
                <div className="praductDetail_price">
                  <h2>{item.orginalPrice ? item.orginalPrice + "$" : null}</h2>
                </div>
              </div>
              <div className="praductDetail_description">{item.textArea}</div>
              <div className="praductDetail_card">
                <div className="praductDetail_card_color">
                  <p>Rangi</p>
                  <div className="praductDetail_green"></div>
                </div>
                <div className="praductDetail_card_color">
                  <p>Supplier</p>
                  <div className="praductDetail_yellow"></div>
                </div>
              </div>
              <div className="praductDetail_quantity">
                <div
                  className="praductDetail_quantity_title"
                  style={{ color: colorArr ? colorArr[0] : colorArr[1] }}
                >
                  Miqdori
                </div>
                <div className="praductDetail_quantity_button">
                  <Button>10000</Button>
                  <Button>20000</Button>
                  <Button>30000</Button>
                  <Button>40000</Button>
                  <Button>50000</Button>
                </div>
              </div>
              <div className="praductDetail_buy">
                <EditModal
                  modal2Open={modal2Open}
                  setModal2Open={setModal2Open}
                  id={item.id}
                />
                <Button onClick={() => deleteItem(item.id)}>
                  <DeleteOutlined /> Delete
                </Button>
                <Button
                  type="primary"
                  size={"middle"}
                  onClick={() =>
                    addToBasket({
                      id: item.id,
                      img: item.img,
                      name: item.name,
                      quantity: item.quantity,
                      orginalPrice: item.orginalPrice,
                    })
                  }
                >
                  Sotib olish
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button type={"ghost"} className="return_btn" onClick={goBack}>
        <ArrowLeftOutlined />
        Qaytish
      </Button>
    </DetailsContainer>
  );
}
