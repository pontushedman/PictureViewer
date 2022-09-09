import React from "react";
import AddPicture from "./AddPicture";
import style from "./Styles/Modal.module.css";

function Modal(props) {
  props.show;
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
      <AddPicture></AddPicture>
        <div className={style.fotter}>
          <button onClick={() => props.showModal(false)}> Cancel </button>
          <button> Contiune </button>
        </div>
      </div>
    </div>
  );

}

export default Modal;


  // return (<div className={style.modalBackground}>
  //     <div className={style.modalContainer}>
  //         <button> X </button>
  //         <div className={style.title}>
  //             <h1>Are you sure want to continue</h1>
  //         </div>
  //         <div className={style.body}>
  //             <p>The next page is awsome! You shlod move forward</p>
  //         </div>
  //         <div className={style.fotter}>
  //             <button onClick={() => props.showModal(false)}> Cancel </button>
  //             <button> Contiune </button>
  //         </div>
  //     </div>
  // </div>)