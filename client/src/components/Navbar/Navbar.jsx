import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/babble-buddy-high-resolution-logo-transparent.png";
import UserSearch from "../UserSearch/UserSearch";
import "./Navbar.css";

function Navbar({
  loggedInUser,
  loggedInUserFollowingList,
  activeSearch,
  setActiveSearch,
}) {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const user = useSelector((state) => state.auth.user);

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      <Link to={"/"}>
        <img src={Logo} alt="Logo" className="navLogo" />
      </Link>
      <UserSearch
        loggedInUser={loggedInUser}
        loggedInUserFollowingList={loggedInUserFollowingList}
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
      />
      <ul className={active}>
        <li
          className="nav__item"
          onClick={() => {
            setActive("nav__menu");
            setIcon("nav__toggler");
          }}
        >
          <Link to={"/messenger"} className="nav__link">
            Messenger
          </Link>
        </li>
        <li
          className="nav__item"
          onClick={() => {
            setActive("nav__menu");
            setIcon("nav__toggler");
          }}
        >
          <Link to={`/profile/${user?.userId}`} className="nav__link">
            Profile
          </Link>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
