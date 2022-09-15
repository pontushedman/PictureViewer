import ImgContext from "../store/img";
import { useContext } from "react";
import styles from "./Styles/PicturesPage.module.css";

function PicturesPage() {
  const imgCtx = useContext(ImgContext);
  const loading = imgCtx.AlbumsList;
  if (loading === undefined) {
    return "Loading";
  }

  return (
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
  );
}

export default PicturesPage;
