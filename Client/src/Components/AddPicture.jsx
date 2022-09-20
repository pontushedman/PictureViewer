import style from "./Styles/AddPicture.module.css";
import React, { useEffect, useContext } from "react";
import JSONContext from "../Store/JSONContext";
import FormAdd from "./FormAdd";
import StorageContext, { StorageContextProvider } from "../Store/StorageContext";

//This component is being used to fill the modal when modalstate === addPicturess
function AddPicture() {
  const JSONCtx = useContext(JSONContext);
  const storageCtx = useContext(StorageContext)

  useEffect(() => {
    console.log("IT IS RENDERED")
  })

  //Loop through localstorage and show what's returned in input and image tags
  function ChosenPictures() {
    console.log("Localstorage length" + localStorage.length)
    let pictureContainer = []
    let images = JSON.parse(localStorage.getItem("images"))
    if (localStorage.length === 0) {
      return <></>
    }

    for (let index = 0; index < images.images.length; index++) {
      const value = images.images[index]
      const key = images.images[index].id
      console.log("value " + value)
      pictureContainer.push(
        <StorageContextProvider>
        <div className={style.chosenPictureContainer}>
          <div className={style.chosenPictureBoundary}>
            <img className={style.chosenPicture} src={images.images[index].hires_image} />
          </div>


          <input 
            onChange={((e) => {storageCtx.UpdateLocalStorage(e.target.dataset.key, e.target.dataset.field, e.target.value)})}
            id="choiceTitle" 
            className={style.choice} 
            data-key={value.id}
            data-field="title" 
            name={key + "_Title"} 
            placeholder={value.title} 
            type="text" 
          />
         
          <input 
            onChange={((e) => {storageCtx.UpdateLocalStorage(e.target.dataset.key, e.target.dataset.field, e.target.value)})}
            id="choiceComment" 
            className={style.choice}
            data-key={value.id}
            data-field="comment" 
            name={key + "_Comment"} 
            placeholder={value.comment} 
            type="text" 
          />

          <div id={storageCtx.SelectedFiles }></div>

          <select 
            onChange={((e) => {storageCtx.UpdateLocalStorage(e.target.dataset.key, e.target.dataset.field, e.target.value)})}
            data-key={value.id}  
            data-field="album" 
            name={key + "_Album"} 
            className={style.choice}
            value={value.album}
          >
            {JSONCtx.AlbumsList.map(album => {
              return (<option>{album.title}</option>)
            })}
          </select>

        </div>
        </StorageContextProvider>
      )
    }
    return pictureContainer
  }

  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <div className={style.top}>
          <p className={style.title}>Add Pictures</p>
          <FormAdd mode="images"/>
        </div>

        <div className={style.formx}>
          <div className={style.collection}>
          <StorageContext.Consumer>
            {value => {
              return(               
                <ChosenPictures />
              )
            }}
            </StorageContext.Consumer>
          </div>
          <div 
            id="submit" 
            onClick={(e => 
              {
                console.log(storageCtx.GetImagesFromStorage())
              })
            } 
            className={style.choosebtn}
            >
            Upload
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddPicture;
