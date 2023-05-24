import { AppContext } from "../../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { DetailsContainer } from "../../styles/components/PraductDetailsStyles";
import { Button, message, Popconfirm } from "antd";
import EditModal from "../../modal/EditModal";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductContext } from "../../context/ProductContext";

export default function PraductDetails() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [modal2Open, setModal2Open] = useState(false);
  const { addToBasket } = useContext(ProductContext);
  const { product, setProduct } = useContext(AppContext);
  const { userId } = useParams();

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const thisProduct = product.filter((prod) => prod.id === userId);

  let dateObj = new Date();
  let month =
    dateObj.getUTCMonth() + 1 < 10
      ? "0" + dateObj.getUTCMonth()
      : dateObj.getUTCMonth(); //months from 1-12
  let day =
    dateObj.getUTCDate() < 10
      ? "0" + dateObj.getUTCDate()
      : dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const nowdate = day + "." + month + "." + year;

  const deleteItem = async (userId) => {
    // const yunus = await deleteDoc(
    //   doc(firestore, `${userEmail.email}.product`, userId)
    // );
    // console.log(yunus);
    const yunus = product.filter((item) => item.id !== userId);
    setProduct(yunus);
    navigate("/praducts");
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <DetailsContainer>
      <div className="praductDetails">
        {thisProduct.map((item) => (
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
                </div>
                <div className="praductDetail_card_color">
                  <p>Supplier</p>
                  <div className="praductDetail_yellow"></div>
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
                <EditModal
                  modal2Open={modal2Open}
                  setModal2Open={setModal2Open}
                  id={item.id}
                />
                <Popconfirm
                  title="Delete the product"
                  description="Are you sure to delete this product?"
                  onConfirm={() => deleteItem(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>
                    <DeleteOutlined /> Delete
                  </Button>
                </Popconfirm>
                <Button
                  type="primary"
                  size={"middle"}
                  onClick={() =>
                    addToBasket({
                      id: item.id,
                      img: item.img,
                      name: item.name,
                      quantity: item.quantity,
                      email: userEmail.email,
                      orginalPrice: item.orginalPrice,
                      date: nowdate,
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
