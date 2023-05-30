import styled from "styled-components";

export const SupplierViewContainer = styled.div`
  .supplierView {
    display: flex;
    text-align: center;
    justify-content: space-around;
  }

  .supplier_profile {
    width: 300px;
    height: 450px;
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .supplier_img img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 30px;
  }

  .supplier_companyName,
  .supplier_companyAdress,
  .supplier_companyPhone {
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    color: #040f0f;
    margin: 10px;
  }

  .supplier_title,
  .phone_title {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #465362;
  }
`;
