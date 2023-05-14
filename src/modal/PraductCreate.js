import React, { useContext, useState, useRef } from "react";
import { Form, Input, Select, Modal } from "antd";
import { PraductCreateContainer } from "../styles/components/PraductCreateStyles";
import { AppContext } from "../context/ContextProvider";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import User from "../assets/User.png";

const { TextArea } = Input;

export default function PraductCreate({ open, setOpen }) {
  const [form] = Form.useForm();
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(null);
  const inputRef = useRef(null);
  const { product, setProduct } = useContext(AppContext);

  const handleClick = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, img).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
    inputRef.current.click();
  };

  const handleImagesChange = (e) => {
    setImg(e.target.files[0]);
  };

  const onFinish = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "product"), {
        img: url,
        quanty: 0,
        ...form.getFieldsValue(),
      });
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          id: docRef.id,
          quanty: 0,
          img: url,
        },
      ]);
      console.log("Document written with ID: ", docRef.id);
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
                  style={{
                    width: 200,
                  }}
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
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                    {
                      value: "3",
                      label: "Communicated",
                    },
                    {
                      value: "4",
                      label: "Identified",
                    },
                    {
                      value: "5",
                      label: "Resolved",
                    },
                    {
                      value: "6",
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
