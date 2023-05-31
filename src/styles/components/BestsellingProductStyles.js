import styled from "styled-components";

export const BestsellingContainer = styled.div`
  .BestsellingProduct {
    margin-top: 20px;
  }

  .product_title {
    font-weight: 600;
    font-size: 18px;
    color: #1c1c1c;
  }

  .BestsellingProduct_card {
    width: 480px;
    height: 60px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 20px;
    border-radius: 5px;
  }

  .BestsellingProduct_info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 10px;
  }

  .praducts_img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }

  .products_title,
  .products_quantity {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #040f0f;
  }

  .products_price {
    color: #29cf3f;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
  }
`;
