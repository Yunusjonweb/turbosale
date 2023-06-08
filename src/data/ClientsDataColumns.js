import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import ClientsEdit from "../modal/ClientsEdit";

const items = (
  id,
  name,
  phone,
  email,
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
        <ClientsEdit
          open={open}
          setOpen={setOpen}
          id={id}
          names={name}
          emails={email}
          phones={phone}
        />
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

export const ClientsColumnsData = (deleteItem, addToBasket, open, setOpen) => [
  {
    title: "Client img",
    key: "name",
    render: (_, record) => (
      <img
        src={
          record?.img
            ? record?.img
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
        }
        alt={record?.supplierName}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    ),
  },
  {
    title: "Full name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Dropdown
        menu={{
          items: items(
            record?.id,
            record?.name,
            record?.email,
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
