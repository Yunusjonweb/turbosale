import styled from "styled-components";

export const NavbarContainer = styled.div`
  header {
    width: 100%;
    height: 60px;
    background-color: #fbebb5;
  }

  .navbar {
    width: 100%;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar a.active {
    font-size: 17px;
    font-weight: bold;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar_wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .navbar-collapse,
  .navbar-icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
  }

  .navbar-collapse a {
    text-decoration: none;
    color: #000;
    font-size: 18px;
    margin: 20px;
    cursor: pointer;
  }

  .navbar-icon li {
    margin: 20px;
    font-size: 20px;
  }

  .home__title h2 {
    font-size: 60px;
  }
`;
