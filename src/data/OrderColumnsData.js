import { Button, Select } from "antd";

export const OrderColumnsData = [
  {
    title: "Ism",
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
    render: () => (
      <Select
        options={[
          {
            value: "Qabul qilindi",
            label: "Qabul qilindi",
          },
          {
            value: "Kutilmoqda",
            label: "Kutilmoqda",
          },
          {
            value: "Rad Etilgan",
            label: "Rad Etilgan",
          },
        ]}
      />
    ),
  },
];
