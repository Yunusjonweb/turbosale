import styled from "styled-components";

export const FooterContainer = styled.div`
  .footer {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
  }

  .footer_wrap {
    display: flex;
    justify-content: space-around;
  }

  .footer_title {
    color: #9f9f9f;
    font-size: 18px;
  }

  .footer_col ul {
    list-style: none;
  }

  .footer_col li {
    font-size: 18px;
    color: #000;
  }

  .footer_col input {
    width: 200px;
    height: 25px;
    border: none;
    margin: 5px;
    border-bottom: 1px solid #000;
    background-color: transparent;
  }

  .footer_col button {
    padding: 4px 20px;
    background-color: transparent;
    border: none;
    margin: 5px;
    border-bottom: 1px solid #000;
  }

  .footer_form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer_line {
    width: 100%;
    height: 1px;
    background-color: rgb(159, 159, 159);
  }

  .footer_bottom {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
  }
`;
