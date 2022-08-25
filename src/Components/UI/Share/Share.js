import React, { useState } from "react";
import style from "./Share.module.css";
const Share = () => {
  const [isCLick, setIsCLick] = useState(false);

  async function salinText() {
    if ("clipboard" in navigator) {
      setIsCLick(true);
      return await navigator.clipboard.writeText(window.location.href);
    } else {
      return document.execCommand("copy", true, window.location.href);
    }
  }

  return (
    <div className={`${style.container}`}>
      <h1 className="fs-5 mb-3">Bagikan Polling</h1>
      <div
        className={`position-relative ${style.salin_text_tooltip}`}
      >
        <button
          data-text={isCLick ? "Link Tersalin" : "Salin Ke Clipboard"}
          className={`btn btn-success position-relative ${style.tooltip_text}`}
          onClick={salinText}
          onMouseOut={() => { setTimeout(() => setIsCLick(false),500)}}
        >
          {/* <span className={style.tooltip_text}>Salin ke Clipboard</span> */}
          Salin Link
        </button> 
      </div>
    </div>
  );
};

export default Share;
