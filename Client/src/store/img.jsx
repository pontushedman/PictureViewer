import { createContext, useState, useEffect } from "react";


const ImgContext = createContext({
  AlbumsList: [],
  totalImages: 0,
  totalAlbums: 0,
});

export function ImgContexProvider(props) {
  const [albumsList, setAlbumsList] = useState([]);

  //Load librarystructure from JSONs
  async function get() {
    const response = await fetch("http://localhost:3000/api/libraryjson")
    const albums = await response.json()
    setAlbumsList(albums.albums)
  }

  useEffect(() => {
    get()
  }, [])

  const context = {
    AlbumsList: albumsList,
    totalImages: albumsList.length,
    totalAlbums: albumsList.length,
  }

  return <ImgContext.Provider value={context}>
    {props.children}
  </ImgContext.Provider>
}

export default ImgContext;