import { Button } from "antd";

export const SalesColumnsData = [
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
    title: "Date",
    dataIndex: "date",
    key: "date",
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
    title: "Status",
    key: "status",
    render: (_, record) => (
      <Button style={{ color: `${record?.status}` ? "blue" : "red" }}>
        {record?.status ? record?.status : "Aniqlanmagan"}
      </Button>
    ),
  },
];
