import JSONContext from "../Store/JSONContext";
import { useContext, useEffect } from "react";
import StorageContext from "../Store/StorageContext";
//import styles from "./Styles/Favorites.module.css";
import styles from "./Styles/CategoryTitle.module.css";

function Favorites(props) {
  const JSONCtx = useContext(JSONContext);
  const albums = JSONCtx.AlbumsList;
  let rAlbums = [];

  rAlbums = albums.map((album) =>
    album.pictures.filter((img) => img.rating === props.rating)
  );

 
  console.log()

 

 
}

//console.log(rAlbums.map(album => album.pictures.map(pic => pic)))

export default Favorites;

/* const JSONCtx = useContext(JSONContext);
const albums = [...JSONCtx.AlbumsList];

useEffect(() => {
  const rAlbums = albums.map((album) => {
    let al = [
      album.pictures.filter((picture) => picture.rating === props.rating),
      album.path,
    ];

    al[0].map((img) => {
      const path = album.path + img.imgLoRes;
      img.imgLoRes = path;
    });

    
  });
  console.log(rAlbums)
}, []);


// console.log(rAlbums)
// const newAlbum = rAlbums.flat();

return (
  <div>
    <div className={styles.title}></div>
    <div className={styles.images}>
      
    </div>
  </div>
);*/
