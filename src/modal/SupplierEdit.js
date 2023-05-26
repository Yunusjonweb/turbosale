import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { UpdateData } from "./Update";

export default function SuppliearEdit({ open, setOpen }) {
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const price = Form.useWatch("orginalPrice", form);
  const sale = Form.useWatch("salePrice", form);
  const quantity = Form.useWatch("quantity", form);
  const textArea = Form.useWatch("textArea", form);

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    UpdateData(name, price, sale, quantity, textArea);
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
          <Form.Item label="Mahsulot nomi" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Asl Narxi" name={"orginalPrice"}>
            <Input />
          </Form.Item>
          <Form.Item label="Sotuv narxi" name={"salePrice"}>
            <Input />
          </Form.Item>
          <Form.Item label="Miqdori" name={"quantity"}>
            <Input />
          </Form.Item>
          <Form.Item label="Tasnif" name={"textArea"}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={showModal}>
        <EditOutlined /> Edit
      </Button>
    </div>
  );
}
