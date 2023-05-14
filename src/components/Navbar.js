import {
  UserAddOutlined,
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { NavbarContainer } from "../styles/components/NavbarStyles";

function Navbar() {
  const newUserData = localStorage.getItem("userData");

  return (
    <NavbarContainer>
      <header>
        <div className="container">
          <div className="navbar_wrap">
            <nav className="navbar">
              <ul className="navbar-collapse">
                <Link to="/">Home</Link>
                <Link
                  to={
                    localStorage.getItem("userData") &&
                    JSON.parse(newUserData).token === true
                      ? "/sidebar"
                      : "/register"
                  }
                >
                  Shop
                </Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </ul>
              <ul className="navbar-icon">
                <li>
                  <UserAddOutlined />
                </li>
                <li>
                  <SearchOutlined />
                </li>
                <li>
                  <HeartOutlined />
                </li>
                <li>
                  <ShoppingCartOutlined />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </NavbarContainer>
  );
}

export default Navbar;
