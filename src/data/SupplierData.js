import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
const items = [
  {
    key: "1",
    label: (
      <li style={{ border: "none", boxShadow: "none", width: "100%" }}>View</li>
    ),
  },
  {
    key: "2",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
      >
        Edit
      </li>
    ),
  },
  {
    key: "3",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
      >
        Delete
      </li>
    ),
  },
];

export const SupplierColumnsData = [
  {
    title: "Full name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <MoreOutlined />
      </Dropdown>
    ),
  },
];
