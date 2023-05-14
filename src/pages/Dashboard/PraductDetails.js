import React, { useContext } from "react";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DetailsContainer } from "../../styles/components/PraductDetailsStyles";
import { ProductContext } from "../../context/ProductContext";

export default function PraductDetails({ deletItem }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { addToBasket } = useContext(ProductContext);
  const newUsers = JSON.parse(localStorage.getItem("newUsers"));

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
                  <div className="praductDetail_color"></div>
                </div>
                <div className="praductDetail_card_color">
                  <p>Supplier</p>
                  <div className="praductDetail_color"></div>
                </div>
              </div>
              <div className="praductDetail_quantity">
                <div className="praductDetail_quantity_title">Miqdori</div>
                <div className="praductDetail_quantity_button">
                  <Button>10000</Button>
                  <Button>20000</Button>
                  <Button>30000</Button>
                  <Button>40000</Button>
                  <Button>50000</Button>
                </div>
              </div>
              <div className="praductDetail_buy">
                <Button>
                  <EditOutlined /> Edit
                </Button>
                <Button onClick={() => deletItem(item.id)}>
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
