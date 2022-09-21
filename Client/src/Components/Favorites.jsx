import JSONContext from "../Store/JSONContext";
import { useContext, useEffect } from "react";
import StorageContext from "../Store/StorageContext";
import styles from "./Styles/Favorites.module.css";

function Favorites(props) {
  const JSONCtx = useContext(JSONContext);
  const albums = JSONCtx.AlbumsList;
  albums.map(album => {
    album.pictures.map(img => {
        const rPics =[]
        rPics.push(img.rating === props.rating
    })
  })

}

export default Favorites;
