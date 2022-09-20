import { useContext } from "react"
import StorageContext from "../Store/StorageContext"
import JSONContext from "../Store/JSONContext"
import style from "./Styles/FormAdd.module.css"

//Component that shows the "Add Picture" area and handles all the adding
function FormAdd(props) {
  const storageCtx = useContext(StorageContext)
  const jsonCtx = useContext(JSONContext)

  return (
    <div className={style.largeAdd}>
      <div className={style.smalladd}>
        <p>Add</p>
      </div>
      <div className={style.chooseDiv}>
        <button className={style.uploadButton}></button>

        {/*This inputs onChange triggers when you have chosen an image, 
          //That image is being used as input in the callback function, (image) in this case
          //We read that image in the filereader and converts it to a dataURL(file in textformat???).
          //We store the file in a canvas that we resize, we then access the data in the canvas and converts it to a dataURL
          //That is how we save two pictures in two different sizes.*/}
        <input
          onChange={(image) => {
            const file = image.target.files[0]
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener("load", () => {
              //Create Image
              const img = document.createElement("img")
              //Convert image
              img.onload = (() => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")

                const convertedHeight = img.height * 0.5
                const convertedWidth = img.width * 0.5

                canvas.width = convertedWidth
                canvas.height = convertedHeight

                ctx.drawImage(img, 0, 0, convertedWidth, convertedHeight)
                const resizedImage = canvas.toDataURL(file.type);

                const random = Math.floor(Math.random()*10000)

                if(props.mode === "images") {
                  const imageObject = { 
                    id: random,
                    hires_image: reader.result, 
                    lowres_image: resizedImage, 
                    title: "", 
                    comment: "", 
                    album: jsonCtx.AlbumsList[0].id,
                  }
                  //Store images and empty properties in Localstorage.
                  storageCtx.SetToLocalStorage(imageObject, "images")
                  storageCtx.SetSelectedFiles(localStorage.length)
                }

                if(props.mode === "album") {
                  storageCtx.UpdateAlbum("image", resizedImage)
                }
              })
              //Populate image element with original image.
              //This is to trigger the img.onload function.  
              img.src = reader.result
            })
          }}
          className={style.chooseFile} type="file" name="picture"
        />
      </div>
    </div>)
}

export default FormAdd