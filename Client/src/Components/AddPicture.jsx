import style from "./Styles/AddPicture.module.css";
import React from "react";
import { useState, useEffect, useContext } from "react";
import ImgContext from "../store/img";
import FormAdd from "./FormAdd";

//This component is being used to fill the modal when modalstate === addPicturess
function AddPicture() {
  const imgCtx = useContext(ImgContext);
  //State used to rerender component
  const [selectedFiles, setSelectedFiles] = useState()

  //We have to use useEffect here to access the submit button after render.

  //**When code is inside the useEffect hook, it only executes after component is rendered**
  useEffect(() => {
    const button = document.getElementById("submit")
    button.addEventListener("click", ((event) => {
      event.preventDefault()
      logLocalStorage()
    }))

    const inputs = document.getElementsByClassName(style.choice);
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      element.addEventListener("change", (e) => {
        const value = e.target.value
        const key = element.getAttribute('data-key')
        const field = element.getAttribute('data-field')
        updateLocalStorage(key, field, value)
      })
    }
  }, [selectedFiles])

  //Function to populate Localstorage
  function setToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      console.log("Saved item to storage")
    } catch (error) {
      console.log("Couldnt save item to storage")
    }
    setSelectedFiles(localStorage.length)
  }

  function updateLocalStorage(inputKey, inputField, inputValue) {
    const storageItem = JSON.parse(localStorage.getItem(inputKey))
    let storageItemKeys = [...Object.entries(storageItem)]

    for (let index = 0; index < storageItemKeys.length; index++) {
      let key = storageItemKeys[index][0]

      if (key === inputField) {
        storageItemKeys[index][1] = inputValue
      }
    }

    const newObj = JSON.stringify(Object.fromEntries(storageItemKeys))
    setToLocalStorage(inputKey, newObj)
  }

  //Loop through localstorage and show what's returned in input and image tags
  function ChosenPictures() {
    console.log("Localstorage length" + localStorage.length)
    let pictureContainer = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))

      pictureContainer.push(
        <div className={style.chosenPictureContainer}>
          <div className={style.chosenPictureBoundary}>
            <img className={style.chosenPicture} src={value.hires_image} />
          </div>
          <input id="choiceTitle" className={style.choice} data-key={key} data-field="title" name={key + "_Title"} placeholder={value.title} type="text" />
          <input id="choiceComment" className={style.choice} data-key={key} data-field="comment" name={key + "_Comment"} placeholder={value.comment} type="text" />
          <select data-key={key} data-field="album" name={key + "_Album"} className={style.choice}>
            {imgCtx.AlbumsList.map(album => { 
              return (<option>{album.title}</option>)
            })}
          </select>
        </div>
      )
    }
    return pictureContainer
  }

  //Push the objects in localstorage to a singleobjects that's supposed to be sent in a POST request
  function logLocalStorage() {
    let images = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      images.push(value)
    }
    const storageObjects = { ...images }
    console.log(storageObjects)
  }

  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <div className={style.top}>
          <p className={style.title}>Add Pictures</p>
          <FormAdd />
        </div>

        <form method="post" className={style.formx}>
          <div className={style.collection}>
            <ChosenPictures />
          </div>
          <div id="submit" className={style.choosebtn}>Upload</div>
        </form>

      </div>
    </div>
  );
}

export default AddPicture;
