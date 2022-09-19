import JSONContext from '../Store/JSONContext'
import { useContext, } from 'react'
import styles from './Styles/AlbumsPage.module.css'

function AlbumsPage() {

  const JSONCtx = useContext(JSONContext)
  console.log("Albumspage rendered")
  return (
    (
      <div className={styles.AlbumsPage}>
        <div className={styles.top}>
          <img className={styles.titleImage} src="./src/assets/albums.png" />
          <p className={styles.title}>All Albums</p>
        </div>
        <div className={styles.Albums}>
          {JSONCtx.AlbumsList.map(x =>
            <div className={styles.Album}>
              <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} />
              <p className={styles.AlbumTitle}>{x.title}</p>
              <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
            </div>)}
        </div>
      </div>
    )
  )
}

export default AlbumsPage