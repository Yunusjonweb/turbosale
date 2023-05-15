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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
`;
