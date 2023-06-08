import InputMask from "react-input-mask";
import { Modal, Form, Input, Button } from "antd";
import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { firestore, storage } from "../firebase/firebase";
import { FormContainer } from "../styles/components/FormStyles";

export default function SupplierModal({ modal2Open, setModal2Open }) {
  const [form] = Form.useForm();
  const { setProduct } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(null);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

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
        collection(firestore, `${userEmail.email}.supplier`),
        {
          img: file,
          ...form.getFieldsValue(),
        }
      );
      setProduct((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          img: file,
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
            </div>
            <div className="form_item">
              <Form.Item
                name="supplierName"
                label="Supplier name"
                rules={[
                  { required: true, message: "Write down the Supplier name!" },
                ]}
                hasFeedback
              >
                <Input name={"supplierName"} />
              </Form.Item>
              <Form.Item
                name="adress"
                label="Adress"
                rules={[
                  { required: true, message: "Write down the Adress name!" },
                ]}
                hasFeedback
              >
                <Input name={"adress"} />
              </Form.Item>
              <Form.Item
                name="product"
                label="Product"
                rules={[
                  { required: true, message: "Write down the Product name!" },
                ]}
                hasFeedback
              >
                <Input name={"product"} />
              </Form.Item>
            </div>
            <div className="form_item">
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Write down the phone number!" },
                ]}
                hasFeedback
              >
                <InputMask
                  maskChar={null}
                  mask="+998 (99) 999-99-99"
                  className="ant-input css-dev-only-do-not-override-k7429z"
                />
              </Form.Item>
              <Form.Item
                name="price"
                label="Narxi"
                rules={[{ required: true, message: "Write down the Price!" }]}
                hasFeedback
              >
                <Input name={"price"} />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Miqdori"
                rules={[
                  { required: true, message: "Write down the Quantity!" },
                ]}
                hasFeedback
              >
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
