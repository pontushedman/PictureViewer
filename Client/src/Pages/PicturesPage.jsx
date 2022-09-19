import JSONContext from "../Store/JSONContext";
import { useContext } from "react";
import styles from "./Styles/PicturesPage.module.css";

function PicturesPage(props) {
  const JSONCtx = useContext(JSONContext);
  const loading = JSONCtx.AlbumsList;

  function showImage(image) {
    const imageId = image.target.dataset.id
    props.showModal({ show: true, mode: "image", id: imageId })
  }

  if (loading === undefined) {
    return "Loading";
  }


  return (
    <div className={styles.PicturesPage}>
      <div className={styles.top}>
        <img className={styles.titleImage} src="./src/assets/images.png" />
        <p className={styles.title}>All Images</p>
      </div>
      <div className={styles.Images}>
        {loading.map((x) =>
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
        {console.log(loading)}
      </div>
    </div>
  );
}

export default PicturesPage;
