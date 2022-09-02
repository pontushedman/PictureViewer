import React from 'react'
import ReactDOM from 'react-dom/client'
import styles from './Styles/Header.module.css'


function Header() {
    return (
        <div className={styles.Header}>
           <svg xmlns="http://www.w3.org/2000/svg" width="96" height="69" viewBox="0 0 96 69">
            <text id="pix" transform="translate(0 49)" fill="#383838" font-size="70" font-family="PlantagenetCherokee, Plantagenet Cherokee"><tspan x="0" y="0">pix</tspan></text>
            </svg>
        </div>
    )
}

export default Header

