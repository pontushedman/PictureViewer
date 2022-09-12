import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";

function Modal(props) {
  props.show;
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
      <AddPicture/>
        <div className={style.fotter}>
          <button onClick={() => props.showModal(false)}> Cancel </button>
        </div>
      </div>
    </div>
  );

}

export default Modal;