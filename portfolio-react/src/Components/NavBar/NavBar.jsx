import React, { useRef, useState } from "react";
import "./NavBar.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from '../../assets/menu_open.svg';
import menu_close from '../../assets/menu_close.svg';

function NavBar() {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  };

  const closeMenu = () => {
    menuRef.current.style.right = "-250px"; // Adjust to your hidden position
  };

  return (
    <div className="navbar">
      {/* <img src={logo} alt="Logo" /> */}
      <img src={menu_open} onClick={openMenu} alt="Open Menu" className="nav_mob_open" />

      <ul ref={menuRef} className="nav-menu">
        <img src={menu_close} alt="Close Menu" onClick={closeMenu} className="nav_mob_close" />

        <li>
          <AnchorLink className="anchor_link" offset={50} href="#home">
            <p onClick={() => setMenu("home")}>Home</p>
          </AnchorLink>
          
        </li>

        <li>
          <AnchorLink className="anchor_link" offset={50} href="#about">
            <p onClick={() => setMenu("about")}>About</p>
          </AnchorLink>
         
        </li>

        <li>
          <AnchorLink className="anchor_link" offset={50} href="#work">
            <p onClick={() => setMenu("work")}>Experiences</p>
          </AnchorLink>
         
        </li>

        <li>
          <AnchorLink className="anchor_link" offset={50} href="#projects">
            <p onClick={() => setMenu("projects")}>Projects</p>
          </AnchorLink>
         
        </li>

        <li>
          <AnchorLink className="anchor_link" offset={50} href="#achievements">
            <p onClick={() => setMenu("achievements")}>Achievements</p>
          </AnchorLink>
          
        </li>


        {/* <li>
          <AnchorLink className="anchor_link" offset={50} href="#contact">
            <p onClick={() => setMenu("contact")}>Contact</p>
          </AnchorLink>
          
        </li> */}
      </ul>

      <div className="nav-connect">
        <AnchorLink className="anchor_link" offset={50} href="#contact" onClick={() => setMenu("contact")}>
          Connect
        </AnchorLink>
      </div>
    </div>
  );
}

export default NavBar;
