import styles from "./Styles/Footer.module.css"

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <p className={styles.logo}>pix</p>
            <p className={styles.desc}>Made by us</p>
        </div>
    )
}

export default Footer