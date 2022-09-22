import JSONContext from "../Store/JSONContext";
import { useContext, useState } from "react";
import styles from "./Styles/PicturesPage.module.css";
import { useEffect } from "react";

function PicturesPage(props) {
  const JSONCtx = useContext(JSONContext);
  const originalImages = JSONCtx.AlbumsList;
  
  let [filteredImages, setFilteredImages] = useState([...originalImages])

  function filterImages(input) {
    setFilteredImages([...originalImages])

    console.log(input)
  }

  function showImage(image) {
    const imageId = image.target.dataset.id
    props.showModal({ show: true, mode: "image", id: imageId })
  }

  if (filteredImages === undefined) {
    return "Loading";
  }

  return (
    <div className={styles.picturePageContainer}>
    <div className={styles.PicturesPage}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img className={styles.titleImage} src="./src/assets/images.png" />
          <p className={styles.title}>All Images</p>
        </div>
        <div className={styles.middle}>
          <input onChange={((e) => {filterImages(e.target.value)})} className={styles.search} placeholder="Search"/>
        </div>
        <div className={styles.right}>
          <div onClick={(e => {props.showModal({show: true, mode: "addimages"})})} className={styles.addImages}>Add Images</div>
        </div>
      </div>
      <div className={styles.Images}>
        {filteredImages.map((x) =>
          x.pictures.map((y) => (
            <div className={styles.Image}> {console.log(y.imgLoRes.replace(" ", "%20"))}
              <div
                className={styles.PictureImage}
                style={{ backgroundImage: "url(http://localhost:3000/" + x.path + "/" + y.imgLoRes.replace(/ /g, '%20') + ")" }}
                data-id={y.id}
                onClick={(e => {
                  showImage(e)
                })}
              />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default PicturesPage;
