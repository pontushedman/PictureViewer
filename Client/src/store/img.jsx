import { createContext , useState, useEffect} from "react";


const ImgContext = createContext({
    AlbumsList:[],
    totalImages: 0,
    totalAlbums:0,
});



export function ImgContexProvider(props){

    const [albumsList, setAlbumsList] = useState([]);

    //Load librarystructure from JSONs
    useEffect(() => {
        fetch("http://localhost:3000/api/libraryjson")
            .then((resp) => {
                return resp.json()
            }).then((res) => {
                setAlbumsList(res.albums)

               /* 
                let ic = 0
                res.albums.map((x) => {
                    ic = ic + x.pictures.length
                })
                imgCount = ic
                */
            })
    }, [])

    

    
    const context = {
        AlbumsList: albumsList,
        totalImages: albumsList.length,
        totalAlbums: albumsList.length,
    };

    return <ImgContext.Provider value={context}>
        {props.children}
    </ImgContext.Provider>
}

export default ImgContext;