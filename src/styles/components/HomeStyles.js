import styled from "styled-components";
import CloudSofa from "../../assets/CloudSofa.png";
import Seat from "../../assets/Seat.png";
import BackgroundFon from "../../assets/BackgroundFon.png";

export const HomeContainer = styled.div`
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fbebb5;
    width: 100%;
    height: 570px;
  }

  .home_imges {
    width: 600px;
    margin-top: 50px;
  }

  .home_imges img {
    width: 650px;
    height: 650px;
  }

  .home__title {
    width: 400px;
  }

  .home__title h3 {
    font-size: 60px;
    color: #000;
  }

  .home__btn {
    border: none;
    font-size: 16px;
    padding: 10px 10px;
    background-color: transparent;
    border-bottom: 1px solid #000;
  }

  .sidetabel {
    width: 100%;
    height: 570px;
    background: #faf4f4;
  }

  .sidetabel_cards {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card {
    width: 450px;
    height: 450px;
  }

  .card_imges {
    width: 500px;
    height: 500px;
    background-image: url(${Seat});
  }

  .card_imges1 {
    width: 500px;
    height: 500px;
    background-image: url(${CloudSofa});
  }

  .card h3 {
    font-size: 26px;
    color: #000;
    margin: 5px;
  }

  .card button {
    border: none;
    padding: 10px 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: transparent;
    border-bottom: 1px solid #000;
  }

  .picks {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
  }

  .picks_title {
    font-size: 38px;
    color: #000;
  }

  .picks_description {
    font-size: 18px;
    color: #9f9f9f;
  }

  .picks_cards {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 20px;
  }

  .picks_card {
    width: 300px;
    height: 300px;
  }

  .picks_card img {
    width: 255px;
    height: 200px;
  }

  .picks_card p {
    font-size: 16px;
    color: #000;
  }

  .picks_card span {
    font-size: 24px;
    color: #000;
  }

  .picks_button {
    border: none;
    padding: 10px 10px;
    font-size: 17px;
    cursor: pointer;
    margin-top: 20px;
    background-color: transparent;
    border-bottom: 1px solid #000;
  }

  .asgaard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 600px;
    margin-top: 40px;
    background-color: #fff9e5;
  }

  .asgaard_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    height: 350px;
  }

  .asgaard_imges img {
    width: 700px;
    height: 500px;
    object-fit: cover;
  }

  .asgaard_data {
    text-align: center;
  }

  .asgaard_data h4 {
    font-size: 24px;
    color: #000;
  }

  .asgaard_data h2 {
    font-size: 48px;
    color: #000;
  }

  .asgaard_data button {
    width: 200px;
    height: 50px;
    font-size: 16px;
    margin-top: 30px;
    border: 1px solid #000;
    background-color: transparent;
    cursor: pointer;
  }

  .blogs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .blogs_cards {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 30px;
    text-align: center;
  }

  .card_data {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 16px;
  }

  .blogs_card h4 {
    font-size: 20px;
    color: #000;
  }

  .blogs_card button {
    font-size: 20px;
    margin: 10px;
    border: none;
    border-bottom: 2px solid #000;
    background-color: transparent;
  }

  .instagram {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    text-align: center;
    background-image: url(${BackgroundFon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .instagram_title {
    font-size: 60px;
    color: #000;
  }

  .instagram_description {
    font-size: 20px;
    color: #000;
  }

  .instagram_btn {
    background: #faf4f4;
    padding: 10px 50px;
    border-radius: 50px;
    margin-top: 20px;
    font-size: 16px;
    border: 1px solid #faf4f4;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
