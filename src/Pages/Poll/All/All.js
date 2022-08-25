import React, { useEffect, useState } from "react";
import style from "./All.module.css";
import { Link } from "react-router-dom";
import User from "./../../../Store/User";
import Loading from "../../../Components/UI/Loading/Loading";

const All = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userContext = React.useContext(User);

  useEffect(() => {
    // const controller = new AbortController();
    getDataPolling();
    return () => {
      // controller.abort();
    };
  }, []);
  const getDataPolling = async () => {
    setLoading(true);
    const response = await fetch(process.env.REACT_APP_LINK_API + "poll");
    const dataJson = await response.json();
    setLoading(false);
    setData(dataJson);
  };

  const hapusData = async (idData) => {
    const formData = new FormData();
    formData.append("id", idData);

    const response = await fetch(
      process.env.REACT_APP_LINK_API + "poll/delete",
      {
        method: "post",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    setData(data.data);
  };

  return (
    <div className={style.container}>
      <div className="table-poll">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={style.list__container}>
              <ul>
                {data.map((e) => (
                  <li key={e.id}>
                    <div>
                      <Link
                        to={`/poll/${e.id}`}
                        className={style.list__link_title}
                      >
                        <h2 className={style.list__title}>{e.title}</h2>
                      </Link>
                      <span className={style.list__created__by}>
                        created By : {e.user.username} / deadline : {e.deadline}
                      </span>
                    </div>

                    {userContext.user.role === "admin" && (
                      <div className={style.button__container}>
                        <button
                          className={`${style.btn} ${style.btn_danger}`}
                          onClick={() =>
                            window.confirm(
                              "Anda Yakin Akan Menghapus Polling ini ?"
                            )
                              ? hapusData(e.id)
                              : ""
                          }
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default All;
