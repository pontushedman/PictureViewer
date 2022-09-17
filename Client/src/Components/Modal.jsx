import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";
import ShowImage from "./ShowImage";
import ShowAlbum from "./ShowAlbum";
import { useEffect } from "react";
import AddAlbum from "./AddAlbum";

function Modal(props) {
  useEffect(() => {
    const background = document.getElementById("back")
    background.addEventListener("mousedown", (e) => {
      const b = e.target.getAttribute("id")
      if (b === "back") {
        props.showModal(false)
      } else {
        console.log("apa")
      }
    })
  })

  return (
    <div className={style.modalBackground} id="back">
      <div className={style.modalContainer}>
        {props.mode === "addimages" ? <AddPicture /> : null}
        {props.mode === "addalbum" ? <AddAlbum /> : null}
        {props.mode === "image" ? <ShowImage id={props.id} /> : null}
        {props.mode === "album" ? <ShowAlbum id={props.id} /> : null}

        <div className={style.fotter}>
          <button onClick={() => props.showModal(false)}> Cancel </button>
        </div>
      </div>
    </div>
  );

}

export default Modal;