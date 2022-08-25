import React, { useContext } from "react";
import User from "../../../Store/User";
const AllPoll = () => {
  const userContext = useContext(User);
  return (
    <div>
      this is page user, ALl Polling
      <p>{userContext.user.username}</p>
      <p>{userContext.user.idUser}</p>
    </div>
  );
};

export default AllPoll;
