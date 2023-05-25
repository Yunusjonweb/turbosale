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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => <Button>Sotildi</Button>,
  },
];
