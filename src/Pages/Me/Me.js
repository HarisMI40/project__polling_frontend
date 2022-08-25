import React from "react";
import style from "./Me.module.css";
import User from "../../Store/User";
const Me = () => {
  var userContext = React.useContext(User);
  return (
    <div>
      <p>Username : {userContext.user.username}</p>
      <p>Role : {userContext.user.role}</p>
    </div>
  );
};

export default Me;
