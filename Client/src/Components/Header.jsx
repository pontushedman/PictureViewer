import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom'
import styles from './Styles/Header.module.css'


function Header(props) {
    console.log(props.apa)
    return (
        <div className={styles.Header}>
            <Link to="/"><p>pix</p></Link>
        </div>
    )
}

export default Header

