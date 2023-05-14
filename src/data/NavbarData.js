import {
  BulbOutlined,
  BellOutlined,
  UserOutlined,
  ImportOutlined,
  ShoppingCartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NavbarData = [
  {
    id: 1,
    icon: <BulbOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 2,
    icon: <BellOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 3,
    icon: <UserOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 4,
    icon: (
      <Link to={"/basket"}>
        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
      </Link>
    ),
  },
  {
    id: 5,
    icon: <ImportOutlined style={{ fontSize: "20px", color: "red" }} />,
    onclick: () => {
      localStorage.getItem("userData");
      const userData = {
        token: false,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    },
  },
];
