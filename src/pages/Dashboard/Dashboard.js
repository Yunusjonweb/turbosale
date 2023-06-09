import React, { useContext } from "react";
import ChartsComp from "./Charts/ChartsComp";
import VerticalComp from "./Charts/VerticalComp";
import { DashboardContainer } from "../../styles/components/DashboardStyles";
import { ProductContext } from "../../context/ProductContext";
import { Costs, Marja, SoldProduct, TotalIncome } from "../../utils/Images";
import BestsellingProduct from "./BestsellingProduct";
import ClientsLot from "./ClientsLot";

export default function Dashboard() {
  const { order } = useContext(ProductContext);
  const filterSold = order.filter((item) => item.status === "Sotildi");

  const totalPrice = filterSold.reduce((sum, el) => {
    return sum + el.salePrice * el.quanty;
  }, 0);

  const totalQuantity = filterSold.reduce((sum, el) => {
    return sum + el.quanty;
  }, 0);

  const profitPrice = filterSold.reduce((sum, el) => {
    return sum + totalPrice - el.orginalPrice;
  }, 0);

  const costPrice = filterSold.reduce((sum, el) => {
    return sum + el.salePrice / el.quanty;
  }, 0);

  const totalPrices = (value) => {
    return value
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <DashboardContainer>
      <div className="dashboard">
        <div className="dashboard_card">
          <div className="card">
            <div className="card_img">
              <SoldProduct />
            </div>
            <div className="card_data">
              <div className="card_title">Sotilgan Mahsulot</div>
              <div className="card_numbers">
                {totalQuantity ? totalQuantity : 0}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_img">
              <Costs />
            </div>
            <div className="card_data">
              <div className="card_title">Xarajatlar</div>
              <div className="card_numbers">
                {totalPrices(costPrice) ? "$" + totalPrices(costPrice) : null}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_img">
              <Marja />
            </div>
            <div className="card_data">
              <div className="card_title">Foyda</div>
              <div className="card_numbers">
                {totalPrices(profitPrice)
                  ? "$" + totalPrices(profitPrice)
                  : null}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_img">
              <TotalIncome />
            </div>
            <div className="card_data">
              <div className="card_title">Umumiy Daromad</div>
              <div className="card_numbers">
                {totalPrices(totalPrice) ? "$" + totalPrices(totalPrice) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_charts">
          <div className="charts_vertical">
            <div className="charts_title">Eng ko’p sotilgan tovarlar</div>
            <VerticalComp />
          </div>
          <div className="charts_simple">
            <div className="charts_title">Ko’p sotilgan top 10 mahsulot</div>
            <ChartsComp />
          </div>
        </div>
        <div className="product_statistic">
          <BestsellingProduct />
          <ClientsLot />
        </div>
      </div>
    </DashboardContainer>
  );
}
