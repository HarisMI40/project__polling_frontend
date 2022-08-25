import React, { useState } from "react";
import "./Login.css";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import User from "../../../Store/User";

const Index = (props) => {
  const userContext = React.useContext(User);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // userData.setIsLogin();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    await axios
      .post(process.env.REACT_APP_LINK_API + "login", formData)
      .then((response) => {
        setIsLoading(false);
        console.log("berhasil");
        if (response.status === "Error") {
          setError(response.data.message);
          return;
        }
        if (response.status === "invalid") {
          console.log(response.data.data.password[0]);
          setError(response.data.message);
          return;
        }
        const user = response.data.data;
        userContext.loginHandler(
          user.username,
          user.role,
          user.id,
          response.data.token
        );
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <main className="form-signin w-100 m-auto bg-light">
      <form className="form" onSubmit={submitHandler}>
        <BarLoader
          color="#1f98dd"
          width={"100%"}
          cssOverride={{
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
          }}
          loading={isLoading ? true : false}
        />
        <h1 className="h3 mb-3 fw-normal">Silahkan Login</h1>
        <div className={`alert ${error && "alert-danger"}`} role="alert">
          {error && <p>Username atau password Salah</p>}
          {/* {error.username && <p>{error.username[0]}</p>}
          {error.password && <p>{error.password[0]}</p>} */}
        </div>
        <div className="form-floating mb-3">
          <input
            type="username"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control mb-3"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; Haris 2022</p>
      </form>
    </main>
  );
};

export default Index;
