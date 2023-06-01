import { UpdateData } from "./Update";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { FormContainer } from "../styles/components/FormStyles";

export default function EditModal({ modal2Open, setModal2Open, id }) {
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const price = Form.useWatch("orginalPrice", form);
  const sale = Form.useWatch("salePrice", form);
  const quantity = Form.useWatch("quantity", form);
  const textArea = Form.useWatch("textArea", form);

  const handleCancel = () => {
    setModal2Open(false);
  };

  const onFinish = () => {
    UpdateData(name, price, sale, quantity, textArea, id);
    setModal2Open(false);
  };

  const showModal = () => {
    setModal2Open(true);
  };

  return (
    <div className="modal">
      <Modal
        title="Maxsulotlarni malumotlarni taxirilash"
        centered
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
            form={form}
            onFinish={onFinish}
          >
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
