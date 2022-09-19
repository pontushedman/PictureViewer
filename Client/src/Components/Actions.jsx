import styles from "./Styles/Actions.module.css"

function Actions() {
  return (
    <div className={styles.actions}>
        <div className={styles.albumDelete + " " +  styles.albumAction}>
          <img src="src/assets/trash.svg"/>
          <p>Delete</p>
        </div>
        <div className={styles.albumDownload + " " +  styles.albumAction}>
          <img src="src/assets/download.svg"/>
          <p>Download</p>
        </div>
        <div className={styles.albumEdit + " " +  styles.albumAction} >
          <img src="src/assets/pencil.svg"/>
          <p>Edit</p>
        </div>
      </div>
  )
}

export default Actions