import styled from "styled-components";

export const FormContainer = styled.div`
  .wrapper {
    width: 230px;
    height: 210px;
    margin-top: 20px;
    position: relative;
    border-radius: 50%;
    border: 5px solid #fff;
    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6a9TnYO7kotpJqUOr4kz2yiVwc64Vp2xm1w&usqp=CAU");
    background-size: 100% 100%;
  }

  .btn {
    margin: 5px;
    float: right;
  }

  .forms_btns {
    margin-top: 30px;
    gap: 5px;
    float: right;
  }

  .file_input {
    border: none;
    outline: none;
    width: 230px;
    height: 210px;
    cursor: pointer;
    transition: 0.5s;
    border-radius: 50%;
    margin-top: 20px;
    position: absolute;
    color: transparent;
    padding: 15px 20px;
    box-sizing: border-box;
    background: transparent;
  }

  .file_input::-webkit-file-upload-button {
    visibility: hidden;
  }

  .product_btn {
    margin: 5px;
    gap: 5px;
    float: right;
  }
`;
