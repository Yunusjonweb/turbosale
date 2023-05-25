import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ShopCardData = (plusHandler, minusHandle) => [
  {
    title: "Product name",
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
    dataIndex: "id",
    key: "id",
    render: (_, record) => (
      <div
        className="btn_quanty"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button onClick={() => minusHandle(record?.id)}>-</Button>
        <p>{record?.quanty}</p>
        <Button onClick={() => plusHandler(record?.id)}>+</Button>
      </div>
    ),
  },
  {
    title: "Total Price",
    key: "quanty",
    render: (_, record) => (
      <p>
        {record
          ? ((record?.orginalPrice * record?.quanty) / record?.prosent)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "USD"
          : null}
      </p>
    ),
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
