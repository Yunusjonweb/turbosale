import { UpdateData } from "./Update";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { FormContainer } from "../styles/components/FormStyles";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";

export default function EditModal({
  modal2Open,
  setModal2Open,
  id,
  name,
  orginalPrice,
  salePrice,
  quantityy,
  textAreaa,
}) {
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(null);
  const [form] = Form.useForm();
  const names = Form.useWatch("name", form);
  const price = Form.useWatch("orginalPrice", form);
  const sale = Form.useWatch("salePrice", form);
  const quantity = Form.useWatch("quantity", form);
  const textArea = Form.useWatch("textArea", form);

  const handleCancel = () => {
    setModal2Open(false);
  };

  const showModal = () => {
    setModal2Open(true);
  };

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
          console.log(url);
          setFile(url);
        });
      }
    );
  };

  const onFinish = () => {
    handleUpload();
    UpdateData(names, price, sale, quantity, textArea, file, id);
    setModal2Open(false);
  };

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("userEmail"));
    const product = doc(firestore, `${userEmail.email}.product`, id);
    const fileUploader = async () => {
      await updateDoc(product, {
        img: file,
      });
    };
    fileUploader();
  }, [file]);

  return (
    <div className="modal">
      <Modal
        title="Maxsulotlarni malumotlarni taxirilash"
        centered
        onCancel={handleCancel}
        open={modal2Open}
        footer={null}
      >
        <FormContainer>
          <Form
            layout="vertical"
            name="nest-messages"
            style={{
              maxWidth: 600,
              height: 490,
            }}
            initialValues={{
              name: name,
              quantity: quantityy,
              orginalPrice: orginalPrice,
              salePrice: salePrice,
              quantityy: quantityy,
              textArea: textAreaa,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="Mahsulot img" name={"img"}>
              <input type="file" accept="image/*" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Mahsulot nomi"
              name={"name"}
              rules={[{ required: true, message: "Write a product name!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Asl Narxi"
              name={"orginalPrice"}
              rules={[{ required: true, message: "Write a original price!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Sotuv narxi"
              name={"salePrice"}
              rules={[{ required: true, message: "Write a sale price!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Miqdori"
              name={"quantity"}
              rules={[{ required: true, message: "Write a quantity!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tasnif"
              name={"textArea"}
              rules={[{ required: true, message: "Write a textarea!" }]}
              hasFeedback
            >
              <Input.TextArea />
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
          </Form>
        </FormContainer>
      </Modal>
      <Button onClick={showModal}>
        <EditOutlined /> Edit
      </Button>
    </div>
  );
}
