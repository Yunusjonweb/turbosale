import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { BestsellingContainer } from "../../styles/components/BestsellingProductStyles";

export default function BestsellingProduct() {
  const { order } = useContext(ProductContext);

  const filterSold = order.filter(
    (item) => item.status === "Sotildi" && item.quanty > 8
  );

  return (
    <BestsellingContainer>
      <div className="BestsellingProduct">
        <div className="product_title">Ko’p sotilgan mahsulot</div>
        <div className="BestsellingProduct_cards">
          {filterSold.map((item) => (
            <div className="BestsellingProduct_card">
              <div className="BestsellingProduct_info">
                <img
                  alt="example"
                  src={
                    item?.img
                      ? item?.img
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlJwcHC1tbVLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8e8vLxra2umpqa5ubnOzs51dXWvr6+WlpaGhobDw8OAgIBkZGR7e3uQkJBERETECcahAAACeUlEQVR4nO3b6W6qQBiAYWaxw7gdxAXc2vu/y4qIgIKpQo7x433+lUaTeYPDDGIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQffo3WN5jV7Go/74dw/nJXrsbH8+tYFRvZnQgAY0kNDAuE4kNLDp6quDxVxAA5P4LmsjP7cCGvzrtMajwTAb3G4NhtdAB7skWVdfMLgGOhqdroY2rBwaWgMd2fOA3aY8NrgGG5uviFz5mqE1WBeLaxtfhzywBnrliu3B7HpwaA12RQM7l/xZ0Kv9gyTzy3xgQsmfBR27sHU4epmfCNauBZ8HOnHKpa3j8Wl2C9KoRfkSeQ2Cw2lEbtx+Juy28SitLhTFNfD5ye6W7RG897UJQ1yDYHaZ85L6kB5Mk9Ia+LRYBP181SbKRfu7SGswVVd2URnU1O5bv0wT1sBvKzea3a48PUJj4mlLBFkN9Lp6r91OouJ45LKV4bo5grAGe6uqEYqFUL5btGbXGEFUg3I3cN0UnCPoL3NpkjSNU1QDP7LqNsJ5Eig2Cc1rJ0kNKhvjMsJpJvTj8rgL7z8OkhoE8e1pkP1vdLouVv52x7vlkqAG2WapgTlua2nur5GSGkyaEmQz4e0cEdUjyGng//w9vLWr2nDlNJjO/pggWyjUrpFiGujomccxajdZBtpAua3A+0hPNlBuc708SGrQsDp4wByKLZSgBmr2nMnssoUS0+B0YXhe/i6CGryMBlIaJL6Tg4AG9vgddvCdrzA/u4Hq+NC+ktCgFzSgAQ0+u0H60+2p/ZoPbRB1eWb/1qf+uK9P7x4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHvzkNNPrHNmiDAAAAAElFTkSuQmCC"
                  }
                  className="praducts_img"
                />
                <div className="products_title">{item.name}</div>
                <div className="products_quantity">
                  {item.quanty ? item.quanty + " dona" : null}
                </div>
                <div className="products_price">
                  {item.orginalPrice ? item.orginalPrice + "$" : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BestsellingContainer>
  );
}
