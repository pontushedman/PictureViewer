import { createContext, useState, useEffect } from "react";


const JSONContext = createContext({
  AlbumsList: null,
  totalImages: null,
  totalAlbums: null,
  RatedAlbumList: null
});

export function JSONContextProvider(props) {
  const [albumsList, setAlbumsList] = useState([]);
  const [ratedAlbumList, setRatedAlbumList] = useState([]);

  //Load librarystructure from JSONs
  async function get() {
    const response = await fetch("http://localhost:3000/api/libraryjson")
    const albums = await response.json()
    setAlbumsList(albums.albums)

    // filter images to different rating albums
    const oneStar = [];
    const twoStar = [];
    const threeStar = [];
    const fourStar = [];
    const fiveStar = [];

    for (let album of albums.albums)
      for (let picture of album.pictures)
      {
        switch(picture.rating)
        {
          case "1":
            oneStar.push({...picture, imgHiRes: `${album.path}/${picture.imgHiRes}`, imgLoRes: `${album.path}/${picture.imgLoRes}`});
            break;
          case "2":
            twoStar.push({...picture, imgHiRes: `${album.path}/${picture.imgHiRes}`, imgLoRes: `${album.path}/${picture.imgLoRes}`});
            break;
          case "3":
            threeStar.push({...picture, imgHiRes: `${album.path}/${picture.imgHiRes}`, imgLoRes: `${album.path}/${picture.imgLoRes}`});
            break;
          case "4":
            fourStar.push({...picture, imgHiRes: `${album.path}/${picture.imgHiRes}`, imgLoRes: `${album.path}/${picture.imgLoRes}`});
            break;
          case "5":
            fiveStar.push({...picture, imgHiRes: `${album.path}/${picture.imgHiRes}`, imgLoRes: `${album.path}/${picture.imgLoRes}`});
            break;
          default:
            break;
        }
      }
    
    setRatedAlbumList([
      {rating: 1, title: 'One Star', pictures: oneStar},
      {rating: 2, title: 'Two Star', pictures: twoStar},
      {rating: 3, title: 'Three Star', pictures: threeStar},
      {rating : 4, title: 'Four Star', pictures: fourStar},
      {rating: 5, title: 'Five Star', pictures: fiveStar},
    ]);
  }

  useEffect(() => {
    get()
  }, [])

  const context = {
    AlbumsList: albumsList,
    totalImages: albumsList.length,
    totalAlbums: albumsList.length,
    RatedAlbumList: ratedAlbumList,
  }

  return <JSONContext.Provider value={context}>
    {props.children}
  </JSONContext.Provider>
}

export default JSONContext;