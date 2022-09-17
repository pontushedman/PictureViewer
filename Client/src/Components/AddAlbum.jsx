import FormAdd from "./FormAdd"
import styles from "./Styles/AddAlbum.module.css"

function AddAlbum() {
  const headerImageUrl = "http://localhost:3000/app-data/library/pictures/album-header/A Galactic Spectacle_4862916839_o~small.jpg"
  const headerImage = headerImageUrl.replace(/ /g, '%20')
  console.log("apaaaa" + headerImage)

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
            style={{ backgroundImage: "url(" + headerImage + ")" }}
          >
          </div>
          <div className={styles.formAdd}>
            <FormAdd className={styles.formAdd} />
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.inputTitle}>Title</p>
          <input className={styles.titleInput} type="text" />
          <p className={styles.inputComment}>Comment</p>
          <textarea className={styles.commentInput} />
        </div>
      </div>
      <button className={styles.createAlbum}>Create</button>

    </div>
  )
}

export default AddAlbum
