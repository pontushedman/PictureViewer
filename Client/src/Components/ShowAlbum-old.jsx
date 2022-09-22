import styles from "./Styles/ShowAlbum.module.css"
import { useContext, useState} from "react"
import JSONContext from "../Store/JSONContext"
import FormAdd from "./FormAdd"
import Actions from "./Actions"

function ShowAlbum(props) {
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList

  //console.log("Showalbum rendered")

  const [chosenImage, setChosenImage] = useState({ index: 0, image: getAlbumFromId(albums, props.id).pictures[0] })

  const [slideImages, setSlideImages] = useState[0]

  const album = getAlbumFromId(albums, props.id)

  function switchImageInc() {
    const plus = chosenImage.index + 1
    if (plus > album.pictures.length - 1) {
      setChosenImage({ index: chosenImage.index, image: album.pictures[chosenImage.index] })
    } else {
      setChosenImage({ index: plus, image: album.pictures[plus] })
    }
  }

  function switchImageDec() {
    let minus = chosenImage.index - 1
    minus < 0 ? minus = 0 :
      setChosenImage({ index: minus, image: album.pictures[minus] })
  }

  function switchImageFromId(e) {
    console.log(e.target)
    const imageId = e.target.dataset.id
    for (let index = 0; index < album.pictures.length; index++) {
      const img = album.pictures[index];
      if (img.id === imageId) {
        setChosenImage({index: index, image:img});
      } 
    }
  }

  function getAlbumFromId(list, value) {
    let albumx = {}
    list.map(album => {
      if (album.id === value) {
        albumx = album
      }
    })
    return albumx
  }

  return (
    <div className={styles.showAlbumContainer}>
      <div className={styles.top}>
        <input placeholder={album.title} className={styles.title}/>
        <input placeholder={album.comment} className={styles.comment}/>
        <div className={styles.formAdd}>
           <FormAdd/>
        </div>
      </div>
      <div className={styles.imageTitle}>
        <p>{chosenImage.image.title}</p>
      </div>
      <div className={styles.slideshow}>
        <div className={styles.left}>
          <img src="./src/assets/arrow-circle-left.svg" data-action="decrease" onClick={switchImageDec} id="minus" className={styles.button} />
        </div>
        <div className={styles.middle}>
          <div className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{ backgroundImage: "url(http://localhost:3000/" + album.path + "/" + chosenImage.image.imgHiRes.replace(/ /g, '%20') + ")" }}
            >
              <div className={styles.imageCommentContainer}>
                <p className={styles.imageComment}>{chosenImage.image.comment}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src="./src/assets/arrow-circle-right.svg" data-action="increase" onClick={switchImageInc} id="plus" className={styles.button} />
        </div>
      </div>
      <div className={styles.albumImages}>
        {
          album.pictures.map(image => {
            return (
              <div className={styles.albumImage}
                style={{ backgroundImage: "url(http://localhost:3000/" + album.path + "/" + image.imgLoRes.replace(/ /g, '%20') + ")" }}
                data-id={image.id}
                onClick={((e) => {switchImageFromId(e)})}
              />
            )
          })
        }
      </div>
      <Actions image={album} />
    </div>
  )
}

export default ShowAlbum