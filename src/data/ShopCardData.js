import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ShopCardData = [
  {
    title: "Product img",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "orginalPrice",
    key: "price",
  },
  {
    title: "Add",
    dataIndex: "quanty",
    key: "quanty",
    render: () => <Button>+</Button>,
  },
  {
    title: "Total Price",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Remove",
    key: "tags",
    dataIndex: "tags",
    render: () => (
      <div>
        <CloseOutlined />
      </div>
    ),
  },
];
