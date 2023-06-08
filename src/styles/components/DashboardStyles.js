import styled from "styled-components";

export const DashboardContainer = styled.div`
  .dashboard_card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 1000px;
    height: 100px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    height: 60px;
  }

  .card_img {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #e9f2f7;
  }

  .card_title {
    color: #465362;
    font-size: 16px;
    font-weight: 400;
  }

  .card_title {
    color: #465362;
    font-size: 16px;
    font-weight: 400;
  }

  .card_numbers {
    color: #2d3a3a;
    font-size: 26px;
    font-weight: 600;
  }

  .card_line {
    width: 1px;
    height: 50px;
    background-color: #adb5bd;
  }

  .dashboard_charts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
  }

  .charts_title {
    margin: 10px;
    color: #1c1c1c;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  .product_statistic {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .charts_vertical,
  .charts_simple {
    width: 480px;
    height: 350px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
