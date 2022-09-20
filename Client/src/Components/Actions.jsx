import { useState } from "react";
import styles from "./Styles/Actions.module.css";



function Actions(props) {
const [rating, setRating] = useState(props.image.rating)
  
function SetRating() {
    const maxLength = 5;
    const stars = [];
    const updateRating = (imgObj) => {
      //Fetch
      fetch('http://localhost:3000/api/picture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: imgObj.id, rating: imgObj.rating}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    for (let index = 1; index <= maxLength; index++) {
      if (index <= rating)
        stars.push(
          <img 
            onClick={(e => 
              {
                let newImg = props.image
                newImg.rating = e.target.dataset.rating
                setRating(e.target.dataset.rating)
                updateRating(newImg);
              }
            )} 
            className={styles.star} 
            src="./src/assets/star_filled.svg" 
            data-rating={index}
            data-id={props.image.id}
          />
      )
      
      if (index > rating) 
        stars.push(
          <img 
            onClick={(e => 
              {
                let newImg = props.image
                newImg.rating = e.target.dataset.rating
                console.log(newImg)
                setRating(e.target.dataset.rating)
                updateRating(newImg);
              }
            )} 
            className={styles.star} src="./src/assets/star.svg" 
            data-rating={index} 
            data-id={props.image.id}
          />
        )
      
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
      {/* <div className={styles.albumEdit + " " + styles.albumAction}>
        <img src="src/assets/pencil.svg" />
        <p>Edit</p>
      </div> */}
      <div className={styles.rating}>
        <SetRating/>
      </div>
    </div>
  );
}

export default Actions;
