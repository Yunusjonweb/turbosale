import React, { useContext, useState, useRef } from "react";
import { Form, Input, Select, Modal } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { query, orderBy, limit } from "firebase/firestore";
import User from "../assets/User.png";

const { TextArea } = Input;

export default function PraductCreate({ open, setOpen }) {
  const [form] = Form.useForm();
  const [url, setUrl] = useState(null);
  const inputRef = useRef(null);
  const { product, setProduct } = useContext(AppContext);

  const handleImagesChange = (e) => {
    const file = e.target.files[0].name;
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

  const handleChange = (value) => {
    const selectedCategory = value;
  };

  const onFinish = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "product"), {
        quanty: 0,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJDzmwFYFG7Sa2b8yK2tiuLngAQZJrUse5d8BO2KZ80qwLvlUbSsf5-H5mIVaZOZ1OYSQ&usqp=CAU",
        ...form.getFieldsValue(),
      });
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJDzmwFYFG7Sa2b8yK2tiuLngAQZJrUse5d8BO2KZ80qwLvlUbSsf5-H5mIVaZOZ1OYSQ&usqp=CAU",
          id: docRef.id,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(product);

    setOpen(false);
    const products = collection(firestore, "product");
    const q = await query(products, orderBy("name"), limit(5));
    const docs = await getDocs(q);
    console.log(docs.docs.map((doc) => doc.data()));
  };

  return (
    <PraductCreateContainer>
      <Modal
        title="Create shop"
        centered
        open={open}
        onOk={() => onFinish()}
        onCancel={() => setOpen(false)}
        okText={"Saqlash"}
        width={800}
        cancelText={"Bekor qilish"}
      >
        <div className="praductCreate">
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
                <img src={url} alt={"cbwhej"} />
                <div onClick={handleClick}>
                  <img src={User} alt="rasim" className="profile_images" />
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImagesChange}
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Item>
              <Form.Item name="name" label="Mahsulot nomi">
                <Input name={"name"} />
              </Form.Item>
            </div>
            <div className="form_item">
              <Form.Item label="Tasnif" name="textArea">
                <TextArea
                  rows={5}
                  placeholder="maxLength is 100"
                  maxLength={100}
                  name={"textArea"}
                />
              </Form.Item>
              <Form.Item name="orginalPrice" label="Asl Narxi">
                <Input name={"orginalPrice"} />
              </Form.Item>
              <Form.Item name="prosent" label="Foiz(%)">
                <Input name={"prosent"} />
              </Form.Item>
            </div>
            <div className="form_item">
              <Form.Item name="salePrice" label="Sotuv narxi">
                <Input name={"salePrice"} />
              </Form.Item>
              <Form.Item label="Categoty">
                <Select
                  showSearch
                  onChange={handleChange}
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
                      value: "Not Identified",
                      label: "Not Identified",
                    },
                    {
                      value: "Closed",
                      label: "Closed",
                    },
                    {
                      value: "Communicated",
                      label: "Communicated",
                    },
                    {
                      value: "Identified",
                      label: "Identified",
                    },
                    {
                      value: "Resolved",
                      label: "Resolved",
                    },
                    {
                      value: "Cancelled",
                      label: "Cancelled",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="quantity" label="Miqdori">
                <Input name={"quantity"} />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </PraductCreateContainer>
  );
}
