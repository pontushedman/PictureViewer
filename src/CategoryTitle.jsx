import React , { Component } from 'react'
import AddCategory from './AddCategory'
import styles from './CategoryTitle.module.css'
import ContentAmount from './ContentAmount'

function CategoryTitle(props) {
    return (
        <div className={styles.CategoryTitle}>
            <img className={styles.categoryImage} src={props.image}/>
            <p className={styles.Title}>{props.title}</p>
            <AddCategory noAdd={props.noAdd} category={props.title}/>
            <ContentAmount/>
        </div>
    )
}

export default CategoryTitle