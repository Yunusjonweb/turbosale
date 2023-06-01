import { Modal, Form, Input, Button } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase";
import InputMask from "react-input-mask";
import { FormContainer } from "../styles/components/FormStyles";

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
      <Modal title="Add a Client" centered open={modal2Open} footer={null}>
        <FormContainer>
          <Form
            layout="vertical"
            name="nest-messages"
            style={{
              maxWidth: 600,
              height: 300,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Write your name!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Write your email!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Write down the phone number!" },
              ]}
              hasFeedback
            >
              <InputMask
                mask="+998 (99) 999-99-99"
                maskChar={null}
                className="ant-input css-dev-only-do-not-override-k7429z"
              />
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
      <Button onClick={showModal}>Create Clients</Button>
    </div>
  );
}
