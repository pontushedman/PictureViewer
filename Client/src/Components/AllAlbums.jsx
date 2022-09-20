import { ImgContexProvider } from '../store/img'
import JSONContext from '../Store/JSONContext'
import { useContext, } from 'react'
import styles from '../Components/Styles/CategoryTitle.module.css'

function AllAlbums() {

  const JSONCtx = useContext(JSONContext)
  return (
    (
      <div className={styles.Albums}>
        {JSONCtx.images.map(x =>
          <div className={styles.Album} key={uniqueId()}>
            <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} key={uniqueId()} />
            <p className={styles.AlbumTitle} key={uniqueId()}>{x.title}</p>
            <p className={styles.AlbumImageCount} key={uniqueId()}>{x.pictures.length} Pictures</p>
          </div>)}
      </div>
    )
  )
}

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
};
export default AllAlbums