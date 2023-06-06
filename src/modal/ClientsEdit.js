import { Modal, Form, Input, Button } from "antd";
import InputMask from "react-input-mask";
import { ClientsUpdate } from "./ClientsUpdate";
import { FormContainer } from "../styles/components/FormStyles";

export default function ClientsEdit({ open, setOpen, id }) {
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const phone = Form.useWatch("phone", form);

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    ClientsUpdate(name, email, phone, id);
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="modal">
      <Modal title="Clients data edit" centered open={open} footer={null}>
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
              name={"name"}
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
      <li onClick={showModal}>Edit</li>
    </div>
  );
}
