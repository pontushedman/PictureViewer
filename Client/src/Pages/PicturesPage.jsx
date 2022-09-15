import ImgContext from "../store/img";
import { useContext } from "react";
import styles from "../Components/Styles/CategoryTitle.module.css";

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
          <div className={styles.Image}>
            <img
              className={styles.PictureImage}
              src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes}
            />
          </div>
        ))
      )}
      {console.log(loading)}
    </div>
  );
}

export default PicturesPage;
