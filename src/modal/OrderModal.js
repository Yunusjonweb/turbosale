import { Modal, Form, Input, Button } from "antd";
import { FormContainer } from "../styles/components/FormStyles";
import { OrderUpdate } from "./OrderUpdate";

export default function OrderEdit({ open, setOpen, id, statuss }) {
  const [form] = Form.useForm();
  const status = Form.useWatch("status", form);

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    OrderUpdate(status, id);
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="modal">
      <Modal
        title="Order status update"
        centered
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <FormContainer>
          <Form
            layout="vertical"
            name="nest-messages"
            style={{
              maxWidth: 600,
              height: 130,
            }}
            form={form}
            onFinish={onFinish}
            initialValues={{
              status: statuss,
            }}
          >
            <Form.Item
              label="Status"
              name={"status"}
              rules={[{ required: true, message: "Write your status!" }]}
              hasFeedback
            >
              <Input />
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
