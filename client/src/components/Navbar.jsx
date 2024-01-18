import { Link } from "react-router-dom";
import { useState } from "react";
import { logoutThunk } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const user = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        herdoy
      </a>
      <ul className={active}>
        <li
          className="nav__item"
          onClick={() => {
            setActive("nav__menu");
            setIcon("nav__toggler");
          }}
        >
          <Link to={"/"} className="nav__link">
            Home
          </Link>
        </li>
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
          {!user ? (
            <Link to={"/auth"} className="nav__link">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
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
