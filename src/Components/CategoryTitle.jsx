import React , { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
import ContentAmount from './ContentAmount'

function CategoryTitle(props) {
    const image = "./src/assets/" + props.image + ".png"
    console.log(props.title + " has a size of " + props.small)
    let categoryImage = props.small ? styles.categoryImageSmall : styles.categoryImageLarge

    const [loading, setLoading] = useState();
    const category = props.category
    console.log(category)

    const availableCategories = ["albums", "images", "favorites"]

    let categoryCheck = false

    availableCategories.map(x => {
        if(x === category) {
            categoryCheck = true
        }
    })

    if(categoryCheck === false) {
        console.debug("Invalid category input")
        return (<div/>)
    }

    useEffect(() => {
        fetch("./src/assets/picture-library.json")
            .then((resp) => {
                return resp.json()
            }).then((res) => {
                setLoading(res.albums)
                return res
            })
        }, [])

    function Bottom() {
        return  (
            <div className={styles.ViewAll}>
                <p>View all {props.title}</p>
            </div>
        )
    }

    function Top() {
        return (
            <div className={styles.CategoryTitle}>
                
                <img className={categoryImage} src={image}/>
                <p className={styles.Title}>{props.title}</p>
                <AddCategory noAdd={props.noAdd} category={props.title}/>
                <ContentAmount className={styles.Count}/>
            </div>
        )
    }

    function Albums() {
        if(loading === undefined) {
            return "Loading";
        }

        return (
            <div className={styles.Albums}>
                {loading.map(x => 
                    <div className={styles.Album}>
                        <img className={styles.AlbumHeaderImage} src={"./src/assets/" + x.headerImage}/>
                        <p className={styles.AlbumTitle}>{x.title}</p>
                    </div>)}
                {console.log(loading)}
            </div>
        )
    }

    function Images() {
        if(loading === undefined) {
            return "Loading";
        }
        
        return (
            <div className={styles.Images}>
                {
                    loading.map(x => 
                        x.pictures.map(y => 
                            <div className={styles.Image}>
                                <img className={styles.PictureImage} src={"./src/assets/" + x.path + "/"  + y.imgLoRes}/>
                            </div>
                        )
                    )
                }
                {console.log(loading)}
            </div>
        )
    }

    let cat = (() => {
        if(category === "albums")  {
            return <Albums/>
        } else if(category === "images") {
            return <Images/>
        } else if(category === "favorites") {
            return <Images/>
        }
    })

    return (
        <div className={styles.CategoryContainer}>
            <Top/>
            {cat()}
            <Bottom/>
        </div>
    )
}

export default CategoryTitle