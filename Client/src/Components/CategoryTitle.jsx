import React, { useState, useEffect, useContext } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
import ContentAmount from './ContentAmount'
import { Link } from 'react-router-dom'
import ImgContext from '../store/img'


function CategoryTitle(props) {
    const JSONContext = useContext(ImgContext)
    const albums = JSONContext.AlbumsList
    const albumCount = albums.length
    const imageCount = (() => {
        let count = 0
        albums.map(album => {
            count += album.pictures.length
        })
        return count
    })
    
    console.log(albums)

    useEffect(() => {
        const images = document.getElementsByClassName(styles.PictureImage)
        for (let index = 0; index < images.length; index++) {
            const image = images[index]
            image.addEventListener("click", (e) => {
                const imageId = image.dataset.id
                props.showModal({show: true, mode: "image", data: {image: {id: imageId}}})        
            })
        }
    })

    const availableCategories = ["albums", "images", "favorites"]
    const category = props.category
    let categoryCheck = false

    availableCategories.map(x => {
        if (x === category) {
            categoryCheck = true
        }
    })

    if (categoryCheck === false) {
        console.debug("Invalid category input")
        return (<div />)
    }

    const image = "./src/assets/" + props.image + ".png"
    let categoryImage = props.small ? styles.categoryImageSmall : styles.categoryImageLarge

    const ContentCount = (() => {
        if (category === "albums")
            return albumCount

        if (category === "images")
            return imageCount()

        return ""
    })

    function Top() {
        return (
            <div className={styles.CategoryTitle}>
                <img className={categoryImage} src={image} />
                <p className={styles.Title}>{props.title}</p>
                <AddCategory showModal={props.showModal} noAdd={props.noAdd} category={props.title} />
                <ContentAmount suffix={category} count={ContentCount()} className={styles.Count} />
            </div>
        )
    }

    function Bottom() {
        return (
            <div className={styles.ViewAll}>
                <Link className={styles.categoryLink} to={"./" + props.title} >View all {props.title}</Link>
            </div>
        )
    }

    function Albums() {
        if (albums === undefined) {
            return "Loading";
        }
        return (
            <div className={styles.Albums}>
                {albums.map(x =>
                    <div className={styles.Album}>
                        {console.log(x.headerImage)}
                        <img className={styles.AlbumHeaderImage} src={"http://localhost:3000/" + x.headerImage} />
                        <p className={styles.AlbumTitle}>{x.title}</p>
                        <p className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
                    </div>)}
                {console.log(albumCount)}
            </div>
        )
    }

    function Images() {
        if (albums === undefined) {
            return "Loading";
        }
        return (
            <div className={styles.Images}>
                {
                    albums.map(x =>
                        x.pictures.map(y =>
                            <div className={styles.Image}>
                                <img className={styles.PictureImage} data-id={y.id} src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes} />
                            </div>
                        )
                    )
                }
            </div>
        )
    }

    let cat = (() => {
        if (category === "albums") {
            return <Albums />
        } else if (category === "images") {
            return <Images />
        } else if (category === "favorites") {
            return <div />
        }
    })

    return (
        <div className={styles.CategoryContainer}>
            <Top />
            {cat()}
            <Bottom />
        </div>
    )
}

export default CategoryTitle