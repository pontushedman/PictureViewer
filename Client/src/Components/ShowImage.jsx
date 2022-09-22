import { useContext } from "react"
import JSONContext from "../Store/JSONContext"
import Actions from "./Actions"
import styles from "./Styles/ShowImage.module.css"

function getImageFromId(list, value) {
  let img = {}
  list.map(album => {
    album.pictures.map((image) => {
      if (image.id == value) {
        img = { path: album.path, img: image }
      }
    })
  })
  return img
}

function ShowImage(props) {
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList
  const updateField = (fields) => {
    //Fetch
    fetch('http://localhost:3000/api/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const image = getImageFromId(albums, props.id)

  //src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes}

  return (
    <div className={styles.showImageContainer}>
      <input 
        type="text" 
        placeholder={image.img.title} 
        className={styles.imageTitle}
        onChange={(e) => {
          let newImage = image.img
          newImage.title = e.target.value
        }}
        onKeyPress={(e) => {
          if(e.key === 'Enter')
          {
            updateField({id: image.img.id, title: e.target.value});
            e.target.blur();
          }
        }}
      />
      <div className={styles.commentImageFW}>
        <div className={styles.commentImageContainer}>
          <img className={styles.image} src={"http://localhost:3000/" + image.path + "/" + image.img.imgHiRes} />
          <div className={styles.commentContainer}>
            <textarea defaultValue={image.img.comment}
              className={styles.comment}
              onChange={(e) => {
                let newImage = image.img
                newImage.comment = e.target.value
              }}
              onKeyPress={(e) => {
                if(e.key === 'Enter')
                {
                  updateField({id: image.img.id, comment: e.target.value});
                  e.target.blur();
                }
              }}
            />
          </div>
        </div>
      </div>
      <Actions obj={image.img} />
    </div>



  )


}

export default ShowImage