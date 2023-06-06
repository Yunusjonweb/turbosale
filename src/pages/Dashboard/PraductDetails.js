import { AppContext } from "../../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DetailsContainer } from "../../styles/components/PraductDetailsStyles";
import { Button, message, Popconfirm } from "antd";
import EditModal from "../../modal/EditModal";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductContext } from "../../context/ProductContext";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function PraductDetails() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [modal2Open, setModal2Open] = useState(false);
  const { addToBasket } = useContext(ProductContext);
  const { product } = useContext(AppContext);
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
    await deleteDoc(doc(firestore, `${userEmail.email}.product`, userId));
    navigate("/praducts");
  };

  useEffect(() => {
    deleteItem();
  }, []);

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
                src={
                  item.img
                    ? item.img
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
                }
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
                      prosent: item.prosent,
                      quantity: item.quantity,
                      email: userEmail.email,
                      salePrice: item.salePrice,
                      orginalPrice: item.orginalPrice,
                      status: "Kutilmoqda",
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
