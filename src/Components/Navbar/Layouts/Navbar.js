import React, { useState } from "react";
import { ReactComponent as ExitIcon } from "./../icons/exit.svg";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/poll">POLLING</Link>
        </div>
        <ul className="navbar-nav">{props.children}</ul>
      </div>
    </nav>
  );
};

export const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <span href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </span>

      {open && props.children}
    </li>
  );
};

export const DropDownMenu = ({ userContext }) => {
  const Dropdownitem = (props) => {
    return (
      <Link to="" style={props.style} href="#" className="menu-item">
        {/* <span style={props.style} className="icon-button">
            {props.leftIcon}
          </span> */}
        {props.children}
        {/* <span style={props.style} className="icon-button icon-right">
            {props.rightIcon}
          </span> */}
      </Link>
    );
  };

  return (
    <div className="dropdown">
      <div className="menu-item">
        Login Sebagai : {userContext.user.username}
      </div>
      <div className="menu-item logout" onClick={userContext.logoutHandler}>
        <span className="icon-button">
          <ExitIcon />{" "}
        </span>
        Logout
      </div>
    </div>
  );
};

export default Navbar;
