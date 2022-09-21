import { useState } from "react";
import styles from "./Styles/Actions.module.css";



function Actions(props) {
const [rating, setRating] = useState(props.image.rating)

const checkMimeType = (mimeType) => 
{
    if (typeof mimeType !== 'string')
        return false;

    let pattern = /image\/(png|jpeg|webp|gif)/;

    if (mimeType.match(pattern)){
      return mimeType.split('/').pop();
    } 
    return false;
}
const sanitizeTitle = (input) =>
{
  if (typeof input !== 'string')
        return 'undefined';
  return input.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
}
  
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
      <div 
        className={styles.albumDelete + " " + styles.albumAction }
        onClick={(e => 
              {
                let target = props.image
                //Fetch
                fetch('http://localhost:3000/api/picture', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({id: target.id}),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data.message);
                  })
                  .catch((error) => {
                    console.error(error.message);
                  });
              }
            )}>

        <img src="src/assets/trash.svg" />
        <p>Delete</p>
      </div>

      <div
        className={styles.albumDownload + " " + styles.albumAction}
        onClick={(e => 
          {
            let target = props.image
            //Fetch
            fetch(`http://localhost:3000/api/picture/${target.id}`, {
              method: 'GET',
            })
            .then((response) => response.blob())
            .then((data) => {
              // Download the file
              const title = sanitizeTitle(target.title);
              const extention = checkMimeType(data.type);
              let a = document.createElement("a");
              a.href = window.URL.createObjectURL(data);
              a.download = `${title}.${extention}`;
              a.click();
            })
            .catch((error) => {
              console.error(error.message);
            });
          }
        )}>

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
