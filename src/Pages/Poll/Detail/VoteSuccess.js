import React from "react";
import style from "./VoteSuccess.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Success } from "./asset/success2.svg";

const VoteSuccess = () => {
  return (
    <div className={style.container}>
      <h3>Anda Telah Selesai Mengisi</h3>

      <Success style={{ width: "100px", marginBottom: "20px" }} />

      <div className={style.container_button}>
        {/* <button className="btn btn-primary">Lihat Hasil</button> */}
        <Link to="/poll" className="btn btn-primary">
          Kembali Ke Polling
        </Link>
        {/* <button className="btn btn-success">Bagikan</button> */}
      </div>
    </div>
  );
};

export default VoteSuccess;
