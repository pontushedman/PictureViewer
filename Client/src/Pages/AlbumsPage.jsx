import JSONContext from '../Store/JSONContext'
import { useContext, } from 'react'
import styles from './Styles/AlbumsPage.module.css'

function AlbumsPage(props) {

  const JSONCtx = useContext(JSONContext)

  function openAlbum(e) {
    const albumId = e.target.dataset.id
    const obj = { show: true, mode: "album", id: albumId }
    props.showModal(obj)
  }
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
          <div 
            onClick={(e => {
              openAlbum(e)
            })}
            key={x.id + 1} 
            className={styles.Album}
            data-id={x.id}
            >
            
            <img key={x.id + 2}
              className={styles.AlbumHeaderImage}
              data-id={x.id}
              src={"http://localhost:3000/" + x.headerImage}
            />
            <p key={x.id + 3} className={styles.AlbumTitle}>{x.title}</p>
            <p key={x.id + 4} className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
          </div>)}
        </div>
      </div>
    )
  )
}

export default AlbumsPage