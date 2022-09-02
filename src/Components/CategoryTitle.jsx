import React , { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
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
                <ContentAmount className={styles.Count}/>
            </div>
            <div className={styles.Albums}>
                {loading.map(x => 
                    <div className={styles.Album}>
                        <img className={styles.AlbumHeaderImage} src={"./src/assets/" + x.headerImage}/>
                        <p className={styles.AlbumTitle}>{x.title}</p>
                    </div>)}
                {console.log(loading)}
            </div>    
            <div className={styles.ViewAll}>
                <p>View all {props.title}</p>
            </div>
        </div>
    )
}

export default CategoryTitle