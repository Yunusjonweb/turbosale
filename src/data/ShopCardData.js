import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ShopCardData = (plusHandler, minusHandle, deleteItem) => [
  {
    title: "Product name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    render: (_, record) => (
      <p>{record?.orginalPrice ? record?.orginalPrice + " " + "USD" : null}</p>
    ),
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
        <Button onClick={() => minusHandle(record?.id, record?.idd)}>-</Button>
        <p>{record?.quanty ? record?.quanty + "x" : null}</p>
        <Button onClick={() => plusHandler(record?.id, record?.idd)}>+</Button>
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
              .toFixed(2)
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
    render: (_, record) => (
      <Button onClick={() => deleteItem(record?.id)}>
        <CloseOutlined />
      </Button>
    ),
  },
];
