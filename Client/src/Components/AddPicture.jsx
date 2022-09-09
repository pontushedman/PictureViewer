import style from "./Styles/AddPicture.module.css";
import React from "react";
import { useState, useEffect } from "react";

function AddPicture() {
  //const {register, handleSubmit} = useForm()
  const [chosenImages, setChosenImages] = useState([]);

  console.log(chosenImages.length)
 
  function add() {
    setChosenImages([...chosenImages, <FormAdd/>])
  }

  function FormAdd() {
    return (
    <div className={style.chooseDiv}>
      <button className={style.uploadButton}>Choose Image</button>
      <input className={style.chooseFile}type="file" name="picture"/>
    </div>)
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Add Picture</h1>
      <div className={style.formcontainer}>
        <form className={style.formx}>
          <div className={style.collection}>
          {chosenImages.map(x => {
            return x
          })}
          </div>
          
        </form>
        <button onClick={() => {add()}}className={style.choosebtn}>Upload</button>
      </div>
    </div>
  );
}

export default AddPicture;
