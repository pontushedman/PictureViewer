import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/ExtraModal.module.css";
import ShowImage from "./ShowImage";
import ShowAlbum from "./ShowAlbum";
import ShowRatedAlbum from "./ShowRatedAlbum";
import AddAlbum from "./AddAlbum";

function ExtraModal(props) {
  function closeModal(e) {
    const b = e.target.getAttribute("id")
    b === "back" ? props.showExtraModal({show: false}) : null
    document.body.style.overflowY = "visible" 
  }

  return (
    <div
      className={style.modalBackground}
      id="back"
      onClick={(e => { closeModal(e) })}
    >
      <div className={style.modalContainer}>
        <div className={style.messageContainer}>
          <p className={style.message}>{props.message}</p>
        </div>

        <div className={style.fotter}>
          <button onClick={() => 
            {
              props.showExtraModal({show: false})
              props.showModal({show: false})
            }}
        > Close </button>
        </div>
      </div>
    </div>
  )

}

export default ExtraModal;