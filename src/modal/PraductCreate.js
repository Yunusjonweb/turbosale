import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { FormContainer } from "../styles/components/FormStyles";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
const { TextArea } = Input;

export default function PraductCreate({ open, setOpen }) {
  const [form] = Form.useForm();
  const { setProduct } = useContext(AppContext);
  const [selectValue, setSelectValue] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const nowTimes = Date.now();

  function imgUploader(file) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file[0].name}`);

    uploadBytes(storageRef, file[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }
  useEffect(() => {
    downloader();
  }, [selectedImage]);

  function downloader() {
    const storage = getStorage();
    const desertRef = ref(storage, `images/${selectedImage}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    console.log(selectedImage);
    return getDownloadURL(ref(storage, `images/${selectedImage}`))
      .then((url) => {
        console.log(url);
        setSelectedImageUrl(url);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.product`),
        {
          quanty: 0,
          select: selectValue,
          time: nowTimes,
          img: selectedImageUrl,
          ...form.getFieldsValue(),
        }
      );
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: selectedImageUrl,
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
                      className="file_input"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0].name);
                        imgUploader(event.target.files);
                      }}
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
