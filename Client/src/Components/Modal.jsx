import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";
import ShowImage from "./ShowImage";
import ShowAlbum from "./ShowAlbum";
import ShowRatedAlbum from "./ShowRatedAlbum";
import AddAlbum from "./AddAlbum";

function Modal(props) {
  function closeModal(e) {
    const b = e.target.getAttribute("id")
    b === "back" ? props.showModal(false) : null
  }

  return (
    <div
      className={style.modalBackground}
      id="back"
      onClick={(e => { closeModal(e) })}
    >
      <div className={style.modalContainer}>
        {props.mode === "addimages" ? <AddPicture /> : null}
        {props.mode === "addalbum" ? <AddAlbum /> : null}
        {props.mode === "image" ? <ShowImage id={props.id} /> : null}
        {props.mode === "album" ? <ShowAlbum id={props.id} /> : null}
        {props.mode === "ratedAlbum" ? <ShowRatedAlbum rating={props.id} /> : null}

        <div className={style.fotter}>
          <button onClick={() => props.showModal(false)}> Cancel </button>
        </div>
      </div>
    </div>
  )

}

export default Modal;