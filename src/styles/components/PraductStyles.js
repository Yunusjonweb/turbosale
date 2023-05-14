import styled from "styled-components";

export const ProductContainer = styled.div`
  .praducts {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .profile_data {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .praducts_form {
    width: 940px;
    height: 70px;
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .praducts_btns button {
    margin: 10px;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }

  .page_item {
    margin: 15px;
    cursor: pointer;
    padding: 8px 15px;
  }

  .page_active {
    border-radius: 5px;
    padding: 8px 15px;
    border: 1px solid #1677ff;
  }

  .icon_btn,
  .papagination_btn {
    border: none;
    cursor: pointer;
    color: grey;
    font-size: 16px;
    background-color: transparent;
  }

  .praducts_img {
    width: 300px;
    height: 200px;
    cursor: pointer;
  }
`;
