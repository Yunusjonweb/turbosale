import React, { useContext, useState, useRef } from "react";
import { Form, Input, Select, Modal } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { query, orderBy, limit } from "firebase/firestore";
import User from "../assets/User.png";

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

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.product`),
        {
          quanty: 0,
          select: selectValue,
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
