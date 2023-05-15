import React from "react";
import ChartsComp from "./Charts/ChartsComp";
import VerticalComp from "./Charts/VerticalComp";
import { DashboardContainer } from "../../styles/components/DashboardStyles";
import { SoldProduct } from "../../utils/Images";
import { DashboardData } from "../../data/DashboardData";

export default function Dashboard() {
  return (
    <DashboardContainer>
      <div className="dashboard">
        <div className="dashboard_card">
          {DashboardData.map((item) => (
            <div className="card" key={item.key}>
              <div className="card_img">{item.img}</div>
              <div className="card_data">
                <div className="card_title">{item.title}</div>
                <div className="card_numbers">${item.number}</div>
              </div>
            </div>
          ))}
        </div>
        <ChartsComp />
        <VerticalComp />
      </div>
    </DashboardContainer>
  );
}
