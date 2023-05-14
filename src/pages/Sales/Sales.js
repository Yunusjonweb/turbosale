import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Ism",
    dataIndex: "name",
    key: "ism",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Telefon",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Summa",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "To’lov turi",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Sana",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Holat",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const Sales = () => <Table columns={columns} dataSource={data} />;
export default Sales;
