import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import OrderEdit from "../modal/OrderModal";

const items = (
  id,
  name,
  phone,
  email,
  status,
  deleteItem,
  addToBasket,
  open,
  setOpen
) => [
  {
    key: "1",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        onClick={() =>
          addToBasket({
            id: id,
            name: name,
            email: email,
            phone: phone,
          })
        }
      >
        View
      </li>
    ),
  },
  {
    key: "2",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
      >
        <OrderEdit open={open} setOpen={setOpen} id={id} statuss={status} />
      </li>
    ),
  },
  {
    key: "3",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
        onClick={() => deleteItem(id)}
      >
        Delete
      </li>
    ),
  },
];

export const OrderColumnsData = (deleteItem, addToBasket, open, setOpen) => [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Order ID",
    dataIndex: "id",
    key: "order_id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <Dropdown
        menu={{
          items: items(
            record?.id,
            record?.name,
            record?.email,
            record?.status,
            record?.phone,
            deleteItem,
            addToBasket,
            open,
            setOpen
          ),
        }}
        placement="bottomLeft"
      >
        <MoreOutlined />
      </Dropdown>
    ),
  },
];
