import React from 'react'
import ReactDOM from 'react-dom/client'
import styles from './Styles/Header.module.css'


function Header(props) {
    console.log(props.apa)
    return (
        <div className={styles.Header}>
            <p>pix</p>
        </div>
    )
}

export default Header

