import { Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";

export default function EditModal({ modal2Open, setModal2Open, product }) {
  const { data, setData } = useContext(AppContext);
  const [edit, setEdit] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue({
      name: product.name,
      orginalPrice: product.orginalPrice,
      salePrice: product.salePrice,
      quantity: product.quantity,
      textArea: product.textArea,
    });
  }, [product]);

  const onFinish = () => {
    const editData = {
      id: v4(),
      quanty: 0,
      img: "https://t4.ftcdn.net/jpg/02/82/06/43/360_F_282064304_6KPa8Kpm8W80tOOVZ31Lq3562IDBf3Sc.jpg",
      ...form.getFieldsValue(),
    };
    const editFilter = data.filter((item) => item.id === product);
    console.log(editFilter);
    setData([...editFilter, editData]);
  };

  return (
    <div className="modal">
      <Modal
        title="Maxsulotlarni malumotlarni taxirilash"
        centered
        open={modal2Open}
        onOk={() => onFinish()}
        onCancel={() => setModal2Open(false)}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form
          layout="vertical"
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            name: product.name,
            orginalPrice: product.orginalPrice,
            salePrice: product.salePrice,
            quantity: product.quantity,
            textArea: product.textArea,
          }}
          form={form}
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
    </div>
  );
}
