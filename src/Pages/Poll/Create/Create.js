import React, { useState } from "react";
import User from "../../../Store/User";
import style from "./create.module.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isProses, setProses] = useState(false);
  const [description, setDescription] = useState("");
  const userContext = React.useContext(User);

  const createHandler = async (e) => {
    e.preventDefault();
    setProses(true);
    const formData = new FormData();
    // formData.append("user_id", userContext.user.idUser);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("choices", choices);
    const response = await fetch(
      process.env.REACT_APP_LINK_API + "poll/create",
      {
        method: "post",
        body: formData,
      }
    );
    const dataJson = await response.json();
    setProses(false);
    alert("Polling Terbuat");
    navigate("/poll/" + dataJson.id_polling);
  };

  return (
    <div className={`container-md ${style.container}`}>
      <form method="post" onSubmit={createHandler}>
        <h3>Buat Pollingmu</h3>
        <div className="mb-3 text-start">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            id="title"
            aria-describedby="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            aria-describedby="description"
            className="form-control"
          >
            {" "}
          </textarea>
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="Deadline" className="form-label">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            id="Deadline"
            aria-describedby="Deadline"
            className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="Choices" className="form-label">
            Choices
          </label>
          <textarea
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
            id="Choices"
            aria-describedby="Choices"
            className="form-control"
            style={{ height: "150px" }}
          >
            {" "}
          </textarea>
        </div>

        <button className={style.btn} type="submit">
          Create
        </button>
        {isProses ? <p>Loading ...</p> : ""}
      </form>
    </div>
  );
};

export default Create;
