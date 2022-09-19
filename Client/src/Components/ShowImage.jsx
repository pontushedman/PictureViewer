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
      <p className={styles.imageTitle}>{image.img.title}</p>
      <div className={styles.commentImageFW}>
        <div className={styles.commentImageContainer}>
          <img className={styles.image} src={"http://localhost:3000/" + image.path + "/" + image.img.imgLoRes} />
          <div className={styles.commentContainer}>
            <p className={styles.comment}>{image.img.comment}</p>
          </div>
        </div>
      </div>
      <Actions/>
    </div>



  )


}

export default ShowImage