import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Header.module.css'


function Header() {
  return (
    <div className={styles.Header}>
      <Link className={styles.Logo} to="/"><img className={styles.svgLogo} src="./src/assets/Pix_Logo_3.svg"/></Link>

    </div>
  )
}

export default Header

