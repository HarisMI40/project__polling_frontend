import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
import User from "./../../../Store/User";
import Loading from "../../../Components/UI/Loading/Loading";
import BarLoader from "react-spinners/BarLoader";
import VoteSuccess from "./VoteSuccess";
import Share from "../../../Components/UI/Share/Share";
const Detail = () => {
  const { id } = useParams();
  const [vote, setVote] = useState("");
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState();
  const [status, setStatus] = useState("");
  const userContext = React.useContext(User);
  const [isProses, setProses] = useState(false);
  const [validation, setValidation] = useState([]);

  let isCanChoice = true;
  let user_vote = userContext.user.idUser;

  useEffect(() => {
    const getDetailData = async () => {
      setProses(true);
      const response = await fetch(
        process.env.REACT_APP_LINK_API + "poll/" + id
      );
      const dataJson = await response.json();

      setData(dataJson.data);
      setProses(false);
    };

    getDetailData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setProses(true);
    const formData = new FormData();

    formData.append("id_poll", id);
    formData.append("id_vote", vote);
    formData.append("user_vote", user_vote);

    await axios
      .post(process.env.REACT_APP_LINK_API + "vote/store", formData)
      .then((response) => {
        setStatus("success");
        setProses(false);
      })
      .catch((error) => {
        setProses(false);
        setValidation(error.response.data);
      });
  };

  if (data.choices === undefined) return <Loading />;

  let isUserVote = false;
  data.choices.map((e) => {
    e.votes.map((f) => {
      if (f.user_id === user_vote) {
        isUserVote = true;
      }
    });
  });

  if (isUserVote === true || status === "success") {
    isCanChoice = false;
  }

  return (
    <>
      <div className={`${style.container} ${isProses && style.proses}`}>
        <>
          <h1>{data.title}</h1>
          <span>{data.deadline}</span>
          <p>{data.description}</p>

          {isCanChoice === false && <VoteSuccess />}

          {validation.user_vote && (
            <div className="alert alert-danger" role="alert">
              <strong>Pilih Salah Satu Pilihan Dibawah !</strong>
            </div>
          )}

          {isCanChoice && (
            <form onSubmit={submitHandler}>
              {data.choices.map((e) => (
                <div
                  key={e.id}
                  className={`
                  ${style.container_input_radio}
                  ${clicked === e.id && style.container_input_radio__selected}
                `}
                  onClick={() => {
                    setClicked(e.id);
                    setVote(e.id);
                  }}
                >
                  <input
                    type="radio"
                    name="vote"
                    value={e.id}
                    onChange={() => setVote(e.id)}
                    className={`${style.input_radio}`}
                    checked={clicked === e.id}
                  />
                  <label>{e.choice}</label>
                </div>
              ))}
              <button className={style.btn} type="submit" disabled={isProses}>
                Voting
              </button>
              <BarLoader
                className={style.loader_simpan}
                color="#1f98dd"
                width={"100%"}
                loading={isProses}
              />
            </form>
          )}
        </>
      </div>
      <Share />
    </>
  );
};

export default Detail;
