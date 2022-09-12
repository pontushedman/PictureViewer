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
  const [selectedFiles, setSelectedFiles] = useState([])
  
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
                  const img = document.createElement("img")
                  var resizedImage = ""
                  img.onload = (() => {
                     const canvas = document.createElement("canvas")
                     const ctx = canvas.getContext("2d")
                    
                     const convertedHeight = img.height * 0.5
                     const convertedWidth = img.width * 0.5
                     canvas.width = convertedWidth
                     canvas.height = convertedHeight
                     

                     ctx.drawImage(img, 0, 0, convertedWidth , convertedHeight)
                     const resizedImage = canvas.toDataURL(file.type);
                     setToLocalStorage(file.size, JSON.stringify({hires_image: reader.result, lowres_image: resizedImage, title: "", comment: "", albums: []}))
                     setSelectedFiles(localStorage.length)
                    })
                  img.src=reader.result
              })           
            }}  
            className={style.chooseFile} type="file" name="picture"
          />
        </div>
      </div>)
  }

  function resizeImage() {

  }


  function ChosenPictures() {
    console.log("Localstorage length" + localStorage.length)
    let a = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      //console.log("key " + key + index)
      
      a.push (
        <div className={style.chosenPictureContainer}>
          <div className={style.chosenPictureBoundary}>
            <img className={style.chosenPicture} src={value.hires_image} />
          </div>
          <input className={style.choice} name={key + "_Title"} type="text" placeholder="Title"/>
          <input className={style.choice} name={key + "_Comment"} type="text" placeholder="Comment"/>
          <select name={key + "_Album"} className={style.choice}>
            <option>Album 1</option>
            <option>Album 2</option>
          </select>
        </div>
      )
    }
    return a
  }

  function logLocalStorage() {
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      console.log(value)
    }
  }

  useEffect(() => {
    const button = document.getElementById("submit")
    button.addEventListener("click", ((event) => {
      event.preventDefault()
      logLocalStorage()
    }))
  }, [])
  

  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
      <div className={style.top}>
        <p className={style.title}>Add Pictures</p>
        <FormAdd/>
      </div>

        <form method="post" className={style.formx}>
          <div className={style.collection}>
            <ChosenPictures/>
          </div>
          <button type="submit" id="submit" className={style.choosebtn}>Upload</button>
        </form>

      </div>
    </div>
  );
}

export default AddPicture;
