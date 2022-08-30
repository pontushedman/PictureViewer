import React , { Component } from 'react'
import AddCategory from './AddCategory'
import styles from './CategoryTitle.module.css'

function CategoryTitle(props) {
    return (
        <div className={styles.CategoryTitle}>
            <img className={styles.categoryImage} src={props.image}/>
            <p className={styles.Title}>{props.title}</p>
            <AddCategory category={props.title}/>
        </div>
    )
}

export default CategoryTitle