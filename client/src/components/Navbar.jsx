import { Link } from "react-router-dom";
import { useState } from "react";

// function Navbar() {
//   const [navActive, setNavActive] = useState("nav__menu");
//   const [toggleIcon, setToggleIcon] = useState("nav__toggler");

//   const navToggle = () => {
//     navActive === "nav__menu"
//       ? setNavActive("nav__menu nav__active")
//       : setNavActive("nav__menu");

//     toggleIcon === "nav__toggler"
//       ? setToggleIcon("nav__toggler toggle")
//       : setToggleIcon("nav_toggler");
//   };

//   return (
//     <nav className="nav">
//       <Link to={"/"} className="nav__brand">
//         Babble Buddy
//       </Link>
//       <ul className={navActive}>
//         <li className="nav__item">
//           <Link className="nav__link">Home</Link>
//         </li>
//         <li className="nav__item">
//           <Link className="nav__link">Login</Link>
//         </li>
//       </ul>
//       <div onClick={navToggle} className={toggleIcon}>
//         <div className="line1"></div>
//         <div className="line2"></div>
//         <div className="line3"></div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import React, { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
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
          <Link to={"/auth"} className="nav__link">
            Login
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
