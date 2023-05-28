import {
  UserAddOutlined,
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
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
                <NavLink NavLink to="/">
                  Home
                </NavLink>
                <NavLink
                  to={
                    localStorage.getItem("userData") &&
                    JSON.parse(newUserData).token === true
                      ? "/sidebar"
                      : "/register"
                  }
                >
                  Shop
                </NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
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
