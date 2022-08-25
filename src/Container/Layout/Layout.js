import React from "react";
// import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import style from "./Layout.module.css";
import NewNavbar from "../../Components/Navbar/NewNavbar";

const Layout = (props) => {
  return (
    <>
      <NewNavbar />
      <div className={style.main}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
