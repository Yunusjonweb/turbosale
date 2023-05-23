export const ClientsDataColumns = [
  {
    title: "Full name",
    width: 100,
    dataIndex: "name",
    key: "1",
    fixed: "left",
  },
  {
    title: "Email",
    width: 100,
    dataIndex: "email",
    key: "2",
    fixed: "left",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 100,
    key: "3",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];
