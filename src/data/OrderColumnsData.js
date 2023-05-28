import { Select } from "antd";

export const OrderColumnsData = (selectFunc, optionValue) => [
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
      <Select
        style={{ width: 140 }}
        onChange={(status) => selectFunc(status, record?.id)}
      >
        {optionValue.map((item) => (
          <Select.Option style={{ color: item.color }} key={item.status}>
            {item.status}
          </Select.Option>
        ))}
      </Select>
    ),
  },
];
