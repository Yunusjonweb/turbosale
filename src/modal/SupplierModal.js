import { Modal, Form, Input, Button } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { firestore, storage } from "../firebase/firebase";
import { FormContainer } from "../styles/components/FormStyles";

export default function SupplierModal({ modal2Open, setModal2Open }) {
  const [form] = Form.useForm();
  const [url, setUrl] = useState(null);
  const { setProduct } = useContext(AppContext);
  const inputRef = useRef(null);

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUrl(url);
    handleClick(file);
  };

  const handleClick = (file) => {
    const storageRef = ref(storage, `images/${file}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((urls) => {
        setUrl(urls);
      });
    });
    inputRef.current.click();
  };

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.supplier`),
        {
          img: url,
          ...form.getFieldsValue(),
        }
      );
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: url,
          id: docRef.id,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModal2Open(false);
  };

  const handleCancel = () => {
    setModal2Open(false);
  };

  const showModal = () => {
    setModal2Open(true);
  };

  return (
    <div className="modal">
      <Modal
        title="Supplier qo'shish"
        centered
        open={modal2Open}
        width={800}
        footer={null}
      >
        <FormContainer>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="form">
              <Form.Item>
                <div onClick={handleClick}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
                    className="profile_images"
                    style={{ width: 280, height: 235 }}
                    alt="rasim"
                  />
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImagesChange}
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Item>
            </div>
            <div className="form_item">
              <Form.Item name="supplierName" label="Supplier name">
                <Input name={"supplierName"} />
              </Form.Item>
              <Form.Item name="adress" label="Adress">
                <Input name={"adress"} />
              </Form.Item>
              <Form.Item name="product" label="Product">
                <Input name={"product"} />
              </Form.Item>
            </div>
            <div className="form_item">
              <Form.Item name="phone" label="Phone">
                <Input name={"phone"} />
              </Form.Item>
              <Form.Item name="price" label="Narxi">
                <Input name={"price"} />
              </Form.Item>
              <Form.Item name="quantity" label="Miqdori">
                <Input name={"quantity"} />
              </Form.Item>
              <div className="form_btns">
                <Button type="primary" htmlType="submit" className="btn">
                  Save
                </Button>
                <Button
                  htmlType="submit"
                  onClick={() => handleCancel()}
                  className="btn"
                >
                  Close
                </Button>
              </div>
            </div>
          </Form>
        </FormContainer>
      </Modal>
      <Button onClick={showModal}>Create Supplier</Button>
    </div>
  );
}
