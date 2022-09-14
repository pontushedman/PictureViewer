import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";
import ShowImage from "./ShowImage";

function Modal(props) {
  const p = {...props}
  return (
    <div className={style.modalBackground}>
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