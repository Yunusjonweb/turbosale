import { Button } from "antd";

export const SalesColumnsData = [
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
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "To’lov turi",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => <Button>Sotildi</Button>,
  },
];
