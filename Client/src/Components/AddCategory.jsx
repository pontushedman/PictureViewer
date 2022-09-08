import React, { useState } from "react";
import styles from "./Styles/AddCategory.module.css";
import App from "../App";

function AddCategory(props) {


  console.log(props.showModal)
  const content = () => {
    if (props.noAdd === true) {
      return (
        <div className={styles.AddCategory}>
          <img className={styles.Plus} src="./src/assets/plus.png" />
          <button className={styles.Text} onClick={() => props.showModal(true)}>Add {props.category}</button>          
        </div>
      );
    } else {
      return <div />;
    }
  };

  /*     const ny = (() => {
        return "apa"
    }); */

  return content();
}

export default AddCategory;

// hej
