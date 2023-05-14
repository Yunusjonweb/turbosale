import { FooterContainer } from "../styles/components/FooterStyles";

function Footer() {
  return (
    <FooterContainer>
      <div className="footer">
        <div className="container">
          <div className="footer_wrap">
            <div className="footer_title">
              400 University Drive Suite 200 Coral <br />
              Gables, <br />
              FL 33134 USA
            </div>
            <div className="footer_col">
              <div className="footer_title">Links</div>
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer_col">
              <div className="footer_title">Help</div>
              <ul>
                <li>Payment Options</li>
                <li>Returns</li>
                <li>Privacy Policies</li>
              </ul>
            </div>
            <div className="footer_col">
              <div className="footer_title">Newsletter</div>
              <div className="footer_form">
                <input placeholder="Enter Your Email Address" />
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer_line"></div>
      </div>
      <div className="footer_bottom">
        <div className="container">
          <h4>{new Date().getFullYear()} Meubel House. All rights reverved</h4>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
