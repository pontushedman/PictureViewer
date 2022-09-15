import ImgContext from "../store/img";
import { useContext, useEffect } from "react";
import styles from "./Styles/PicturesPage.module.css";

function PicturesPage(props) {
  const imgCtx = useContext(ImgContext);
  const loading = imgCtx.AlbumsList;
  
  useEffect(() => {
    const images = document.getElementsByClassName(styles.PictureImage)
    for (let index = 0; index < images.length; index++) {
        const image = images[index]
        image.addEventListener("click", (e) => {
            const imageId = image.dataset.id
            props.showModal({show: true, mode: "image", data: {image: {id: imageId}}})        
        })
    }
  })
  
  if (loading === undefined) {
    return "Loading";
  }
  

  return (
    <div className={styles.PicturesPage}>
      <div className={styles.top}>
        <img className={styles.titleImage} src="./src/assets/images.png"/>
        <p className={styles.title}>All Images</p>
      </div>
      <div className={styles.Images}>
        {loading.map((x) =>
          x.pictures.map((y) => (
            <div className={styles.Image}> {console.log(y.imgLoRes.replace(" ", "%20"))}
              <div 
                className={styles.PictureImage}
                //src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes}
                style={{backgroundImage: "url(http://localhost:3000/" + x.path + "/" + y.imgLoRes.replace(/ /g,'%20' ) + ")"}}
              />
            </div>
          ))
        )}
        {console.log(loading)}
      </div>
    </div>
  );
}

export default PicturesPage;
