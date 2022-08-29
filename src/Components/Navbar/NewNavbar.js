import "./NewNavbar.css";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as UserIcon } from "./icons/user.svg";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import User from "../../Store/User";

import Navbar, { NavItem, DropDownMenu } from "./Layouts/Navbar";

const NewNavbar = () => {
  const userContext = useContext(User);
  console.log(userContext.user.username);
  return (
    <Navbar>
      {userContext.user.role == "admin" && (
        <Link to="/create-poll">
          {" "}
          <NavItem icon={<PlusIcon />} />
        </Link>
      )}

      {userContext.user.username !== undefined ? (
        <NavItem icon={<UserIcon />}>
          <DropDownMenu userContext={userContext}></DropDownMenu>
        </NavItem>
      ) : (
        <Link className="btn btn-success" to="/login">
          Login
        </Link>
      )}
    </Navbar>
  );
};

export default NewNavbar;
