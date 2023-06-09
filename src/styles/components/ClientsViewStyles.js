import styled from "styled-components";

export const ClientsViewContainer = styled.div`
  .clientsView {
    display: flex;
    text-align: center;
    justify-content: space-around;
  }

  .clients_profile {
    width: 300px;
    height: 450px;
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .clients_img img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 30px;
  }

  .clients_companyName,
  .clients_companyAdress,
  .clients_companyPhone {
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #040f0f;
    margin: 10px;
  }

  .clients_title,
  .phone_title {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #465362;
  }
`;
