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
          <div className={styles.Album}>
            {console.log(x.headerImage)}
            <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} />
            <p className={styles.AlbumTitle}>{x.title}</p>
            <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
          </div>)}
        {console.log(JSONCtx.totalImages)}
      </div>
    )
  )
}

export default AllAlbums