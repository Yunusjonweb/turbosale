import React, { useState } from "react";
import { Card, Button, Input, Select } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  FilterOutlined,
  ShrinkOutlined,
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { ProductContainer } from "../../styles/components/PraductStyles";
import { NavLink } from "react-router-dom";
import EditModal from "../../modal/EditModal";
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
const provinceData = ["Category", "Stol", "Kreslo", "Devan"];
const { Meta } = Card;

export default function Praduct() {
  const [search, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const { product, setProduct } = useContext(AppContext);
  const [todos, setTodos] = useState(6);
  const [current, setCurrent] = useState(1);
  const [selectedItem, setSelectedItem] = useState({});

  const numOfTotalPages = Math.ceil(product.length / todos);
  const pages = [...Array(current + 1).keys()].slice(1);
  const newOfLastPages = current * todos;
  const newOfFristPages = newOfLastPages - todos;

  const visiblePages = product.slice(newOfFristPages, newOfLastPages);

  const prevHandlerPage = () => {
    if (current !== 1) {
      setCurrent(current - 1);
    }
  };

  const nextHandlerPage = () => {
    if (current !== numOfTotalPages) {
      setCurrent(current + 1);
    }
  };

  const handleChange = (value) => {
    setTodos(value);
  };

  const handleToggle = () => {
    return setModal2Open(!modal2Open);
  };

  const newFiltersUser = (id) => {
    const newUsers = product.filter((item) => item.id === id);
    localStorage.setItem("newUsers", JSON.stringify(newUsers));
  };

  const plusHandle = (users) => {
    const userDatas = product.map((user) => {
      if (user.id === users) {
        const newQuanty = user.quanty + 1;
        return {
          ...user,
          quanty: newQuanty,
        };
      } else {
        return user;
      }
    });
    setProduct(userDatas);
  };

  const minusHandle = (users) => {
    const userDatas = product.map((user) => {
      console.log(user);
      if (user.id === users) {
        const newQuanty = user.quanty - 1;
        return {
          ...user,
          quanty: newQuanty >= 0 ? newQuanty : 0,
        };
      } else {
        return user;
      }
    });
    setProduct(userDatas);
  };

  return (
    <ProductContainer>
      <div className="praducts_form">
        <div className="praducts_input">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="praducts_btns">
          <Button>
            <SortAscendingOutlined />
          </Button>
          <Button>
            <FilterOutlined />
          </Button>
          <Select
            defaultValue={provinceData[0]}
            style={{
              width: 120,
            }}
            options={provinceData.map((province) => ({
              label: province,
              value: province,
            }))}
          />
          <Button>
            Last Added <ShrinkOutlined />
          </Button>
        </div>
      </div>
      <div className="praducts">
        {
          (visiblePages?.length,
          visiblePages
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => {
              return (
                <Card
                  key={item?.id}
                  style={{
                    width: 300,
                  }}
                  cover={
                    <NavLink
                      to={`/details/${item?.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        alt="example"
                        src={item?.img}
                        className="praducts_img"
                        onClick={() => newFiltersUser(item?.id)}
                      />
                    </NavLink>
                  }
                  actions={[
                    <button className="icon_btn">
                      {item?.orginalPrice ? item?.orginalPrice + "$" : null}
                    </button>,
                    <button className="icon_btn">
                      <del>
                        {item?.salePrice ? item?.salePrice + "$" : null}
                      </del>
                    </button>,
                    <button
                      className="icon_btn"
                      onClick={() => minusHandle(item?.id)}
                    >
                      <MinusOutlined />
                    </button>,
                    <button
                      className="icon_btn"
                      onClick={() => plusHandle(item?.id)}
                    >
                      <PlusOutlined />
                    </button>,
                  ]}
                >
                  <div className="profile_data  ">
                    <Meta title={item?.name} />
                    <span className="products_quantity">
                      ({item?.quanty ? item?.quanty : 0})
                    </span>
                  </div>
                  <img
                    alt="example"
                    src={item?.img}
                    className="praducts_img"
                    onClick={() => newFiltersUser(item?.id)}
                  />
                </Card>
              );
            }))
        }
      </div>
      <div className="pagination">
        <Button className="papagination_btn" onClick={() => prevHandlerPage()}>
          <LeftOutlined />
        </Button>
        <span>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrent(page)}
              className={todos === page ? "page_active" : "page_item"}
            >{`${page}`}</span>
          ))}
        </span>
        <Button className="papagination_btn" onClick={() => nextHandlerPage()}>
          <RightOutlined />
        </Button>
        <Select
          onChange={handleChange}
          defaultValue="6"
          style={{
            width: 60,
          }}
          options={[
            {
              value: 6,
              label: "6",
            },
            {
              value: 8,
              label: "8",
            },
            {
              value: 10,
              label: "10",
            },
            {
              value: 12,
              label: "12",
            },
          ]}
        />
      </div>
      <EditModal
        modal2Open={modal2Open}
        setModal2Open={handleToggle}
        product={selectedItem}
      />
    </ProductContainer>
  );
}
