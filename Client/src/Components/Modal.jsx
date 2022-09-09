import React from "react";
import style from './Styles/Modal.module.css';
import ViewPicture from "./ViewPicture";


function Modal(props){
    props.show

    return (<div className={style.modalBackground}>
        <div className={style.modalContainer}>
            <ViewPicture/>
            <div className={style.fotter}>
                <button onClick={() => props.showModal(false)}> Cancel </button>
                <button> Contiune </button>
            </div>
        </div>
    </div>)
   
}
 
export default Modal;