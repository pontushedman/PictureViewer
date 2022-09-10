import style from "./Styles/AddPicture.module.css";
import React from "react";
import { useState, useEffect } from "react";

function setToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    console.log("Saved item to storage")
  } catch (error) {
    console.log("Couldnt save item to storage")
  }
}

function AddPicture() {
  const [chosenImages, setChosenImages] = useState([<FormAdd/>]);
  const [selectedFiles, setSelectedFiles] = useState([])

  useEffect(() => {
    if(selectedFiles.length > 0) {
      selectedFiles.map(x => {
        var s = localStorage.getItem(x)
        console.log("Item from storage " + s)
      })
    }
  }), []
  
  
  function add() {
    const arr = [...chosenImages, chosenImages.push(<ChosenPicture/>)]
    setChosenImages(arr.reverse())
  }

  function FormAdd() {
    return (
      <div className={style.largeAdd}>
        <div className={style.smalladd}>
          <p>Add</p>
        </div>
        <div className={style.chooseDiv}>
          <button className={style.uploadButton}></button>
          <input 
            onChange={(e) => {
              const file = e.target.files[0]
              
              var reader = new FileReader()
              reader.readAsDataURL(file)
              reader.addEventListener("load", () => {
                setToLocalStorage(file.size, reader.result)
                setSelectedFiles([file.size, ...selectedFiles])
              })           
            }}  
            className={style.chooseFile} type="file" name="picture"
          />
        </div>
      </div>)
    
  }


  function ChosenPictures() {
    var s = localStorage.getItem("apa")
    console.log("Localstorage length" + localStorage.length)
    let a = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      console.log("key " + key + index)
      
      a.push (
        <div className={style.chosenPictureContainer}>
          <div className={style.chosenPictureBoundary}>
            <img className={style.chosenPicture} src={localStorage.getItem(key)} />
          </div>
          <input className={style.choice}type="text" placeholder="Title" name="Title" />
          <input className={style.choice} type="text" placeholder="Comment" name="Comment" />
          <select className={style.choice}>
            <option>Album 1</option>
            <option>Album 2</option>
          </select>
        </div>
      )
    }
    return a   
  }


  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
      <div className={style.top}>
        <p className={style.title}>Add Pictures</p>
        <FormAdd/>
      </div>
        <form className={style.formx}>
          <div className={style.collection}>
            <ChosenPictures/>
          </div>
          <button className={style.choosebtn}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default AddPicture;
