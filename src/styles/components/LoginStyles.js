import styled from "styled-components";

export const LoginContainer = styled.div`
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    height: 100vh;
    background: #fff;
  }

  .login_titles {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login_titles .login_title a,
  .register_title a {
    font-size: 24px;
    text-decoration: none;
    color: #000;
  }

  .login_btn {
    width: 200px;
    height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #07bfa5;
  }

  .login_input,
  .input {
    margin: 10px;
  }

  .login_input input {
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

  .login_social {
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login_line {
    width: 100px;
    height: 2px;
    border: 1px solid #e1e2e8;
  }

  .login_icons {
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

  .login_section {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .login_brand {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
