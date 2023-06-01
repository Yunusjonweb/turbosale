import React, { useContext, useState, useRef } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { FormContainer } from "../styles/components/FormStyles";

const { TextArea } = Input;

export default function PraductCreate({ open, setOpen }) {
  const [form] = Form.useForm();
  const [url, setUrl] = useState(null);
  const { setProduct } = useContext(AppContext);
  const inputRef = useRef(null);
  const [selectValue, setSelectValue] = useState(null);

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

  let dateObj = new Date();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const nowTimes = Date.now();

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.product`),
        {
          quanty: 0,
          select: selectValue,
          time: nowTimes,
          img: url,
          ...form.getFieldsValue(),
        }
      );
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: url,
          select: selectValue,
          id: docRef.id,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setOpen(false);
  };

  return (
    <PraductCreateContainer>
      <Modal title="Create shop" centered open={open} width={800} footer={null}>
        <div className="praductCreate">
          <FormContainer>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              onFinish={onFinish}
            >
              <div className="form">
                <Form.Item>
                  <div onClick={handleClick}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
                      alt="rasim"
                      className="profile_images"
                    />
                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleImagesChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Mahsulot nomi"
                  rules={[{ required: true, message: "Write a product name!" }]}
                  hasFeedback
                >
                  <Input name={"name"} />
                </Form.Item>
              </div>
              <div className="form_item">
                <Form.Item
                  label="Tasnif"
                  name="textArea"
                  rules={[{ required: true, message: "Write a textrea!" }]}
                  hasFeedback
                >
                  <TextArea
                    rows={5}
                    placeholder="maxLength is 100"
                    maxLength={100}
                    name={"textArea"}
                  />
                </Form.Item>
                <Form.Item
                  name="orginalPrice"
                  label="Asl Narxi"
                  rules={[
                    { required: true, message: "Write a orginal price!" },
                  ]}
                  hasFeedback
                >
                  <Input name={"orginalPrice"} />
                </Form.Item>
                <Form.Item
                  name="prosent"
                  label="Foiz(%)"
                  rules={[{ required: true, message: "Write a prosent!" }]}
                  hasFeedback
                >
                  <Input name={"prosent"} />
                </Form.Item>
              </div>
              <div className="form_item">
                <Form.Item
                  name="salePrice"
                  label="Sotuv narxi"
                  rules={[{ required: true, message: "Write a sale price!" }]}
                  hasFeedback
                >
                  <Input name={"salePrice"} />
                </Form.Item>
                <Form.Item label="Categoty">
                  <Select
                    showSearch
                    onChange={(value) => setSelectValue(value)}
                    style={{
                      width: 200,
                    }}
                    name="selectedCategory"
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "Devan",
                        label: "Devan",
                      },
                      {
                        value: "Kreslo",
                        label: "Kreslo",
                      },
                      {
                        value: "Xontaxta",
                        label: "Xontaxta",
                      },
                      {
                        value: "Stol",
                        label: "Stol",
                      },
                      {
                        value: "Shkaf",
                        label: "Shkaf",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="Miqdori"
                  rules={[{ required: true, message: "Write a quantity!" }]}
                  hasFeedback
                >
                  <Input name={"quantity"} />
                </Form.Item>
                <div className="forms_btns">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="product_btn"
                  >
                    Save
                  </Button>
                  <Button
                    htmlType="submit"
                    onClick={() => setOpen(false)}
                    className="product_btn"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Form>
          </FormContainer>
        </div>
      </Modal>
    </PraductCreateContainer>
  );
}
