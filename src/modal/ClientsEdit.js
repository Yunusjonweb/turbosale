import { Modal, Form, Input } from "antd";
import { ClientsUpdate } from "./ClientsUpdate";

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
      <Modal
        title="Maxsulotlarni malumotlarni taxirilash"
        centered
        open={open}
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
      <li onClick={showModal}>Edit</li>
    </div>
  );
}
