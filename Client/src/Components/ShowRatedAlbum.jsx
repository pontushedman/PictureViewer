import styles from "./Styles/ShowAlbum.module.css"
import { useContext, useState, useEffect} from "react"
import JSONContext from "../Store/JSONContext"
import FormAdd from "./FormAdd"
import Actions from "./Actions"

function ShowRatedAlbum(props) {

  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.RatedAlbumList;
  const album = getAlbumFromRating(albums, props.rating);

  const [slideImages, setSlideImages] = useState([...album.pictures])
  let [currentIndex, setCurrentIndex] = useState(0)
  const [toggleSlideShow, setToggleSlideShow] = useState(false)


  const delay = 2500;
  let togg

  if (toggleSlideShow) {
    togg = setTimeout(() => {
      switchImageInc() 
    }, delay)
  } else {
    clearInterval(togg)
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
    if (slideImages.find(x => x.id === e.target.dataset.id))
    {
      removeFromSlide(e);
      return;
    }
    const imageId = e.target.dataset.id
    for (let index = 0; index < album.pictures.length; index++) {
      const img = album.pictures[index];
      if (img.id === imageId) {
        setSlideImages([...slideImages,  img])
      } 
    }
  }

  function removeFromSlide(e)
  {
    const imageId = e.target.dataset.id;
    setSlideImages(slideImages.filter(x => x.id !== imageId));
  }


  function getAlbumFromRating(list, value) {
    let albumx = {}
    list.map((element) => {
      //console.log(`${element.rating} === ${value}`);
      if (element.rating === value)  albumx = element;
     })

     //console.log('after map');
     //console.log(albumx);
    return albumx;
  }

  let initialBackground = {}
  let initialTitle = ""
  let initialComment = ""

  if(slideImages.length != 0) {
    initialTitle = slideImages[currentIndex].title
    initialComment = slideImages[currentIndex].comment
    initialBackground = { backgroundImage: "url(http://localhost:3000/" + slideImages[currentIndex].imgHiRes.replace(/ /g, '%20') + ")" }
  }

  return (
    <div className={styles.showAlbumContainer}>
      <div className={styles.top}>
        <input  placeholder={album.title} className={styles.title} />
        <input 
          placeholder={'Rated album'} className={styles.comment} />
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
            const check = slideImages.map(slideImage => {
              if (image.id === slideImage.id) {
                return (<div 
                  key={uniqueId()}
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
                  style={{ backgroundImage: "url(http://localhost:3000/" + image.imgLoRes.replace(/ /g, '%20') + ")" }}
                  data-id={image.id}
                  onClick={((e) => {addToSlide(e)})}
                />
              </div>
            )
          })
        }
      </div>
      <Actions obj={album} mode="rated" showSlide={true} slideStatus={toggleSlideShow} toggleSlideShow={setToggleSlideShow}/>
    </div>
  )
}

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
}

export default ShowRatedAlbum