import styles from "./Styles/ShowAlbum.module.css"
import {useContext, useEffect, useState, useMemo} from "react"
import ImgContext from "../store/img"

function ShowAlbum(props) {
    const JSONContext = useContext(ImgContext)
    const albums = JSONContext.AlbumsList

    console.log("Showalbum rendered")

    const [chosenImage, setChosenImage] = useState({index: 0, image: getAlbumFromId(albums, props.id).pictures[0]})

    const album = getAlbumFromId(albums, props.id)
    const albumPictures = album.pictures

    function switchImageInc() {
        const plus = chosenImage.index + 1
        if (plus > album.pictures.length-1) {
            setChosenImage({index: chosenImage.index, image: albumPictures[chosenImage.index]})
        } else {
            setChosenImage({index: plus, image: albumPictures[plus]})
        }
    }

    function switchImageDec() {
        let minus = chosenImage.index - 1
        minus < 0 ? minus = 0 : 
        setChosenImage({index: minus, image: albumPictures[minus]})
     }

    function getImageIndex(image) {
        let imageIndex
        for (let index = 0; index < albumPictures.length; index++) {
            const element = array[index];
            if (element.id === image.id) {
                imageIndex = index
                return imageIndex
            }
        }
        return undefined
    }

    function getAlbumFromId(list, value) {
        let albumx = {}
        list.map(album => {
                if(album.id === value) {
                    albumx = album
                }
        })
        return albumx
    }

    return (
        <div className={styles.showAlbumContainer}>
            <div className={styles.top}>
                <p className={styles.title}>{album.title}</p>
                <p className={styles.comment}>{album.comment}</p>
            </div>
            <div className={styles.imageTitle}>
                <p>{chosenImage.image.title}</p>
            </div>
            <div className={styles.slideshow}>
                <div className={styles.left}>
                    <div data-action="decrease" onClick={switchImageDec} id="minus" className={styles.button}></div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.imageContainer}>
                        <div
                            className={styles.image}
                            style={{backgroundImage: "url(http://localhost:3000/"  + album.path + "/" + chosenImage.image.imgLoRes.replace(/ /g,'%20' ) + ")"}}
                        />
                    </div>
                    <p className={styles.imageComment}>{chosenImage.image.comment}</p>
                </div>
                <div className={styles.right}>
                    <div data-action="increase" onClick={switchImageInc} id="plus" className={styles.button}></div>
                </div>
            </div>
            <div className={styles.albumImages}>
                {
                    albumPictures.map(image => {
                        return (
                            <div className={styles.albumImage}
                            style={{backgroundImage: "url(http://localhost:3000/" + album.path + "/" + image.imgLoRes.replace(/ /g,'%20' ) + ")"}}
                            />
                        ) 
                    })
                }
            </div>
        </div>
    ) 
}

export default ShowAlbum