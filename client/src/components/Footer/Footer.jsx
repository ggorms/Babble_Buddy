import { Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagramIcon.png";
import xIcon from "../../assets/xIcon.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLinksWrapper">
        <Link className="footerLink" to={"https://www.facebook.com/"}>
          <img src={facebookIcon} className="footerLinkImg" />
        </Link>
        <Link className="footerLink" to={"https://www.instagram.com/"}>
          <img src={instagramIcon} className="footerLinkImg" />
        </Link>
        <Link className="footerLink" to={"https://twitter.com/?lang=en"}>
          <img src={xIcon} className="footerLinkImg" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
