import React, { useState } from "react";
import { Button, Form, Modal, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { CategoryContainer } from "../../../styles/components/CategoryStyle";
import { CloseOutlined } from "@ant-design/icons";

export default function Category() {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const categoryName = Form.useWatch("categoryName", form);

  const onFinish = async () => {
    try {
      setCategory((prevProduct) => [
        ...prevProduct,
        {
          id: uuidv4(),
          categoryName: categoryName,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModal2Open(false);
  };

  const deleteCategory = (categoryID) => {
    const categoryFilter = category.filter((item) => item.id !== categoryID);
    setCategory(categoryFilter);
  };

  return (
    <CategoryContainer>
      <div className="category">
        <Button className="category_btn" onClick={() => setModal2Open(true)}>
          Create Category
        </Button>
        <Modal
          title="Category"
          centered
          open={modal2Open}
          onOk={() => onFinish()}
          okText={"Create"}
          onCancel={() => setModal2Open(false)}
        >
          <Form layout="vertical" name="nest-messages" width={300} form={form}>
            <Form.Item label="New category" name={"categoryName"}>
              <Input name="categoryName" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="category_cards">
        {category.map((item) => (
          <div className="category_card">
            <div className="category_title" key={item.id}>
              {item.categoryName}
            </div>
            <div
              className="category_icon"
              onClick={() => deleteCategory(item.id)}
            >
              <CloseOutlined />
            </div>
          </div>
        ))}
      </div>
    </CategoryContainer>
  );
}
