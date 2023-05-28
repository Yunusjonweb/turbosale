import { Modal, Form, Input, Button } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase";

export default function ClientsModal({ modal2Open, setModal2Open }) {
  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);

  const handleCancel = () => {
    setModal2Open(false);
  };

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.clients`),
        {
          ...form.getFieldsValue(),
        }
      );
      setClients((prevProduct) => [
        ...prevProduct,
        {
          ...form.getFieldsValue(),
          id: docRef.id,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModal2Open(false);
  };

  const showModal = () => {
    setModal2Open(true);
  };

  return (
    <div className="modal">
      <Modal
        title="Add a Client"
        centered
        open={modal2Open}
        onOk={() => onFinish()}
        onCancel={() => handleCancel()}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form
          layout="vertical"
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          form={form}
          setFields={form.getFieldsValue}
        >
          <Form.Item label="Name" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name={"phone"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={showModal}>Create Clients</Button>
    </div>
  );
}
