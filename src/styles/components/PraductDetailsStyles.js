import styled from "styled-components";

export const DetailsContainer = styled.div`
  .praductDetails {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 5px;
    flex-direction: column;
    border: 2px solid #d4d4d4;
  }

  .praductDetail {
    width: 900px;
    display: flex;
    justify-content: space-between;
  }

  .praductDetails_img {
    width: 300px;
    height: 300px;
  }

  .praductDetail_img {
    width: 350px;
    height: 300px;
    border-radius: 10px;
  }

  .praductDetail_data {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }

  .praductDetails_info {
    width: 500px;
  }

  .praductDetail_title,
  .praductDetail_price {
    font-weight: 400;
    font-size: 16px;
    color: #4b5563;
    margin: 5px;
  }

  .praductDetail_description {
    font-size: 16px;
    margin: 5px;
    color: #4b5563;
  }

  .praductDetail_card {
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
  }

  .praduct_cards {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    gap: 20px;
  }

  .praductDetail_card_color p {
    font-size: 16px;
    color: #4b5563;
  }

  .praductDetail_quantity {
    margin: 10px;
  }

  .praductDetail_quantity_button button {
    margin: 5px;
  }

  .praductDetail_quantity_title {
    margin-top: 50px;
    color: #4b5563;
    font-weight: 500;
    font-size: 16px;
  }

  .praductDetail_buy {
    display: flex;
    float: right;
    gap: 10px;
  }

  .return_btn {
    margin-top: 30px;
  }
`;
