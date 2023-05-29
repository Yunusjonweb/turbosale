import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import SuppliearEdit from "../modal/SupplierEdit";

const items = (id, supplierName, deleteItem, addToBasket, open, setOpen) => [
  {
    key: "1",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        onClick={() =>
          addToBasket({
            id: id,
            supplierName: supplierName,
          })
        }
      >
        View
      </li>
    ),
  },
  {
    key: "2",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
      >
        <SuppliearEdit open={open} setOpen={setOpen} id={id} />
      </li>
    ),
  },
  {
    key: "3",
    label: (
      <li
        style={{ border: "none", boxShadow: "none", width: "100%" }}
        className="btn"
        onClick={() => deleteItem(id)}
      >
        Delete
      </li>
    ),
  },
];

export const SupplierColumnsData = (deleteItem, addToBasket, open, setOpen) => [
  {
    title: "Product img",
    key: "name",
    render: (_, record) => (
      <img
        src={
          record?.img
            ? record?.img
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
        }
        alt={record?.supplierName}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    ),
  },
  {
    title: "Full name",
    dataIndex: "supplierName",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "adress",
    key: "adress",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Dropdown
        menu={{
          items: items(
            record?.id,
            record?.supplierName,
            deleteItem,
            addToBasket,
            open,
            setOpen
          ),
        }}
        placement="bottomLeft"
      >
        <MoreOutlined />
      </Dropdown>
    ),
  },
];
