import { Table } from "antd";
import { ClientsData } from "../../../data/ClientsData";
import { ClientsDataColumns } from "../../../data/ClientsDataColumns";

const Clients = () => (
  <div className="clients">
    <Table
      columns={ClientsDataColumns}
      dataSource={ClientsData}
      scroll={{
        x: 900,
      }}
    />
  </div>
);
export default Clients;
