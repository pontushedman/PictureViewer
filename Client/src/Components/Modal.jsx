import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";
import ShowImage from "./ShowImage";
import { useEffect } from "react";

function Modal(props) {

  useEffect(() => {
    const background = document.getElementById("back")
    background.addEventListener("click", (e) => {
      const b = e.target.getAttribute("id")
      if(b === "back") {
        props.showModal(false)
      } else {
        console.log("apa")
      }
    })
  })

  const p = {...props}
  return (
    <div className={style.modalBackground} id="back">
      <div className={style.modalContainer}>
       {p.mode === "addimages" ? <AddPicture/> : null}
       {p.mode === "image" ? <ShowImage id={props.data.image.id}/> : null}
        <div className={style.fotter}>
          <button onClick={() => props.showModal(false)}> Cancel </button>
        </div>
      </div>
    </div>
  );

}

export default Modal;