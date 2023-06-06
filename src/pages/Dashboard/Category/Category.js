import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { CategoryContainer } from "../../../styles/components/CategoryStyle";
import { CloseOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import Loader from "../../../components/Loader";

export default function Category() {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const categoryName = Form.useWatch("categoryName", form);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const onFinish = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, `${userEmail.email}.category`),
        {
          id: uuidv4(),
          categoryName: categoryName,
        }
      );
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

  const colRef = collection(firestore, `${userEmail.email}.category`);

  const deleteCategory = async (categoryID) => {
    await deleteDoc(doc(firestore, `${userEmail.email}.category`, categoryID));
  };

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let product = [];
        snapshot.forEach((item) => {
          product.push({ ...item.data(), id: item.id });
        });
        setCategory(product);
      })
      .catch((err) => {
        console.log(err.message);
      });
    onSnapshot(colRef);
  }, [category]);

  return (
    <CategoryContainer>
      <div className="categorys">
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
            <Form
              layout="vertical"
              name="nest-messages"
              width={300}
              form={form}
            >
              <Form.Item label="New category" name={"categoryName"}>
                <Input name="categoryName" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="category_cards">
          {category.length ? (
            category.map((item) => (
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
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </CategoryContainer>
  );
}
