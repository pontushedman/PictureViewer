import FormAdd from "./FormAdd"
import styles from "./Styles/AddAlbum.module.css"
import StorageContext, { StorageContextProvider } from "../Store/StorageContext"
import { useContext, useEffect, useState } from "react"

function AddAlbum() {
  const storageCtx = useContext(StorageContext)

  const album = storageCtx.GetAlbum()  
  const albumTitle = album.title
  const albumComment = album.comment
  const albumImage = album.image
  
  const headerImageUrl = "http://localhost:3000/app-data/library/pictures/album-header/A Galactic Spectacle_4862916839_o~small.jpg"
  const headerImage = headerImageUrl.replace(/ /g, '%20')

  return (
    <div className={styles.addAlbumContainer}>
      <div className={styles.top}>
        <p className={styles.title}>Add Album</p>
      </div>
      <div className={styles.lrContainer}>
        <div className={styles.left}>
          <p className={styles.inputTitle}>Album Cover</p>
          <div
            className={styles.chosenImage}
            style={{ backgroundImage: "url(" + albumImage + ")" }}
          >
          </div>
          <div className={styles.formAdd}>
            <FormAdd mode="album"/>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.inputTitle}>Title</p>
          <input 
            onChange={((e) => {storageCtx.UpdateAlbum(e.target.dataset.field, e.target.value)})}
            className={styles.titleInput} 
            type="text"
            data-field="title"
            placeholder={albumTitle}
          />
          <p className={styles.inputComment}>Comment</p>
          <textarea 
            onChange={((e) => {storageCtx.UpdateAlbum(e.target.dataset.field, e.target.value)})}
            className={styles.commentInput} 
            placeholder={albumComment}
            data-field="comment"
          />
        </div>
      </div>
      <button className={styles.createAlbum} onClick={() => console.log(storageCtx.GetAlbum())}>Create</button>

    </div>
  )
}

export default AddAlbum
