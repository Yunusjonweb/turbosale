import styled from "styled-components";

export const RegisterContainer = styled.div`
  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    height: 100vh;
    background: #fff;
  }

  .register_titles {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .register_titles .register_title a {
    font-size: 24px;
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }

  .register_btn {
    width: 200px;
    height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #07bfa5;
  }

  .register_input,
  .input {
    margin: 10px;
  }

  .register_input input {
    font-size: 16px;
    width: 300px;
    height: 40px;
    color: #000;
    background-color: #fff;
  }

  .password {
    color: #01221d;
    font-size: 16px;
    font-weight: 600;
    float: left;
    text-decoration: none;
  }

  .register_social {
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .register_line {
    width: 100px;
    height: 2px;
    border: 1px solid #e1e2e8;
  }

  .google,
  .facebook {
    width: 30px;
    height: 30px;
    margin: 10px;
    cursor: pointer;
    font-size: 20px;
  }

  .register_section {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .register_brand {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .register_icons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .google,
  .facebook {
    width: 30px;
    height: 30px;
    margin: 10px;
    cursor: pointer;
    font-size: 20px;
  }
`;
