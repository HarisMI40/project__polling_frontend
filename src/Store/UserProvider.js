import User from "./User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(!!token);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(process.env.REACT_APP_LINK_API + "user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLogin(true);
        setUser({
          idUser: response.data.id,
          username: response.data.username,
          role: response.data.role,
        });

        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        console.log("error pada Authorisasi" + error);
      });
    setLoading(false);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  const loginHandler = (Username, Role, id, token) => {
    localStorage.setItem("token", token);
    setUser({
      idUser: id,
      username: Username,
      role: Role,
    });
    setLogin(true);
    if (Role === "user") navigate("/poll");
    if (Role === "admin") navigate("/poll");
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    // navigate("/login", { replace: false });
    window.location.href = "/login";
  };

  const data = {
    user,
    isLogin,
    loginHandler,
    logoutHandler,
    loading,
  };

  return <User.Provider value={data}>{props.children}</User.Provider>;
};

export default UserProvider;
