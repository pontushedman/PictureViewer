import styles from './Styles/ContentAmount.module.css'

function ContentAmount() {
    const count = <div className={styles.count}><p>199</p></div>;
    return count;
}

export default ContentAmount