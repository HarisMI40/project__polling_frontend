import React, { useState } from "react";
import User from "../../../Store/User";
import style from "./Login_old.module.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(false);
  const userContext = React.useContext(User);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLogin(true);
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    const response = await fetch(process.env.REACT_APP_LINK_API + "login", {
      method: "post",
      body: formData,
    });
    const data = await response.json();

    setLogin(false);

    if (data.status === "Error") {
      setError(data.message);
      return;
    }
    if (data.status === "invalid") {
      console.log(data.data.password[0]);
      setError(data.message);
      return;
    }
    const user = data.data;
    userContext.loginHandler(user.username, user.role, user.id, data.token);
  };

  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.head}>Login</div>
        <div className={style.body}>
          {error ? <div className={style.alert_danger}>{error}</div> : null}
          <form onSubmit={submitHandler}>
            <div className={style.form_group}>
              <label>Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={style.form_group}>
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={style.btn} type="submit">
              {isLogin ? "...." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
