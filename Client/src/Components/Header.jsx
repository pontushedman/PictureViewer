import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Header.module.css'


function Header() {
  return (
    <div className={styles.Header}>
      <Link className={styles.Logo} to="/"><p>pix</p></Link>
    </div>
  )
}

export default Header

