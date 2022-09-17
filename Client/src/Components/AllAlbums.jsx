import { ImgContexProvider } from '../store/img'
import ImgContext from '../store/img'
import { useContext, } from 'react'
import styles from '../Components/Styles/CategoryTitle.module.css'

function AllAlbums() {

  const imgCtx = useContext(ImgContext)
  return (
    (
      <div className={styles.Albums}>
        {imgCtx.images.map(x =>
          <div className={styles.Album}>
            {console.log(x.headerImage)}
            <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} />
            <p className={styles.AlbumTitle}>{x.title}</p>
            <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
          </div>)}
        {console.log(imgCtx.totalImages)}
      </div>
    )
  )
}

export default AllAlbums