import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Vote = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const getVote = async () => {
    const response = await fetch(process.env.REACT_APP_LINK_API + "poll/" + id);
    const dataJson = await response.json();

    setData(dataJson);
  };
  useEffect(() => {
    getVote();
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Vote;
