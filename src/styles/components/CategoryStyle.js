import styled from "styled-components";

export const CategoryContainer = styled.div`
  .categorys {
    display: flex;
    flex-direction: column;
  }

  .category_btn {
    color: #fff;
    float: right;
    font-size: 14px;
    font-weight: bold;
    margin: 20px;
    background: #465362;
  }

  .category_cards {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }

  .category_card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 320px;
    height: 75px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .category_title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #040f0f;
  }

  .category_icon {
    font-size: 18px;
  }
`;
