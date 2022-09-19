import { useState } from "react";
import styles from "./Styles/Actions.module.css";



function Actions(props) {
const [rating, setRating] = useState(props.rating)
  function SetRating() {
    const maxLength = 5;
    const stars = [];
    for (let index = 1; index <= maxLength; index++) {
      if (index <= rating)
        stars.push(<img onClick={(e => {setRating(e.target.dataset.rating)})} className={styles.star} src="./src/assets/star_filled.svg" data-rating={index}/>);
      if (index > rating) 
        stars.push(<img onClick={(e => {setRating(e.target.dataset.rating)})} className={styles.star} src="./src/assets/star.svg" data-rating={index}/>);
      
    }
    return stars;
  }

  return (
    <div className={styles.actions}>
      <div className={styles.albumDelete + " " + styles.albumAction}>
        <img src="src/assets/trash.svg" />
        <p>Delete</p>
      </div>
      <div className={styles.albumDownload + " " + styles.albumAction}>
        <img src="src/assets/download.svg" />
        <p>Download</p>
      </div>
      <div className={styles.albumEdit + " " + styles.albumAction}>
        <img src="src/assets/pencil.svg" />
        <p>Edit</p>
      </div>
      <div className={styles.rating}>
        <SetRating/>
      </div>
    </div>
  );
}

export default Actions;
