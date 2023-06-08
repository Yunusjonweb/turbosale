import React, { useContext, useState } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { FormContainer } from "../styles/components/FormStyles";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const { TextArea } = Input;

export default function PraductCreate({ open, setOpen }) {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(null);
  const { setProduct } = useContext(AppContext);
  const [selectValue, setSelectValue] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const nowTimes = Date.now();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(url);
        });
      }
    );
  };

  const onFinish = async () => {
    handleUpload();
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.product`),
        {
          quanty: 0,
          select: selectValue,
          time: nowTimes,
          img: file,
          ...form.getFieldsValue(),
        }
      );
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: file,
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
                  <div className="wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      className="file_input"
                      onChange={handleChange}
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
