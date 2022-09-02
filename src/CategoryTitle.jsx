import React , { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import styles from './CategoryTitle.module.css'
import ContentAmount from './ContentAmount'




function CategoryTitle(props) {
    const [loading, setLoading] = useState([{}]);

    useEffect(() => {
        fetch("./src/assets/picture-library.json")
            .then((resp) => {
                return resp.json()
            }).then((res) => {
                setLoading(res.albums)
                return res
            })
        }, [])
    

    return (
        <div className={styles.CategoryContainer}>
            <div className={styles.CategoryTitle}>
                <img className={styles.categoryImage} src={props.image}/>
                <p className={styles.Title}>{props.title}</p>
                <AddCategory noAdd={props.noAdd} category={props.title}/>
                <ContentAmount/>
            </div>
            <div className={styles.Albums}>
                {loading.map(x => 
                    <div className={styles.Album}>
                        <p>{x.title}</p>
                        <img className={styles.AlbumHeader} src={"./src/assets/" + x.headerImage}/>
                    </div>)}
                {console.log(loading)}
            </div>    
        </div>
    )
}

export default CategoryTitle