import styles from "./Styles/ShowAlbum.module.css"
import { useContext, useState, useEffect} from "react"
import JSONContext from "../Store/JSONContext"
import FormAdd from "./FormAdd"
import Actions from "./Actions"

function ShowAlbum(props) {

  console.log("showalbum rendered")
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList

  //console.log("Showalbum rendered")

  const [chosenImage, setChosenImage] = useState({ index: 0, image: getAlbumFromId(albums, props.id).pictures[0] })
  const [slideImages, setSlideImages] = useState([])
  let [currentIndex, setCurrentIndex] = useState(0)
  const [toggleSlideShow, setToggleSlideShow] = useState(false)

  const album = getAlbumFromId(albums, props.id)

  const delay = 2500;

  let togg

  if (toggleSlideShow) {
    togg = setTimeout(() => {
      switchImageInc() 
    }, delay)
  } else {
    clearInterval(togg)
  }

  function startSlide () {
    //inter(switchImageInc(), 5000);
  }

  function switchImageInc() {
    let plus = currentIndex + 1
    plus > slideImages.length-1 ? plus = 0 : null
    setCurrentIndex(plus)
  }

  function switchImageDec() {
    let minus = currentIndex - 1
    minus < 0 ? minus = slideImages.length-1 : null
    setCurrentIndex(minus)
  }

  function addToSlide(e) {
    const imageId = e.target.dataset.id
    for (let index = 0; index < album.pictures.length; index++) {
      const img = album.pictures[index];
      if (img.id === imageId) {
        setSlideImages([...slideImages,  img])
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

  let initialBackground = {}
  let initialTitle = ""
  let initialComment = ""

  if(slideImages.length != 0) {
    initialTitle = slideImages[currentIndex].title
    initialComment = slideImages[currentIndex].comment
    initialBackground = { backgroundImage: "url(http://localhost:3000/" + album.path + "/" + slideImages[currentIndex].imgHiRes.replace(/ /g, '%20') + ")" }
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
        <p>{initialTitle}</p>
      </div>
      <div className={styles.slideshow}>
        <div className={styles.left}>
          <img src="./src/assets/arrow-circle-left.svg" data-action="decrease" onClick={switchImageDec} id="minus" className={styles.button} />
        </div>
        <div className={styles.middle}>
          <div className={styles.imageContainer}>
            <div
              className={styles.image}
              style={initialBackground}
            >
              <div className={styles.imageCommentContainer}>
                <p className={styles.imageComment}>{initialComment}</p>
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
            console.log("kuuk")
            const check = slideImages.map(slideImage => {
              if (image.id === slideImage.id) {
                return (<div 
                  style={{ 
                    backgroundImage: "url(./src/assets/checkbox.svg)",
                    width: "1rem",
                    height: "1rem",
                    position: "absolute",
                    zIndex: "20",
                    top: "0",
                    left: "0",
                    marginLeft: "-0.1rem",
                    marginTop: "-0.1rem",
                    backgroundPosition: "center",
                    WebkitBackgroundSize: "cover",
                    filter: "invert(54%) sepia(73%) saturate(4223%) hue-rotate(187deg) brightness(103%) contrast(91%)"
                   }}/>)
                  
              } else {
                return <div/>
              }
            })
            return (
              <div className={styles.albumImageContainer}>
                {check}
                <div className={styles.albumImage}
                  style={{ backgroundImage: "url(http://localhost:3000/" + album.path + "/" + image.imgLoRes.replace(/ /g, '%20') + ")" }}
                  data-id={image.id}
                  onClick={((e) => {addToSlide(e)})}
                />
              </div>
            )
          })
        }
      </div>
      <Actions image={album} mode="album" showSlide={true} slideStatus={toggleSlideShow} toggleSlideShow={setToggleSlideShow}/>
    </div>
  )
}

export default ShowAlbum