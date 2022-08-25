import React from "react";
import { ReactComponent as NotFound } from "./icons/NotFound.svg";
const PageNotFound = () => {
  return (
    <div
      className="bg-light text-center d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
      <h4>Halaman Tidak Ditemukan</h4>
      <NotFound style={{ height: "15%" }} />
    </div>
  );
};

export default PageNotFound;
