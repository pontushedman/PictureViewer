import { useEffect } from "react";
import { useState } from "react";
import styles from "./Styles/Actions.module.css";



function Actions(props) {
const [rating, setRating] = useState(props.obj.rating)

  const checkMimeType = (mimeType) => {
    if (typeof mimeType !== 'string')
      return false;

    let pattern = /(image|application)\/(png|jpeg|webp|gif|zip)/;

    if (mimeType.match(pattern)) {
      return mimeType.split('/').pop();
    }
    return false;
  }
  const sanitizeTitle = (input) => {
    if (typeof input !== 'string')
      return 'undefined';
    return input.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
  }

  function SetRating() {
    const maxLength = 5;
    const stars = [];
    const updateRating = (actionObj) => {
      //Fetch - We use the appropriate link to the request depending on mode (image / album)
      fetch(
          props.mode === 'image' ? 'http://localhost:3000/api/picture' : 
          props.mode === 'album' ? 'http://localhost:3000/api/album' : '', 
          {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({id: actionObj.id, rating: actionObj.rating}),
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
                let targetObj = props.obj
                targetObj.rating = e.target.dataset.rating
                setRating(e.target.dataset.rating)
                updateRating(targetObj);
              }
            )} 
            className={styles.star} 
            src="./src/assets/star_filled.svg" 
            data-rating={index}
            data-id={props.obj.id}
          />
        )

      if (index > rating)
        stars.push(
          <img 
            onClick={(e => 
              {
                let targetObj = props.obj
                targetObj.rating = e.target.dataset.rating
                setRating(e.target.dataset.rating)
                updateRating(targetObj);
              }
            )} 
            className={styles.star} src="./src/assets/star.svg" 
            data-rating={index} 
            data-id={props.obj.id}
          />
        )

    }
    return stars;
  }
  

  const ss = (() => {
    return props.showSlide ? 
      <div 
        className={styles.showSlide}
        onClick={() => {
            if (!props.slideStatus) {
              props.toggleSlideShow(true)
            } else {
              props.toggleSlideShow(false)
            }
        }}
      >
        {props.slideStatus ?  <p>Stop slide</p> : <p>Start slide</p>}
      </div> 
      : 
      <div />
  })

  return (

    <div className={styles.actions}>
      <div className={styles.left}>
      <div 
        className={styles.albumDelete + " " + styles.albumAction }
        onClick={(e => 
              {
                let target = props.obj
                //Fetch Todo: save all urls as constans accessed globally to not hardcode stuff in
                fetch(
                  props.mode === 'image' ? 'http://localhost:3000/api/picture' : 
                  props.mode === 'album' ? 'http://localhost:3000/api/album' : '', 
                {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json',},
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
        onClick={(async e => 
          {
            const checkJson = (input) => {};
            let target = props.obj
            //Fetch
            const response = await fetch(
              props.mode === 'image' ? `http://localhost:3000/api/picture/${target.id}` : 
              props.mode === 'album' ? `http://localhost:3000/api/album/${target.id}` : '',  {method: 'GET',});
            
            // response can either be of type json or blob
            if (response.headers.get('content-type').includes('application/json')) response.json().then((data) => { console.log(data.message)  });

            else
              response.blob().then((data) => {
                // Download the image / zip
                const title = sanitizeTitle(target.title);
                const extention = checkMimeType(data.type);
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(data);
                a.download = `${title}.${extention}`;
                a.click();
              });
              
          }
          )}>

          <img src="src/assets/download.svg" />
          <p>Download</p>
        </div>
      </div>
      
      {ss()}

      <div className={styles.rating}>
        <div className={styles.ratingInner}>
          <SetRating />
        </div>
      </div>
    </div>
  );
}

export default Actions;
