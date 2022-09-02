import React from "react";
import { Navigate } from "react-router-dom";
import User from "./../Store/User";
const ProtectedRoute = ({ role, children }) => {
  // const userContext = React.useContext(User);
  // if (!userContext.isLogin) return <Navigate to="/login" />;
  // if (userContext.user.role !== role) return <Navigate to="/poll" />;

  // if (role !== undefined && userContext.user.role !== role)
  //   return <Navigate to="/poll" />;

  return children;
};

export default ProtectedRoute;
