import React, { useEffect, useState } from "react";
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
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { firestore } from "../../firebase/firebase";
import { AppContext } from "../../context/ContextProvider";
import { ProductContainer } from "../../styles/components/PraductStyles";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const { Meta } = Card;
const provinceData = ["All", "Stol", "Kreslo", "Devan", "Shkaf", "Xontaxta"];

export default function Praduct() {
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState([]);
  const [todos, setTodos] = useState(6);
  const [current, setCurrent] = useState(1);
  const { product } = useContext(AppContext);
  const loader = [];

  useEffect(() => {
    setFilter(product);
  }, [product]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const numOfTotalPages = Math.ceil(product.length / todos);
  const pages = [...Array(current + 1).keys()].slice(1);
  const newOfLastPages = current * todos;
  const newOfFristPages = newOfLastPages - todos;

  const visiblePages = product.slice(newOfFristPages, newOfLastPages);

  const productSort = async () => {
    const products = collection(firestore, `${userEmail.email}.product`);
    const q = await query(products, orderBy("name"), limit(6));
    const docs = await getDocs(q);
    const productSort = docs.docs.map((doc) => doc.data());
    setFilter(productSort);
  };

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

  const plusHandle = (id) => {
    const userDatas = filters.map((user) => {
      if (user.id === id) {
        const newQuanty = user.quanty + 1;
        return {
          ...user,
          quanty: newQuanty,
        };
      } else {
        return user;
      }
    });
    setFilter(userDatas);
  };

  const minusHandle = (id) => {
    const userDatas = filters.map((user) => {
      console.log(user);
      if (user.id === id) {
        const newQuanty = user.quanty - 1;
        return {
          ...user,
          quanty: newQuanty >= 0 ? newQuanty : 0,
        };
      } else {
        return user;
      }
    });
    setFilter(userDatas);
  };

  const CategoryFilter = (value) => {
    if (value === "All") {
      return setFilter(product);
    } else {
      const productFilter = filters.filter((item) => item.select === value);
      setFilter(productFilter);
    }
  };

  const PriceFilter = () => {
    const priceSort = filters.sort(
      (a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice)
    );
    setFilter([...priceSort]);
    console.log(priceSort);
  };

  const LastAdded = () => {
    // const productLength = filters.sort((a, b) => {
    //   if (a > b) {
    //     return 1;
    //   }
    //   if (a < b) {
    //     return -1;
    //   }
    //   return 0;
    // }, 0);
    // console.log(productLength);
    const productLength = filters.at(-1);
    setFilter(productLength);
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
          <Button onClick={() => productSort()}>
            <SortAscendingOutlined />
          </Button>
          <Button onClick={() => PriceFilter()}>
            <FilterOutlined />
          </Button>
          <Select
            onChange={(value) => CategoryFilter(value)}
            defaultValue={provinceData[0]}
            style={{
              width: 120,
            }}
            options={provinceData.map((province) => ({
              label: province,
              value: province,
            }))}
          />
          <Button onClick={() => LastAdded()}>
            Last Added <ShrinkOutlined />
          </Button>
        </div>
      </div>
      <div className="praducts">
        {filters.length ? (
          (visiblePages?.length,
          filters
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
                        src={
                          item?.img
                            ? item?.img
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
                        }
                        className="praducts_img"
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
                </Card>
              );
            }))
        ) : (
          <Loader />
        )}
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
    </ProductContainer>
  );
}
