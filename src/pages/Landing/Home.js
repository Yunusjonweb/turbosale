import Armchair from "../../assets/Armchair.png";
import WorkingRoom from "../../assets/WorkingRoom.png";
import WorkHome from "../../assets/WorkHome.png";
import WorkStreet from "../../assets/WorkStreet.png";
import DiningTable from "../../assets/DiningTable.png";
import BarTable from "../../assets/BarTable.png";
import PlainConsole from "../../assets/PlainConsole.png";
import AsgaardSofa from "../../assets/AsgaardSofa.png";
import LittleSofa from "../../assets/LittleSofa.png";
import { HomeContainer } from "../../styles/components/HomeStyles";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Home() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const minuts = date.getMinutes();
  const day = date.getDate();
  const fullYear = date.getFullYear();

  return (
    <HomeContainer>
      <Navbar />
      <div className="home">
        <div className="home__data">
          <div className="home__title">
            <h3>Rocket single seater</h3>
          </div>
          <button className="home__btn">Shop Now</button>
        </div>
        <div className="home_imges">
          <img src={Armchair} alt="armchair imge " />
        </div>
      </div>
      <div className="sidetabel">
        <div className="sidetabel_cards">
          <div className="card">
            <div className="card_imges"></div>
            <h3>Side tabel</h3>
            <button>View More</button>
          </div>
          <div className="card">
            <div className="card_imges1"></div>
            <h3>Side tabel</h3>
            <button>View More</button>
          </div>
        </div>
      </div>
      <div className="picks">
        <div className="picks_title">Top Picks For You</div>
        <div className="picks_description">
          Find a bright ideal to suit your taste with our great selection of
          suspension, floor and table lights.
        </div>
        <div className="picks_cards">
          <div className="picks_card">
            <img src={LittleSofa} alt="rasim bor" />
            <p>Trenton modular sofa_3</p>
            <span>Rs. 25,000.00</span>
          </div>
          <div className="picks_card">
            <img src={DiningTable} alt="rasim bor" />
            <p>Trenton modular sofa_3</p>
            <span>Rs. 25,000.00</span>
          </div>
          <div className="picks_card">
            <img src={BarTable} alt="rasim bor" />
            <p>Trenton modular sofa_3</p>
            <span>Rs. 25,000.00</span>
          </div>
          <div className="picks_card">
            <img src={PlainConsole} alt="rasim bor" />
            <p>Trenton modular sofa_3</p>
            <span>Rs. 25,000.00</span>
          </div>
        </div>
        <button className="picks_button">View More</button>
      </div>
      <div className="asgaard">
        <div className="asgaard_wrap">
          <div className="asgaard_imges">
            <img src={AsgaardSofa} alt="rasim bor" />
          </div>
          <div className="asgaard_data">
            <h4>New Arrivals</h4>
            <h2>Asgaard sofa</h2>
            <button>Order Now</button>
          </div>
        </div>
      </div>
      <div className="picks">
        <div className="picks_title">Our Blogs</div>
        <div className="picks_description">
          Find a bright ideal to suit your taste with our great selection.
        </div>
        <div className="blogs">
          <div className="blogs_cards">
            <div className="blogs_card">
              <img src={WorkingRoom} alt="WorkingRoom imge" />
              <h4>Going all-in with millennial design</h4>
              <button>Read More</button>
              <div className="card_data">
                <p>
                  <ClockCircleOutlined /> {minuts}min
                </p>
                <p>
                  <CalendarOutlined /> {day}
                  <sup>th</sup>
                </p>
                <p>{month}</p>
                <p>{fullYear}</p>
              </div>
            </div>
            <div className="blogs_card">
              <img src={WorkHome} alt="rasim bor" />
              <h4>Going all-in with millennial design</h4>
              <button>Read More</button>
              <div className="card_data">
                <p>
                  <ClockCircleOutlined /> {minuts}min
                </p>
                <p>
                  <CalendarOutlined /> {day}
                  <sup>th</sup>
                </p>
                <p>{month}</p>
                <p>{fullYear}</p>
              </div>
            </div>
            <div className="blogs_card">
              <img src={WorkStreet} alt="rasim bor" />
              <h4>Going all-in with millennial design</h4>
              <button>Read More</button>
              <div className="card_data">
                <p>
                  <ClockCircleOutlined /> {minuts}min
                </p>
                <p>
                  <CalendarOutlined /> {day}
                  <sup>th</sup>
                </p>
                <p>{month}</p>
                <p>{fullYear}</p>
              </div>
            </div>
          </div>
          <button className="picks_button">View All Post</button>
        </div>
      </div>
      <div className="instagram">
        <div className="instagram_wrap">
          <div className="instagram_title">Our Instagram</div>
          <div className="instagram_description">
            Follow our store on Instagram
          </div>
          <button className="instagram_btn">Follow Us</button>
        </div>
      </div>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
