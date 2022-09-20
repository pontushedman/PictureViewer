import { useContext } from "react"
import JSONContext from "../Store/JSONContext"
import Actions from "./Actions"
import styles from "./Styles/ShowImage.module.css"

function getImageFromId(list, value) {
  let img = {}
  list.map(album => {
    album.pictures.map((image) => {
      if (image.id == value) {
        img = { path: album.path, img: image }
      }
    })
  })
  return img
}

function ShowImage(props) {
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList

  const image = getImageFromId(albums, props.id)
  console.log(image)

  //src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes}

  return (
    <div className={styles.showImageContainer}>
      <input 
        type="text" 
        placeholder={image.img.title} 
        className={styles.imageTitle}
        onChange={(e) => {
          let newImage = image.img
          newImage.title = e.target.value
          console.log(newImage)
        }}
      />
      <div className={styles.commentImageFW}>
        <div className={styles.commentImageContainer}>
          <img className={styles.image} src={"http://localhost:3000/" + image.path + "/" + image.img.imgHiRes} />
          <div className={styles.commentContainer}>
            <textarea 
              className={styles.comment}
              onChange={(e) => {
                let newImage = image.img
                newImage.comment = e.target.value
                console.log(newImage)
              }}
            >
              {image.img.comment}
            </textarea>
          </div>
        </div>
      </div>
      <Actions image={image.img} />
    </div>



  )


}

export default ShowImage