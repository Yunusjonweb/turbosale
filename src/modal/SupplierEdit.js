import InputMask from "react-input-mask";
import { Modal, Form, Input, Button } from "antd";
import { FormContainer } from "../styles/components/FormStyles";
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
        footer={null}
      >
        <FormContainer>
          <Form
            layout="vertical"
            name="nest-messages"
            style={{
              maxWidth: 600,
              height: 460,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Supplier Name"
              name={"supplierName"}
              rules={[{ required: true, message: "Write your supplier name!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Adress"
              name={"adress"}
              rules={[{ required: true, message: "Write your adress name!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product"
              name={"product"}
              rules={[{ required: true, message: "Write your product name!" }]}
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
            <Form.Item
              label="Quantity"
              name={"quantity"}
              rules={[
                { required: true, message: "Write your quantity number!" },
              ]}
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
