import React, { useContext, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Praduct from "../pages/Dashboard/Praduct";
import Praducts from "../pages/Dashboard/Praducts";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Login from "../pages/Auth/Login";
import TuboSaleLogo from "../assets/TuboSaleLogo.png";
import PraductCreate from "../modal/PraductCreate";
import PraductDetails from "../pages/Dashboard/PraductDetails";
import { NavbarData } from "../data/NavbarData";
import { SiderBarData } from "../data/SidebarData";
import { SidebarContainer } from "../styles/components/SidebarStyles";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { ProductContext } from "../context/ProductContext";
import { AppstoreAddOutlined } from "@ant-design/icons";
import ShopCard from "../pages/Dashboard/ShopCard";
import Sales from "../pages/Sales/Sales";
import AppContext from "antd/es/app/context";
import Translations from "../pages/Dashboard/Translations";
const { Header, Content, Sider } = Layout;

const SideBar = () => {
  const { pathname } = useLocation();
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const { data, setData } = useContext(AppContext);
  const str = pathname.slice();
  let result = str.charAt(1).toUpperCase() + str.slice(2);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items1 = NavbarData.map((item) => ({
    key: item.id,
    label: (
      <button className="icon_btn" onClick={item.onclick}>
        {item.icon} {item.id === 4 ? order.length : null}
      </button>
    ),
  }));

  const items2 = SiderBarData.map((item) => {
    return {
      key: item.id,
      icon: item.icon,
      label: <Link to={item.link}>{item.title}</Link>,
    };
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quanty: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quanty: orderItem.quanty + 1,
          };
        } else {
          return item;
        }
      });
      setOrder(newOrder);
    }
  };

  const deletItem = (id) => {
    const filteredUsers = data.filter((user) => user.id !== id);
    setData(filteredUsers);
  };

  return (
    <SidebarContainer>
      <Layout>
        <Header className="headers">
          <div className="headers_item">
            <div className="logo_brand">
              <img src={TuboSaleLogo} alt="Tubo Sale Logo" />
            </div>
            <div className="navbar">
              <Menu
                className="header"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={items1}
              />
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
                fontSize: "16px",
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div className="content_data">
              <div className="content_title">{result}</div>
              <div className="content_button">
                <Button type="primary" onClick={() => handleToggle()}>
                  <AppstoreAddOutlined /> Create Shop
                </Button>
              </div>
            </div>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <ProductContext.Provider value={{ order, setOrder, addToBasket }}>
                <Routes>
                  <Route path="/dashboard" element={<Praducts />} />
                  <Route path="/praducts" element={<Praduct />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/details/:userId"
                    element={<PraductDetails deletItem={deletItem} />}
                  />
                  <Route path="/basket" element={<ShopCard />} />
                  <Route path="/trans" element={<Translations />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ProductContext.Provider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <PraductCreate open={open} setOpen={setOpen} />
    </SidebarContainer>
  );
};
export default SideBar;
