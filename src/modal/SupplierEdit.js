import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { SupplierUpdate } from "./SupplierUpdate";

export default function SuppliearEdit({ open, setOpen, id }) {
  const [form] = Form.useForm();
  const supplierName = Form.useWatch("supplierName", form);
  const adress = Form.useWatch("adress", form);
  const product = Form.useWatch("product", form);
  const phone = Form.useWatch("phone", form);
  const quantity = Form.useWatch("quantity", form);

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    SupplierUpdate(supplierName, adress, product, phone, quantity, id);
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
          <Form.Item label="Supplier Name" name={"supplierName"}>
            <Input />
          </Form.Item>
          <Form.Item label="Adress" name={"adress"}>
            <Input />
          </Form.Item>
          <Form.Item label="Product" name={"product"}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name={"phone"}>
            <Input />
          </Form.Item>
          <Form.Item label="Quantity" name={"quantity"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={showModal}>
        <EditOutlined /> Edit
      </Button>
    </div>
  );
}
