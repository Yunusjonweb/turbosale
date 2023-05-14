import styled from "styled-components";

export const SidebarContainer = styled.div`
  .headers,
  .header {
    background-color: #fff;
  }

  .headers_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content_data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  }

  .content_title {
    color: #4b5563;
    font-size: 28px;
    font-weight: 600;
  }

  .content_button button {
    margin: 10px;
  }

  .icon_btn {
    border: none;
    background-color: transparent;
  }

  .logo_brand img {
    margin-top: 10px;
  }
`;
